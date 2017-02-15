'use strict';

import React from 'react';

export default class PageView extends React.Component {
  render() {
    let linkClassName = this.props.pageLinkClassName;
    let cssClassName = this.props.pageClassName;
    let onClick = this.props.onClick;
    let ariaLabel = 'Page ' + this.props.page +
      (this.props.extraAriaContext ? ' ' + this.props.extraAriaContext : '');

    if (this.props.selected) {
      ariaLabel = 'Page ' + this.props.page + ' is your current page';
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
               tabIndex="0"
               aria-label={ariaLabel}
               onKeyPress={onClick}>
              {this.props.page}
            </a>
        </li>
    );
  }
};
