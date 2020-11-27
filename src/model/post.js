const { Schema } = require('warehouse');

module.exports = ctx => {
  const Post = new Schema({
    id: String,
    title: { type: String, default: '' },
    layout: { type: String, default: 'post' },
    content: { type: String, default: '' },
  });

  return Post;
};
