'use strict';

import React, { Component, PropTypes } from 'react';

export class PageView extends Component {
  render() {
    let linkClassName = this.props.pageLinkClassName;
    let cssClassName = this.props.pageClassName;

    if (this.props.selected) {
      if (typeof(cssClassName) !== 'undefined') {
        cssClassName = cssClassName + ' ' + this.props.activeClassName;
      } else {
        cssClassName = this.props.activeClassName;
      }
    }

    return (
        <li className={cssClassName}>
            <a {...this.props} href="" className={linkClassName}>
              {this.props.page}
            </a>
        </li>
    );
  }
};
