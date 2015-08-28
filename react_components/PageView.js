'use strict';

var React = require('react');

var PageView = React.createClass({
  render: function() {
    var linkClass = this.props.pageLinkClass;
    var cssClass = this.props.pageClass;

    if (this.props.selected) {
      var activeClass = this.props.activeClass || 'selected';

      if (typeof(cssClass) !== 'undefined') {
        cssClass = cssClass + ' ' + activeClass;
      }
    }

    return (
        <li className={cssClass}>
            <a {...this.props} href="" className={linkClass}>
              {this.props.page}
            </a>
        </li>
    );
  }
});

module.exports = PageView;
