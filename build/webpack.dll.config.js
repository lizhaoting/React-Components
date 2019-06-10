const webpack = require('webpack');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const getPath = p => path.resolve(__dirname, p);
const react = [
    'react', 'react-dom', 'react-tooltip', 'react-modal',
];

module.exports = {
  entry: { react },
  output: {
    path: getPath('./dll'),
    filename: 'dll.[name].min.js',
    library: '[name]',
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          plugins: [
            'lodash',
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
      },
      sourceMap: true,
    }),
    new webpack.DllPlugin({
      path: path.join(
        __dirname,
        './dll',
        '[name]-manifest.min.json'),
      name: '[name]',
      context: __dirname,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new LodashModuleReplacementPlugin({
      /**
       * for lodash/fp/*
       * see [https://github.com/lodash/lodash-webpack-plugin/issues/53]
       */
      currying: true,
      flattening: true,
      placeholders: true,
    }),
  ],
};
