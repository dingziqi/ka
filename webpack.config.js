const path = require('path');
const glob = require('glob');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const db = require('./src/scripts/db');

const isProd = process.env.NODE_ENV === 'production';
const postLoder = underRoot('./src/scripts/post-loader.js');
const underPosts = pathStr => path.resolve(__dirname, './posts', pathStr);
const underPage = pathStr => path.resolve(__dirname, './src/page', pathStr);

const getEntrances = (pattern, root) => {
  const entrances = {};
  glob
    .sync(pattern, {
      cwd: root('.'),
      silent: true,
      nodir: true,
    })
    .forEach(entry => {
      const name = entry.slice(0, entry.indexOf('.'));

      entrances[name] = root(entry);
    });

  return entrances;
};

const getHtmlPlugin = (entrances, isPage) => {
  const templateName = isPage ? 'page' : 'post';
  return Object.keys(entrances).map(name => {
    return new HtmlPlugin({
      template: `${
        isProd && !isPage
          ? `!!prerender-loader?string&entry=${path.relative(
              underRoot('.'),
              entrances[name],
            )}!`
          : ''
      }./src/${templateName}.template.html`,
      templateParameters(compilation, assets, assetsTags, options) {
        const originalParams = {
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetsTags,
            files: assets,
            options,
          },
        };

        return isPage
          ? {
              ...originalParams,
              posts: JSON.stringify(db.query()),
            }
          : originalParams;
      },
      filename: `${name}.html`,
      chunks: [name],
    });
  });
};

const handleEntry = () => {
  const pages = getEntrances('**/*.js?(x)', underPage);
  const posts = getEntrances('**/*.md', underPosts);

  const pagePlugin = getHtmlPlugin(pages, true);
  const postPlugin = getHtmlPlugin(posts);

  return [{ ...posts, ...pages }, [...pagePlugin, ...postPlugin]];
};

const [entrances, htmlPlugins] = handleEntry();

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
        use: ['babel-loader'],
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
  plugins: [new CleanWebpackPlugin(), ...htmlPlugins],
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
