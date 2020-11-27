const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fm = require('front-matter');
const webpack = require('webpack');
const debug = require('debug')('ka:post-loader');

const renderer = require('./renderer');
const db = require('./db');

const genPostData = (ctx, content, attrs) => {
  const { context, resourcePath } = ctx;
  const postPath = path.relative(context, resourcePath).split('.')[0];

  const { desc, description, url } = attrs;
  const postDesc =
    desc ||
    description ||
    content
      .replace(/<(\s|\S)*?>/g, '')
      .match(/./gm)
      .join('')
      .slice(0, 200);

  return {
    desc: postDesc,
    content,
    path: `${url || postPath}.html`,
    meta: attrs,
  };
};

module.exports = function (post) {
  console.log('compile post');
  this.compilingPost = true;
  const { attributes, body } = fm(post);
  const { layout = 'post', date, updated, tags, categories } = attributes;

  const tagArr = tags.split(',').map(tag => (tag || '').trim());

  debug('attr:', attributes);

  const template = fs.readFileSync(
    path.resolve(__dirname, `../template/${layout}.jsx`),
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

  const content = marked(body).replace(/class="/g, 'className="');

  debug('content:', content);

  injectComponent = injectComponent.filter(
    component => !template.match(`<${component}`),
  );

  db.insert(genPostData(this, content, attributes));

  return _.template(template)({
    content,
    attributes: JSON.stringify({ ...attributes, tags: tagArr }),
    injectedComponent: injectComponent.join(','),
  });
};
