// eslint-disable-next-line new-cap
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogsRouter.post('/', (req, res, next) => {
  const { body } = req;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog.save()
    .then((savedBlog) => {
      res.status(201).json(savedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;