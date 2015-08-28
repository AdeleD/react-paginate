'use strict';

var React = require('react');

var PageView = React.createClass({
  render: function() {
    var linkClassName = this.props.pageLinkClassName;
    var cssClassName = this.props.pageClassName;

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
});

module.exports = PageView;
