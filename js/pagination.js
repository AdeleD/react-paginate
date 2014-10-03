/** @jsx React.DOM */
var React = require("react");
var PaginationBoxView = require("../components/PaginationBoxView");

React.renderComponent(
    <PaginationBoxView />,
    document.getElementById('react-pagination')
);