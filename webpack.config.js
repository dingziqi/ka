const path = require('path');
const glob = require('glob');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Plugin = require('./src/scripts/plugin');

const isProd = process.env.NODE_ENV === 'production';
const postLoder = underRoot('./src/scripts/post-loader.js');
const pageLoader = underRoot('./src/scripts/page-loader.js');
const underPosts = pathStr => path.resolve(__dirname, './posts', pathStr);
const underPage = pathStr => path.resolve(__dirname, './src/page', pathStr);

const getEntrances = () => {
  const pages = {};
  glob
    .sync('**/*.js?(x)', {
      cwd: underPage('.'),
      silent: true,
      nodir: true,
    })
    .forEach(entry => {
      const name = entry.slice(0, entry.indexOf('.'));

      pages[name] = underPage(entry);
    });

  const posts = {};
  glob
    .sync('**/*.md', {
      cwd: underPosts('.'),
      silent: true,
      nodir: true,
    })
    .forEach(entry => {
      const name = entry.slice(0, entry.indexOf('.'));

      posts[name] = underPosts(entry);
    });

  return { ...posts, ...pages };
};

const entrances = getEntrances();

module.exports = {
  entry: entrances,
  output: {
    filename: '[name][hash].js',
  },
  mode: isProd ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js(x)$/,
        use: ['babel-loader', pageLoader],
        include: underPage('.'),
      },
      {
        test: /\.js(x)$/,
        use: ['babel-loader'],
        exclude: underPage('.'),
      },
      {
        test: /\.md$/,
        use: ['babel-loader', postLoder],
      },
      {
        test: /.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                paths: [underRoot('node_modules')],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Plugin(),
    new CleanWebpackPlugin(),
    ...Object.keys(entrances).map(
      name =>
        new HtmlPlugin({
          template: `${
            isProd
              ? `!!prerender-loader?string&entry=${path.relative(
                  underRoot('.'),
                  entrances[name],
                )}!`
              : ''
          }./src/template.html`,
          filename: `${name}.html`,
          chunks: [name],
        }),
    ),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Component: underRoot('./src/component'),
      Style: underRoot('./src/style'),
    },
  },
  // stats: false,
  devServer: {
    // open: true,
  },
};

function underRoot(pathStr) {
  return path.resolve(__dirname, pathStr);
}
