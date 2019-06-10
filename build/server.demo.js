const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./webpack.demo.config.js');

const port = 8089;

new webpackDevServer(webpack(config), config.devServer)
.listen(8089,  'localhost', (err) => {
  if (err) {
    console.log('Webpack Dev Server encounters error: ', err);
  }

  console.log([
    'Compilling...',
    'Web page will be opened automatically when compilation finishes, please hold on.',
    `You can also visit http://localhost:${port} to check.`,
  ].join('\n'));
});