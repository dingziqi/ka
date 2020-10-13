const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fm = require('front-matter');
const ReactDomServer = require('react-dom/server');

const renderer = require('./renderer');

// const template = fs.readFileSync(
//   path.resolve(__dirname, '../src/layout.jsx'),
//   'utf-8',
// );

module.exports = post => {
  const { attributes, body } = fm(post);
  const {
    layout = 'post',
    title,
    date,
    updated,
    tags,
    categories,
  } = attributes;

  const template = fs.readFileSync(
    path.resolve(__dirname, `../src/templates/${layout}.jsx`),
    'utf-8',
  );

  let components = [];

  marked.use({
    xhtml: true,
    // renderer,
    walkTokens(token) {
      // console.log(token);
      // components.push(token);
    },
  });

  const content = marked(body);

  _.templateSettings.interpolate = /<inject\s([\s\S]+?)\s\/>/g;
  return _.template(template)({content});
};
