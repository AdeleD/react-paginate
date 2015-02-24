/** @jsx React.DOM */
'use strict';

var React              = require('react');
var PaginationListView = require("./PaginationListView");


var PaginationBoxView = React.createClass({
  propTypes: {
    pageNum: React.PropTypes.number.isRequired,
    pageRangeDisplayed: React.PropTypes.number.isRequired,
    marginPagesDisplayed: React.PropTypes.number.isRequired,
    previousLabel: React.PropTypes.node,
    nextLabel: React.PropTypes.node,
    breakLabel: React.PropTypes.node,
    clickCallback: React.PropTypes.func,
    initialSelected: React.PropTypes.number
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
    return {selected: this.props.initialSelected ? this.props.initialSelected :1};
  },
  handlePageSelected: function(index, event) {
    event.preventDefault();
    if (this.state.selected !== index) {
      this.setState({selected: index});

      if (typeof(this.props.clickCallback) !== "undefined" && typeof(this.props.clickCallback) === "function")
        this.props.clickCallback({selected: index});
    }
  },
  handlePreviousPage: function(event) {
    event.preventDefault();
    if (this.state.selected > 1) {
      this.handlePageSelected(this.state.selected - 1, event);
    }
  },
  handleNextPage: function(event) {
    event.preventDefault();
    if (this.state.selected < this.props.pageNum) {
      this.handlePageSelected(this.state.selected + 1, event);
    }
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
