const { result, groupBy } = require('lodash');
const _ = require('lodash')

const dummy = (posts) => {
    return 1;
  }
  

  const totalLikes = (posts) => {
    return posts.reduce((sum, item) => sum + item.likes, 0)
  }

  const favouriteBlog = (posts) => {
      let max = 0;
      let favouritePost = {}

      posts.forEach(post => {
          if(post.likes > max) {
              max = post.likes
              favouritePost = post
          }
      });

      return favouritePost;
  }

  const mostBlogs = (posts) => {

    const authorWithMostPosts = _.chain(_.countBy(posts, 'author'))
    .map((obj, keys) => ({
      author: keys,
      blogs: obj
    }))
    .orderBy(['blogs'], ['desc'])
    .value()

    return authorWithMostPosts[0];
  }

  const mostLikes = (posts) => {
    const authorWithMostLikes = _.chain(_.groupBy(posts, 'author'))
    .map((obj, keys) => ({
      author: keys,
      likes: _.sumBy(obj, 'likes')
    }))
    .orderBy(['likes'], ['desc'])
    .value();

    return authorWithMostLikes[0];
  }

  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
  }