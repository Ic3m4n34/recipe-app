const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// Minimal Webpack config to supply to Eslint.
// This is not actually used by Nuxt but instead mirrors
// the resolve and loader rules.
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, 'lib'), 'node_modules'],
    extensions: ['.js', '.vue'],
    alias: {
      '~': __dirname,
      '@': __dirname,
      // your aliases go here.
    },
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader',
      options: {
        loaders: {
          'scss': 'vue-style-loader!css-loader!sass-loader',
          'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
        }
      }
    },
    {
      test: /\.svg$/,
      loader: 'svg-loader?pngScale=2',
    },
    {
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader',
    },
    {
      test: /\.scss$/,
      use: [
        "vue-style-loader",
        "css-loader",
        "resolve-url-loader",
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    },
    ],
  },
  externals: [{},],
  plugins: [
    new VueLoaderPlugin(),
  ],
};

if (process.env.NODE_ENV === 'test') {
  // use inline source map so that it works with mocha-webpack
  module.exports.devtool = 'inline-cheap-module-source-map'
}
