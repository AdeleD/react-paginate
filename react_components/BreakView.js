'use strict';

import React from 'react';

const BreakView = (props) => {
  const label = props.breakLabel;
  const className = props.breakClassName || 'break';
  const linkClassName = props.breakLinkClassName || '';
  const onClick = props.onClick;

  return (
    <li className={className}>
      <a onClick={onClick}
        role="button"
        tabIndex="0"
        onKeyPress={onClick}
        className={linkClassName}>
        {label}
      </a>
    </li>
  );
}

export default BreakView;
