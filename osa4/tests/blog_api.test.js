const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialblogs);
});

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('All blogs are returned', async () => {
  const res = await api.get('/api/blogs');
  expect(res.body).toHaveLength(helper.initialblogs.length);
});

test('A valid blog can be added', async () => {
  const newBlog = {
    title: 'JWST',
    author: 'NASA',
    url: 'nasa.com',
    likes: 83658265,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsinDB();
  expect(blogsAtEnd).toHaveLength(helper.initialblogs.length + 1);

  const title = blogsAtEnd.map((r) => r.title);
  expect(title).toContainEqual('JWST');
});

test('id not _id', async () => {
  const blogs = await helper.blogsinDB();
  blogs.forEach(async (blog) => {
    await expect(blog.id).toBeDefined();
  });
});

test('Likes is always defined', async () => {
  const newBlog = {
    title: 'No Likes',
    author: 'me',
    url: 'grass.com',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogs = await helper.blogsinDB();
  expect(blogs.find((blog) => blog.title === 'No Likes').likes).toBe(0);
});

test('No url or title = 400', async () => {
  const newBlog = {
    author: 'Empty',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
