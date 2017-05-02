'use strict';

import React from 'react';

const BreakView = (props) => {
  const label = props.breakLabel;
  const className = props.breakClassName || 'break';

  return (
    <li className={className}>
      {label}
    </li>
  );
}

export default BreakView;
