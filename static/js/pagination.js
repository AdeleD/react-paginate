/** @jsx React.DOM */

var React = require('react');
var PaginationBoxView  = require('./react/components/PaginationBoxView');


function ReactPagination() {}

ReactPagination.prototype.render = function(container) {
    React.renderComponent(
        <PaginationBoxView />,
        document.getElementById('react-pagination')
    );
}

module.exports = ReactPagination;
