'use strict';

var React = require('react');
var classNames = require('classnames');
var PaginationListView = require('./PaginationListView');

var PaginationBoxView = React.createClass({
  displayName: 'PaginationBoxView',

  propTypes: {
    pageNum: React.PropTypes.number.isRequired,
    pageRangeDisplayed: React.PropTypes.number.isRequired,
    marginPagesDisplayed: React.PropTypes.number.isRequired,
    previousLabel: React.PropTypes.node,
    nextLabel: React.PropTypes.node,
    breakLabel: React.PropTypes.node,
    clickCallback: React.PropTypes.func,
    initialSelected: React.PropTypes.number,
    forceSelected: React.PropTypes.number,
    containerClassName: React.PropTypes.string,
    subContainerClassName: React.PropTypes.string,
    pageClass: React.PropTypes.string,
    pageLinkClass: React.PropTypes.string,
    activeClass: React.PropTypes.string,
    previousClass: React.PropTypes.string,
    nextClass: React.PropTypes.string,
    previousLinkClass: React.PropTypes.string,
    nextLinkClass: React.PropTypes.string,
    disabledClass: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      pageNum: 10,
      pageRangeDisplayed: 2,
      marginPagesDisplayed: 3,
      activeClass: "selected",
      previousClass: "previous",
      nextClass: "next",
      previousLabel: "Previous",
      nextLabel: "Next",
      breakLabel: "...",
      disabledClass: "disabled"
    };
  },

  getInitialState: function getInitialState() {
    return {
      selected: this.props.initialSelected ? this.props.initialSelected : 0
    };
  },

  handlePageSelected: function handlePageSelected(selected, event) {
    event.preventDefault();

    if (this.state.selected === selected) return;

    this.setState({ selected: selected });

    if (typeof this.props.clickCallback !== "undefined" && typeof this.props.clickCallback === "function") {
      this.props.clickCallback({ selected: selected });
    }
  },

  handlePreviousPage: function handlePreviousPage(event) {
    event.preventDefault();
    if (this.state.selected > 0) {
      this.handlePageSelected(this.state.selected - 1, event);
    }
  },

  handleNextPage: function handleNextPage(event) {
    event.preventDefault();
    if (this.state.selected < this.props.pageNum - 1) {
      this.handlePageSelected(this.state.selected + 1, event);
    }
  },

  render: function render() {
    var disabled = this.props.disabledClass;

    var previousClasses = classNames(this.props.previousClass, { disabled: this.state.selected === 0 });

    var nextClasses = classNames(this.props.nextClass, { disabled: this.state.selected === this.props.pageNum - 1 });

    return React.createElement(
      'ul',
      { className: this.props.containerClassName },
      React.createElement(
        'li',
        { onClick: this.handlePreviousPage, className: previousClasses },
        React.createElement(
          'a',
          { href: '', className: this.props.previousLinkClass },
          this.props.previousLabel
        )
      ),
      React.createElement(PaginationListView, {
        onPageSelected: this.handlePageSelected,
        selected: this.state.selected,
        pageNum: this.props.pageNum,
        pageRangeDisplayed: this.props.pageRangeDisplayed,
        marginPagesDisplayed: this.props.marginPagesDisplayed,
        breakLabel: this.props.breakLabel,
        subContainerClassName: this.props.subContainerClassName,
        pageClass: this.props.pageClass,
        pageLinkClass: this.props.pageLinkClass,
        activeClass: this.props.activeClass,
        disabledClass: this.props.disabledClass }),
      React.createElement(
        'li',
        { onClick: this.handleNextPage, className: nextClasses },
        React.createElement(
          'a',
          { href: '', className: this.props.nextLinkClass },
          this.props.nextLabel
        )
      )
    );
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (typeof nextProps.forceSelected !== 'undefined' && nextProps.forceSelected !== this.state.selected) {
      this.setState({ selected: nextProps.forceSelected });
    }
  }
});

module.exports = PaginationBoxView;