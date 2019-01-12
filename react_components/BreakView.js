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
        onClick={onClick}
        role="button"
        tabIndex="0"
        onKeyPress={onClick}
      >
        {breakLabel}
      </a>
    </li>
  );
};

BreakView.propTypes = {
  breakLabel: PropTypes.string.isRequired,
  breakClassName: PropTypes.string,
  breakLinkClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default BreakView;
