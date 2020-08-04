const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const postLoder = path.resolve(__dirname, 'scripts/post-loader.js');
const underPosts = pathStr => path.resolve(__dirname, './posts', pathStr);

module.exports = {
  entry: { about: underPosts('./about.md') },
  mode: isProd ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js(x)$/,
        use: ['babel-loader'],
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
    new CleanWebpackPlugin(),
    new HtmlPlugin({
      template: `${
        isProd ? '!!prerender-loader?string!' : ''
      }./src/template.html`,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': underRoot('./src/components'),
    },
  },
  stats: false,
};

function underRoot(pathStr) {
  return path.resolve(__dirname, pathStr);
}
