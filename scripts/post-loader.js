const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fm = require('front-matter');
const debug = require('debug')('ka:post-loader');

const renderer = require('./renderer');

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
    path.resolve(__dirname, `../src/template/${layout}.jsx`),
    'utf-8',
  );

  let injectComponent = [];

  marked.use({
    xhtml: true,
    renderer,
    walkTokens(token) {
      // debug('fullname:', token);

      const type = token.task ? 'checkbox' : token.type;
      let fullComponentName = renderer.getComponentName(type);

      if (!fullComponentName) return;

      const componentName = fullComponentName.split('.')[0];
      if (injectComponent.indexOf(componentName) === -1) {
        debug('add injected component :', componentName);
        injectComponent.push(componentName);
      }
    },
  });

  const content = marked(body);

  return _.template(template)({
    content,
    injectedComponent: `{${injectComponent.join(',')}}`,
  });
};
