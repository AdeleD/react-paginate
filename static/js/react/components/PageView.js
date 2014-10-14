/** @jsx React.DOM */

var React = require('react');

var PageView = React.createClass({
    render: function() {
        if (this.props.selected) {
            var cssClass = 'selected';
        }
        return this.transferPropsTo(
            <li className={cssClass}>
                <a href="">{this.props.children}</a>
            </li>
        );
    }
});

module.exports = PageView;
