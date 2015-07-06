'use strict';

var React = require('react');

var PageView = React.createClass({
  propTypes: {
    selected: React.PropTypes.bool,
    cssClass: React.PropTypes.string,
    activeClass: React.PropTypes.string,
    page: React.PropTypes.number.isRequired
  },
  getDefaultProps: function() {
      return {
          activeClass: 'selected'
      }
  },
  render: function() {
    var cssClass = this.props.cssClass;
    if (this.props.selected) {
      cssClass += ' ' + this.props.activeClass;
    }
    return (
        <li className={cssClass}>
            <a {...this.props} href="">{this.props.page}</a>
        </li>
    );
  }
});

module.exports = PageView;
