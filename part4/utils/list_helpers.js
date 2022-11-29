const dummy = (blogs) => {
  return 1;
};

const objectIsEmpty = (object) => {
  return Object.keys(object).length === 0;
};

const totalLikes = (blogs) => {
  return blogs.reduce((prev, next) => prev + next.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (prev, next) => (prev.likes > next.likes ? prev : next),
    {}
  );
};

const concatBlogsByAuthors = (blogs) => {
  return Object.values(
    blogs.flat().reduce((accumulator, { author, likes }) => {
      accumulator[author] ??= { author, blogs: 0, likes: 0 };
      accumulator[author].blogs += 1;
      accumulator[author].likes += Number(likes);
      return accumulator;
    }, {})
  );
};

const returnMostByKey = (blogs, key) => {
  const most = concatBlogsByAuthors(blogs).reduce(
    (prev, next) => (prev[key] > next[key] ? prev : next),
    {}
  );
  return objectIsEmpty(most) ? {} : { author: most.author, [key]: most[key] };
};

const mostBlogs = (blogs) => {
  return returnMostByKey(blogs, 'blogs');
};

const mostLikes = (blogs) => {
  return returnMostByKey(blogs, 'likes');
};

export {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  concatBlogsByAuthors,
};
