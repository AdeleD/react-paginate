/** @jsx React.DOM */

var React = require('react');
var PaginationBoxView = require('./PaginationBoxView');


React.renderComponent(
    <PaginationBoxView />,
    document.getElementById('react-paginate')
);
