'use strict';

import React from 'react';

export default class PageView extends React.Component {
  render() {
    let cssClassName = this.props.pageClassName;
    const linkClassName = this.props.pageLinkClassName;
    const onClick = this.props.onClick;
    const href = this.props.href;

    if (this.props.selected) {
      if (typeof(cssClassName) !== 'undefined') {
        cssClassName = cssClassName + ' ' + this.props.activeClassName;
      } else {
        cssClassName = this.props.activeClassName;
      }
    }

    return (
        <li className={cssClassName}>
            <a onClick={onClick}
               className={linkClassName}
               href={href}
               tabIndex="0"
               onKeyPress={onClick}>
              {this.props.page}
            </a>
        </li>
    );
  }
};
