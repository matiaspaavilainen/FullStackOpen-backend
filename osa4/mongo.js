const mongoose = require('mongoose');
const Blog = require('./models/blog');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fso:${password}@cluster0.hhlsgfc.mongodb.net/testBlogilista?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

if (process.argv.length < 4) {
  console.log('Blogs: ');
  Blog.find({}).then((result) => {
    result.forEach((blog) => {
      console.log(`${blog.title} by ${blog.author}`);
    });
    mongoose.connection.close();
  });
} else {
  const blog = new Blog({
    title: process.argv[3],
    author: process.argv[4],
    url: process.argv[5],
    likes: process.argv[6],
  });

  blog.save().then(() => {
    console.log(`Added blog ${process.argv[3]}, by ${process.argv[4]} to blogs.`);
    mongoose.connection.close();
  });
}
