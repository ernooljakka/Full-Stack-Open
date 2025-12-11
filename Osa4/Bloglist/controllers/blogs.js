const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post(
  "/",
  tokenExtractor,
  userExtractor,
  async (request, response, next) => {
    try {
      const { title, author, url, likes } = request.body;

      const user = request.user;

      if (title === undefined || url === undefined) {
        return response.status(400).json({ error: "title or url missing" });
      }

      const blog = new Blog({
        title,
        author,
        url,
        likes: likes === undefined ? 0 : likes,
        user: user._id,
      });

      const savedBlog = await blog.save();

      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();

      await savedBlog.populate("user", "-blogs");

      response.json(savedBlog);
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response, next) => {
    try {
      const blogToDelete = await Blog.findById(request.params.id);

      if (!blogToDelete) {
        response.status(404).json({ error: "blog not found" });
      }

      if (blogToDelete.user.toString() !== request.user._id.toString()) {
        return response
          .status(403)
          .json({ error: "forbidden: not the blog owner" });
      }

      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes: body.likes },
      { new: true, runValidators: true }
    );

    if (updatedBlog) {
      response.json(updatedBlog);
    } else {
      response.status(404).json({ error: "blog not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
