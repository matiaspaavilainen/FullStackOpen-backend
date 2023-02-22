const totalLikes = (blogs) => {
  let count = 0;
  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i];
    count += blog.likes;
  }
  return count;
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === mostLikes);
};

module.exports = {
  totalLikes,
  favoriteBlog,
};
