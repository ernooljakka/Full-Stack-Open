const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      try {
        if (!args.author && !args.genre)
          return await Book.find({}).populate("author");
        const filter = {};
        if (args.author) {
          const author = await Author.findOne({ name: args.author });
          if (!author)
            throw new GraphQLError(`Author "${args.author}" not found`);
          filter.author = author._id;
        }
        if (args.genre) filter.genres = { $in: [args.genre] };
        return await Book.find(filter).populate("author");
      } catch (error) {
        throw new GraphQLError("Fetching books failed", {
          extensions: { code: "BAD_USER_INPUT", error: error.message },
        });
      }
    },
    allAuthors: async () => {
      const authorsWithCounts = await Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "author",
            as: "books",
          },
        },
        {
          $addFields: {
            bookCount: { $size: "$books" },
          },
        },
      ]);

      return authorsWithCounts;
    },
    me: (_, __, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (_, args, context) => {
      if (!context.currentUser)
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHORIZED" },
        });

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres.map((g) => g.toLowerCase().trim()),
        author: author._id,
      });
      const savedBook = await book.save();
      const populatedBook = await savedBook.populate("author");

      pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });

      return populatedBook;
    },
    editAuthor: async (_, args, context) => {
      if (!context.currentUser)
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHORIZED" },
        });
      const author = await Author.findOne({ name: args.name });
      if (!author)
        throw new GraphQLError("Author not found", {
          extensions: { code: "NOT_FOUND" },
        });

      author.born = args.setBornTo;
      await author.save();
      return author;
    },
    createUser: async (_, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret")
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      const userForToken = { username: user.username, id: user._id };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
