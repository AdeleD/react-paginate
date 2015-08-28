'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var PageView = React.createClass({
  displayName: 'PageView',

  render: function render() {
    var linkClass = this.props.pageLinkClass;
    var cssClass = this.props.pageClass;

    if (this.props.selected) {
      if (typeof cssClass !== 'undefined') {
        cssClass = cssClass + ' ' + this.props.activeClass;
      } else {
        cssClass = this.props.activeClass;
      }
    }

    return React.createElement(
      'li',
      { className: cssClass },
      React.createElement(
        'a',
        _extends({}, this.props, { href: '', className: linkClass }),
        this.props.page
      )
    );
  }
});

module.exports = PageView;