import PropTypes from 'prop-types';

const Column = () => null;

Column.propTypes = {
  name: PropTypes.string.isRequired,
  dataKey: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  th: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  td: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  propsMap: PropTypes.func,
  ifCanSort: PropTypes.bool,
};

export default Column;
