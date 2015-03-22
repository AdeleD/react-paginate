'use strict';

var React = require('react');

var PageView = React.createClass({
  render: function() {
    if (this.props.selected) {
      var cssClass = this.props.activeClass || 'selected';
    }
    return (
        <li className={cssClass}>
            <a {...this.props} href="">{this.props.page}</a>
        </li>
    );
  }
});

module.exports = PageView;
