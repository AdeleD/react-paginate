/** @jsx React.DOM */

var React = require('react');
var PaginationListView = require("./PaginationListView");

var PaginationBoxView = React.createClass({
    propTypes: {
        pageNum: React.PropTypes.number.isRequired,
        pageRangeDisplayed: React.PropTypes.number.isRequired,
        marginPagesDisplayed: React.PropTypes.number.isRequired,
        previousLabel: React.PropTypes.string,
        nextLabel: React.PropTypes.string,
        breakLabel: React.PropTypes.string,
    },
    getDefaultProps: function() {
        return {
            pageNum: 10,
            pageRangeDisplayed: 2,
            marginPagesDisplayed: 3,
            previousLabel: "Previous",
            nextLabel: "Next",
            breakLabel: "..."
        };
    },
    getInitialState: function() {
        return {selected: 0};
    },
    handlePageSelected: function(index) {
        this.setState({selected: index});
        return false;
    },
    handlePreviousPage: function() {
        if (this.state.selected > 0) {
            this.handlePageSelected(this.state.selected - 1);
        }
        return false;
    },
    handleNextPage: function() {
        if (this.state.selected < this.props.pageNum - 1) {
            this.handlePageSelected(this.state.selected + 1);
        }
        return false;
    },
    render: function() {
        return (
            <ul className="pagination">
                <li onClick={this.handlePreviousPage} className="previous">
                    <a href="">{this.props.previousLabel}</a>
                </li>

                <PaginationListView
                    onPageSelected={this.handlePageSelected}
                    selected={this.state.selected}
                    pageNum={this.props.pageNum}
                    pageRangeDisplayed={this.props.pageRangeDisplayed}
                    marginPagesDisplayed={this.props.marginPagesDisplayed}
                    breakLabel = {this.props.breakLabel} />

                <li onClick={this.handleNextPage} className="next">
                    <a href="">{this.props.nextLabel}</a>
                </li>
            </ul>
        );
    }
});

module.exports = PaginationBoxView;
