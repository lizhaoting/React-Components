/**
 * This webpack plugin is designed to execute certain command lines before and after each build.
 *
 * Usage:
 * new ShellExecutePlugin({
 *   onBuildStart: [
 *     'echo "execute before build"',
 *   ],
 *   onBuildEnd: [
 *     'echo "execute after build",
 *   ],
 * })
 */

const exec = require('child_process').exec;

function puts(error, stdout /* , stderr */) {
  if (error) console.error(error);
  console.log(stdout);
  // console.log(error, stdout, stderr);
}

function WebpackShellPlugin(options) {
  const defaultOptions = {
    // scripts that should be run before build
    onBuildStart: [],
    // scripts that should be run after build
    onBuildEnd: [],
  };
  this.options = Object.assign(defaultOptions, options);
}

WebpackShellPlugin.prototype.apply = function (compiler) {
  const options = this.options;
  compiler.plugin('compilation', () => {
    if (options.onBuildStart.length === 0) return;
    console.log('Executing pre-build scripts.');
    options.onBuildStart.forEach(script => exec(script, puts));
  });
  compiler.plugin('after-emit', (compilation, callback) => {
    if (options.onBuildEnd.length) {
      console.log('Executing post-build scripts.');
      options.onBuildEnd.forEach(script => exec(script, puts));
    }
    callback();
  });
};

module.exports = WebpackShellPlugin;
