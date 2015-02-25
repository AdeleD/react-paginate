/** @jsx React.DOM */
'use strict';

var React = require('react');


var PageView = React.createClass({
  render: function() {
    if (this.props.selected) {
      var cssClass = 'selected';
    }
    return <li className={cssClass}>
        <a href="" {...this.props}>{this.props.children}</a>
      </li>
  }
});

module.exports = PageView;
