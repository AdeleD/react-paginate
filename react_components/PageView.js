'use strict';

import React from 'react';

export default class PageView extends React.Component {
  render() {
    let cssClassName = this.props.pageClassName;
    const linkClassName = this.props.pageLinkClassName;
    const onClick = this.props.onClick;
    const href = this.props.href;
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
               href={href}
               tabIndex="0"
               aria-label={ariaLabel}
               onKeyPress={onClick}>
              {this.props.page}
            </a>
        </li>
    );
  }
};
