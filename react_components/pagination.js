/** @jsx React.DOM */

var React = require('react');
var PaginationBoxView = require('./PaginationBoxView');

var ReactPaginate = React.createClass({
    render: function() {
        return (
            <nav>
                <PaginationBoxView />
            </nav>
        );
    }
});

React.renderComponent(ReactPaginate(), document.getElementById('react-paginate'));
