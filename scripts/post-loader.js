const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fm = require('front-matter');

const renderer = require('./renderer');

const template = fs.readFileSync(
  path.resolve(__dirname, '../src/layout.jsx'),
  'utf-8',
);

module.exports = post => {
  const { attributes, body } = fm(post);

  let components = [];

  marked.use({
    xhtml: true,
    renderer,
    walkTokens(token) {
      console.log(token);
      // components.push(token);
    },
  });
  console.log(attributes);
  const content = marked(body);

  return _.template(template)({
    content,
    components: '',
    attributes,
  });
};
