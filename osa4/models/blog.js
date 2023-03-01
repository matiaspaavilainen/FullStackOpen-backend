/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    required: true,
  },
  author: {
    type: String,
    minlength: 1,
    required: true,
  },
  url: {
    type: String,
    minlength: 5,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
