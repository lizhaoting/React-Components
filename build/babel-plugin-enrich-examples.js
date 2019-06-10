/**
 * This babel plugin is designed to help illustrate React Components
 * As convention, the examples of each component should be written in same React Component file,
 * expoted as an object named `examples` with structure in the following way:
 * {
 *   example-name: {
 *     description: 'description in string',
 *     component: React.element
 *   }
 * }
 *
 * This plugin will read the `component` part of each example, and add a `raw` attribute back.
 * The `raw` attribute will have a string as value, which is the same as how React.element in
 * `component` is generated in JSX.
 *
 * example:
 *
 *  - input:  { ... { component: <Input value="value" /> } }
 *  - output: { ... { component: <Input value="value" />, raw: '<Input value="value" />' } }
 *
 * @param {object} types - Babel type helper
 * @return {object} Babel visitor definition
 */
module.exports = function ({ types: t }) {
  return {
    visitor: {
      ExportNamedDeclaration(path, state) {
        if (path.get('declaration').node === null) return;

        const declarations = path.get('declaration.declarations');
        // ExportNamedDeclaration such as `export { a, b };` will not have declarations
        if (!declarations) return;

        // other export will not be modified
        const declaration = declarations.filter(d => d.get('id.name') === 'examples')[0];
        if (!declaration) return;

        const examples = declaration.get('init.properties').map(example => {
          const properties = example.get('value.properties');

          // if `raw` attribute exists, will not modify
          if (properties.some(prop => prop.get('key.name').node === 'raw')) return example;

          const component = properties
            .filter(prop => prop.get('key.name').node === 'component')[0]
            .get('value');
          const { start, end } = component.node;
          const code = state.file.code.substr(start, end - start);

          example.get('value').replaceWith(
            t.objectExpression(
              properties.map(p => p.node)
              .concat(t.objectProperty(t.identifier('raw'), t.stringLiteral(code)))
            )
          );
          return example;
        }).map(example => example.node);

        declaration.get('init').replaceWith(t.objectExpression(examples));
      },
    },
  };
};
