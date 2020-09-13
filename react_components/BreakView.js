'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const BreakView = (props) => {
  const { breakLabel, breakClassName, breakLinkClassName, breakHandler, getEventListener } = props;
  const className = breakClassName || 'break';

  return (
    <li className={className}>
      <a
        className={breakLinkClassName}
        role="button"
        tabIndex="0"
        onKeyPress={breakHandler}
        {...getEventListener(breakHandler)}
      >
        {breakLabel}
      </a>
    </li>
  );
};

BreakView.propTypes = {
  breakLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  breakClassName: PropTypes.string,
  breakLinkClassName: PropTypes.string,
  breakHandler: PropTypes.func.isRequired,
  getEventListener: PropTypes.func.isRequired,
};

export default BreakView;
