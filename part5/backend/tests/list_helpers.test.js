import {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  concatBlogsByAuthors,
} from '../utils/list_helpers';

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];
describe('list_helpers', () => {
  test('dummy returns 1', () => {
    expect(dummy([])).toBe(1);
  });
});

describe('total likes', () => {
  test('of empty list is 0', () => {
    expect(totalLikes([])).toBe(0);
  });
  test('when the list has only one blog return the total likes of this blog', () => {
    expect(totalLikes(listWithOneBlog)).toBe(listWithOneBlog[0].likes);
  });
  test('of multiple blogs', () => {
    expect(totalLikes(blogs)).toBe(36);
  });
});

describe('favorite blog', () => {
  test('of empty list is an empty object', () => {
    expect(favoriteBlog([])).toStrictEqual({});
  });
  test('when the list has only one blog return the blog', () => {
    expect(favoriteBlog(listWithOneBlog)).toBe(listWithOneBlog[0]);
  });
  test('of multiple blogs in an array', () => {
    expect(favoriteBlog(blogs)).toBe(blogs[2]);
  });
});

describe('most blogs', () => {
  test('of empty list is an empty object', () => {
    expect(mostBlogs([])).toStrictEqual({});
  });
  test('when the list has only one object of the author name and 1 as the blogs', () => {
    expect(mostBlogs(listWithOneBlog)).toStrictEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });
  test('of multiple blogs in an array', () => {
    expect(mostBlogs(blogs)).toStrictEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('most likes', () => {
  test('of empty list is an empty object', () => {
    expect(mostLikes([])).toStrictEqual({});
  });
  test('when the list has only one object of the author name and 5 as the number of likes', () => {
    expect(mostLikes(listWithOneBlog)).toStrictEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });
  test('of multiple blogs in an array', () => {
    expect(mostLikes(blogs)).toStrictEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});

describe('concat stats of blogs by author', () => {
  test('of empty list is an empty object', () => {
    expect(concatBlogsByAuthors([])).toStrictEqual([]);
  });
  test('when the list has only one object return the object', () => {
    expect(concatBlogsByAuthors(listWithOneBlog)).toStrictEqual([
      {
        author: 'Edsger W. Dijkstra',
        blogs: 1,
        likes: 5,
      },
    ]);
  });
  test('of multiple blogs in an array', () => {
    expect(concatBlogsByAuthors(blogs)).toStrictEqual([
      { author: 'Michael Chan', blogs: 1, likes: 7 },
      { author: 'Edsger W. Dijkstra', blogs: 2, likes: 17 },
      { author: 'Robert C. Martin', blogs: 3, likes: 12 },
    ]);
  });
});
