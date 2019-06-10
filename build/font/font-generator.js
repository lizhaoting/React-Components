const webfontsGenerator = require('webfonts-generator');
const path = require('path');
const fs = require('fs');

const folder = './modules/Icon';

webfontsGenerator({
  files: fs.readdirSync(path.join(folder, 'icons'))
    .map(file => path.join(folder, 'icons', file)),
  dest: path.join(folder, 'fonts'),
  fontName: `icons_${Date.now()}`,
  cssDest: path.join(folder, 'icon.css'),
  html: true,
  htmlDest: path.join(folder, 'preview.html'),
  cssFontsUrl: './fonts',
  types: ['eot', 'woff', 'ttf', 'svg'],
  cssTemplate: './build/font/css-template.hbs',
  templateOptions: {
    classPrefix: 'icon-',
    baseSelector: '.icon'
  }
}, (error, result) => {
  if (error) console.error(error);
});
