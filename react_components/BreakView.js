'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const BreakView = props => {
  const { breakLabel, breakClassName, breakLinkClassName, onClick } = props;
  const className = breakClassName || 'break';

  return (
    <li className={className}>
      <a
        className={breakLinkClassName}
        tabIndex="0"
        role="button"
        onKeyPress={onClick}
        onClick={onClick}
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
  onClick: PropTypes.func.isRequired,
};

export default BreakView;
