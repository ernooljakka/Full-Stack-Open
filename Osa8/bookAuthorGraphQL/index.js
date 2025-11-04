const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

let authors = [
  { name: "Robert Martin", id: "1", born: 1952 },
  { name: "Martin Fowler", id: "2", born: 1963 },
  { name: "Fyodor Dostoevsky", id: "3", born: 1821 },
  { name: "Joshua Kerievsky", id: "4" },
  { name: "Sandi Metz", id: "5" },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int
  }

  type Book {
    id: ID!
    title: String!
    published: Int
    author: String!
    genres: [String!]!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int, genres: [String]! ): Book! 
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

// Resolvers
const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (_, args) => {
      if (!args.author && !args.genre) {
        return books;
      } else if (args.author && args.genre) {
        const booksByAuthor = books.filter((b) => b.author === args.author);
        return booksByAuthor.filter((b) => b.genres.includes(args.genre));
      } else if (args.author) {
        return books.filter((b) => b.author === args.author);
      } else if (args.genre) {
        return books.filter((b) => b.genres.includes(args.genre));
      }
    },
    allAuthors: () => authors,
  },

  Author: {
    bookCount: (parent) => {
      return books.filter((b) => b.author === parent.name).length;
    },
  },
  Mutation: {
    addBook: (_, args) => {
      let book = {
        id: Math.floor(Math.random() * 10000).toString(),
        title: args.title,
        author: args.author,
        genres: args.genres,
        published: args.published,
      };

      books.push(book);

      let existingAuthor = authors.find((a) => a.name === args.author);

      if (!existingAuthor) {
        const newAuthor = {
          name: args.author,
          id: Math.floor(Math.random() * 10000).toString(),
        };
        authors.push(newAuthor);
      }

      return book;
    },
    editAuthor: (_, args) => {
      let authorToUpdate = authors.find((a) => a.name === args.name);

      if (!authorToUpdate) {
        return null;
      }

      authorToUpdate = {
        ...authorToUpdate,
        born: args.setBornTo,
      };

      return authorToUpdate;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
