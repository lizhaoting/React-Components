import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import classNames from 'classnames';
import style from './ellipsis.css';

const basedOn = {
  letter: 'letters',
  word: 'words',
};
const Ellipsis = props => (
  <div className={classNames(style.left, props.className)}>
    <LinesEllipsis
      text={props.text}
      maxLine={props.maxLine}
      ellipsis={props.ellipsis}
      trimRight={props.trimRight}
      basedOn={props.basedOn}
    />
  </div>
);

Ellipsis.basedOn = basedOn;

Ellipsis.defaultProps = {
  className: '',
  maxLine: 1,
  ellipsis: '...',
  trimRight: true,
  basedOn: basedOn.letter,
};

Ellipsis.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  maxLine: PropTypes.number,
  ellipsis: PropTypes.string,
  trimRight: PropTypes.bool,
  basedOn: PropTypes.string,
};

export default Ellipsis;
