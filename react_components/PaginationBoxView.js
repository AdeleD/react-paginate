'use strict';

var React              = require('react');
var classNames         = require('classnames');
var PaginationListView = require('./PaginationListView');

var PaginationBoxView = React.createClass({

  propTypes: {
    pageNum               : React.PropTypes.number.isRequired,
    pageRangeDisplayed    : React.PropTypes.number.isRequired,
    marginPagesDisplayed  : React.PropTypes.number.isRequired,
    previousLabel         : React.PropTypes.node,
    nextLabel             : React.PropTypes.node,
    breakLabel            : React.PropTypes.node,
    clickCallback         : React.PropTypes.func,
    initialSelected       : React.PropTypes.number,
    forceSelected         : React.PropTypes.number,
    containerClassName    : React.PropTypes.string,
    subContainerClassName : React.PropTypes.string,
    activeClass           : React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      pageNum              : 10,
      pageRangeDisplayed   : 2,
      marginPagesDisplayed : 3,
      previousLabel        : "Previous",
      nextLabel            : "Next",
      breakLabel           : "..."
    };
  },

  getInitialState: function() {
    return {
      selected: this.props.initialSelected ? this.props.initialSelected : 0
    };
  },

  handlePageSelected: function(selected, event) {
    event.preventDefault();

    if (this.state.selected === selected) return;

    this.setState({selected: selected});

    if (typeof(this.props.clickCallback) !== "undefined" &&
        typeof(this.props.clickCallback) === "function") {
      this.props.clickCallback({selected: selected});
    }
  },

  handlePreviousPage: function(event) {
    event.preventDefault();
    if (this.state.selected > 0) {
      this.handlePageSelected(this.state.selected - 1, event);
    }
  },

  handleNextPage: function(event) {
    event.preventDefault();
    if (this.state.selected < this.props.pageNum - 1) {
      this.handlePageSelected(this.state.selected + 1, event);
    }
  },

  render: function() {
    var previousClasses = classNames({
      'previous': true,
      'disabled': this.state.selected === 0
    });

    var nextClasses = classNames({
      'next': true,
      'disabled': this.state.selected === this.props.pageNum - 1
    });

    return (
      <ul className={this.props.containerClassName}>
        <li onClick={this.handlePreviousPage} className={previousClasses}>
          <a href="">{this.props.previousLabel}</a>
        </li>

        <PaginationListView
          onPageSelected={this.handlePageSelected}
          selected={this.state.selected}
          pageNum={this.props.pageNum}
          pageRangeDisplayed={this.props.pageRangeDisplayed}
          marginPagesDisplayed={this.props.marginPagesDisplayed}
          breakLabel={this.props.breakLabel}
          subContainerClassName={this.props.subContainerClassName}
          activeClass={this.props.activeClass} />

        <li onClick={this.handleNextPage} className={nextClasses}>
          <a href="">{this.props.nextLabel}</a>
        </li>
      </ul>
    );
  },

  componentWillReceiveProps: function (nextProps) {
    if (typeof nextProps.forceSelected !== 'undefined' && nextProps.forceSelected !== this.state.selected) {
      this.setState({ selected: nextProps.forceSelected });
    }
  }
});

module.exports = PaginationBoxView;
