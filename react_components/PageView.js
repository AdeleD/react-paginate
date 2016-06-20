'use strict';

import React from 'react';

export default class PageView extends React.Component {
  render() {
    let linkClassName = this.props.pageLinkClassName;
    let cssClassName = this.props.pageClassName;
    let {onClick, ...props} = this.props;

    if (this.props.selected) {
      if (typeof(cssClassName) !== 'undefined') {
        cssClassName = cssClassName + ' ' + this.props.activeClassName;
      } else {
        cssClassName = this.props.activeClassName;
      }
    }

    return (
        <li onClick={onClick} className={cssClassName}>
            <a {...props} className={linkClassName}>
              {this.props.page}
            </a>
        </li>
    );
  }
};
