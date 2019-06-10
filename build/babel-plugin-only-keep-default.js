/**
 * This babel plugin is designed to help build React project.
 * Each React Comopnent file might contain an `export const examples = {}` object, which defines
 * the possible examples of current React Component for demonstration. However, these examples are
 * not necessary for product, thus should be removed when building React project.
 *
 * This plugin will simply remove `export const examples = {...}` part in file
 *
 * @return {object} Babel visitor definition
 */
module.exports = function () {
  return {
    visitor: {
      ExportNamedDeclaration(path) {
        // only remove export const examples = {}
        if (path.get('declaration').node !== null &&
          path.get('declaration.declarations')[0].get('id.name').node === 'examples') {
          path.remove();
        }
      },
    },
  };
};
