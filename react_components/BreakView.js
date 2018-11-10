'use strict';

import React from 'react';

const BreakView = (props) => {
  const label = props.breakLabel;
  const className = props.breakClassName || 'break';
  const onClick = props.onClick;

  return (
    <li className={className}>
      <a onClick={onClick}
        role="button"
        tabIndex="0"
        onKeyPress={onClick}>
        {label}
      </a>
    </li>
  );
}

export default BreakView;
