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
        <li onClick={onClick} className={cssClassName}>
            <a className={linkClassName} href={href}>
              {this.props.page}
            </a>
        </li>
    );
  }
};
