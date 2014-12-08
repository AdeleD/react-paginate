/** @jsx React.DOM */
'use strict';

var React         = require('react');
var ReactPaginate = require('./../react_components');

window.React = React;


var App = React.createClass({
  render: function () {
    return (
      <nav>
        <ReactPaginate />
      </nav>
    );
  }
});

React.renderComponent(
  new App(),
  document.getElementById('react-paginate')
);
