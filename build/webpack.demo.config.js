const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ThemeReplacePlugin = require('./ThemeReplacePlugin.js');


module.exports = {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: './demo',
    port: 8089,
  },
  devtool: 'source-map',
  entry: {
    bundle: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8089',
      path.resolve(__dirname, '../demo/main.js'),
    ],
  },
  output: {
    path: `${__dirname}/../demo`,
    publicPath: '/',
    filename: './bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[local]',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        query: { mmetype: 'image/png' },
      },
      {
        test: /\.gif$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        query: { mmetype: 'image/gif' },
      },
      {
        test: /\.(woff|eot|ttf|svg)\??.*$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, '../modules/Icon/fonts'),
        ],
        use: [{
          loader: 'file-loader',
          options: {
            name: './resources/fonts/[name].[hash:base64:5].[ext]',
            publicPath: ' ',
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new ThemeReplacePlugin(process.env.NEW_BRAND ? '.theme' : ''),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      OnlyKeepDefaultPluginPath:
        `"${path.resolve(__dirname, '.\\babel-plugin-only-keep-default.js').replace(/\\/g, '/')}"`,
      EnrichExamplesPluginPath:
        `"${path.resolve(__dirname, '.\\babel-plugin-enrich-examples.js').replace(/\\/g, '/')}"`,
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:8089' }),
  ],
};
