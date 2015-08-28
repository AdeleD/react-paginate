'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var PageView = React.createClass({
  displayName: 'PageView',

  render: function render() {
    var linkClassName = this.props.pageLinkClassName;
    var cssClassName = this.props.pageClassName;

    if (this.props.selected) {
      if (typeof cssClassName !== 'undefined') {
        cssClassName = cssClassName + ' ' + this.props.activeClassName;
      } else {
        cssClassName = this.props.activeClassName;
      }
    }

    return React.createElement(
      'li',
      { className: cssClassName },
      React.createElement(
        'a',
        _extends({}, this.props, { href: '', className: linkClassName }),
        this.props.page
      )
    );
  }
});

module.exports = PageView;