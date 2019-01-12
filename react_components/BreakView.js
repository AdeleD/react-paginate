'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const BreakView = props => {
  const label = props.breakLabel;
  const className = props.breakClassName || 'break';
  const onClick = props.onClick;

  return (
    <li className={className}>
      <a onClick={onClick} role="button" tabIndex="0" onKeyPress={onClick}>
        {label}
      </a>
    </li>
  );
};

BreakView.propTypes = {
  breakLabel: PropTypes.string.isRequired,
  breakClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default BreakView;
