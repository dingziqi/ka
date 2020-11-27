const debug = require('debug')('ka:db');

let posts = [];

module.exports = {
  insert(post) {
    const currentIndex = posts.findIndex(target => target.path === post.path);
    if (currentIndex > -1) {
      posts[currentIndex] = post;
    } else {
      posts.push(post);
    }
    posts = [...posts];
    debug('insert post:', post, posts);
  },
  query() {
    return [...posts];
  },
};
