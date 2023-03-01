const Blog = require('../models/blog');

const initialblogs = [
  {
    title: 'Coffee',
    author: 'Bob',
    url: 'coffee.ee',
    likes: 69,
  },
  {
    title: 'How',
    author: 'SpongeBob',
    url: 'blog.fi',
    likes: 9,

  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'JWST',
    author: 'NASA',
    url: 'nasa.com',
    likes: 83658265,
  });

  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsinDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialblogs, nonExistingId, blogsinDB,
};
