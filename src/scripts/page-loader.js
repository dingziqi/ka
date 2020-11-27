const _ = require('lodash');
const db = require('./db');

module.exports = function (page) {
  const posts = db.query();
  console.log('compile page');
  console.log('compile page with:', posts, _.template(page)({
    posts: JSON.stringify(posts),
  }));

  return _.template(page)({
    posts: JSON.stringify(posts),
  });
};
