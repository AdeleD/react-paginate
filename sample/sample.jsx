/** @jsx React.DOM */

var ReactPaginate = require('./../build/react-paginate.js');

var App = React.createClass({
    render: function() {
        return (
            <nav>
                <ReactPaginate />
            </nav>
        );
    }
});

React.renderComponent(App(), document.getElementById('react-paginate'));
