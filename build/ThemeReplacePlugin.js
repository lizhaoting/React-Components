/**
 * This plugin is for dynamically require certain .css files to create different themes.
 *
 * Instead of require('some.css') directly, this plugin will add sufix to css files
 * As a result, same code can compile to different themes.
 *
 * Example:
 *
 * If '-new_theme' is given, require('some.css') will actually require 'some-new_theme.css' instead.
 */

function ThemeReplacePlugin(themeSufix) {
  this.themeSufix = themeSufix;
  this.includePattern = /\.css$/;
  this.excludePattern = new RegExp(`${themeSufix}\.css$`);
}

ThemeReplacePlugin.prototype.apply = function (compiler) {
  const themeSufix = this.themeSufix;
  compiler.plugin('normal-module-factory', nmf => {
    nmf.plugin('before-resolve', (result, callback) => {
      if (!result) return callback();
      if (this.excludePattern.test(result.request)) return callback(null, result);
      const ret = result;
      if (this.includePattern.test(ret.request)) {
        ret.request = ret.request.replace(this.includePattern, `${themeSufix}.css`);
      }
      return callback(null, ret);
    });
  });
};

module.exports = ThemeReplacePlugin;
