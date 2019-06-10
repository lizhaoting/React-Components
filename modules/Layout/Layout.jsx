import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ResizeContainer from '../Resizer/ResizeContainer';
import Section from '../Section/Section';
import style from './layout.css';

const Layout = (props) => {
  const {
    newTicketInfoWidth,
    onChangeNewTicketInfo,
    rightChildren,
    leftChildren,
    footerChildren,
    } = props;
  return (
    <div
      className={classNames(style.layout)}
    >
      <ResizeContainer
        resizerPosition="right"
        width={newTicketInfoWidth}
        right_minWidth={280}
        right_maxWidth={500}
        left_minWidth={525}
        onStopResize={onChangeNewTicketInfo}
      >
        <div
          className={style.leftContent}
        >
          {leftChildren}
        </div>
        <Section
          panelClass={style.rightContent}
        >
          {rightChildren}
        </Section>
      </ResizeContainer>
      <div
        className={style.footer}
      >
        {footerChildren}
      </div>
    </div>
  );
};

Layout.propTypes = {
  newTicketInfoWidth: PropTypes.number,
  onChangeNewTicketInfo: PropTypes.func,
  rightChildren: PropTypes.element,
  leftChildren: PropTypes.element,
  footerChildren: PropTypes.element,
};

export default Layout;
