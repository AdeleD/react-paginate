'use strict';

var React = require('react/addons');
var PageView = require('./PageView');

var PaginationListView = React.createClass({
  displayName: 'PaginationListView',

  render: function render() {
    var items = {};

    if (this.props.pageNum <= this.props.pageRangeDisplayed) {

      for (var index = 0; index < this.props.pageNum; index++) {
        items['key' + index] = React.createElement(PageView, {
          onClick: this.props.onPageSelected.bind(null, index),
          selected: this.props.selected === index,
          pageClassName: this.props.pageClassName,
          pageLinkClassName: this.props.pageLinkClassName,
          activeClassName: this.props.activeClassName,
          page: index + 1 });
      }
    } else {

      var leftSide = this.props.pageRangeDisplayed / 2;
      var rightSide = this.props.pageRangeDisplayed - leftSide;

      if (this.props.selected > this.props.pageNum - this.props.pageRangeDisplayed / 2) {
        rightSide = this.props.pageNum - this.props.selected;
        leftSide = this.props.pageRangeDisplayed - rightSide;
      } else if (this.props.selected < this.props.pageRangeDisplayed / 2) {
        leftSide = this.props.selected;
        rightSide = this.props.pageRangeDisplayed - leftSide;
      }

      var index;
      var page;

      for (index = 0; index < this.props.pageNum; index++) {

        page = index + 1;

        var pageView = React.createElement(PageView, {
          onClick: this.props.onPageSelected.bind(null, index),
          selected: this.props.selected === index,
          pageClassName: this.props.pageClassName,
          pageLinkClassName: this.props.pageLinkClassName,
          activeClassName: this.props.activeClassName,
          page: index + 1 });

        if (page <= this.props.marginPagesDisplayed) {
          items['key' + index] = pageView;
          continue;
        }

        if (page > this.props.pageNum - this.props.marginPagesDisplayed) {
          items['key' + index] = pageView;
          continue;
        }

        if (index >= this.props.selected - leftSide && index <= this.props.selected + rightSide) {
          items['key' + index] = pageView;
          continue;
        }

        var keys = Object.keys(items);
        var breakLabelKey = keys[keys.length - 1];
        var breakLabelValue = items[breakLabelKey];

        if (breakLabelValue !== this.props.breakLabel) {
          items['key' + index] = this.props.breakLabel;
        }
      }
    }

    return React.createElement(
      'ul',
      { className: this.props.subContainerClassName },
      React.addons.createFragment(items)
    );
  }
});

module.exports = PaginationListView;