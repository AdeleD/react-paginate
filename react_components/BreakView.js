'use strict';

import React from 'react';

export default class BreakView extends React.Component {
  render() {
    let label = this.props.breakLabel;
    let className = this.props.breakClassName || 'break';

    return (
      <li className={className}>
        {label}
      </li>
    );
  }
};
