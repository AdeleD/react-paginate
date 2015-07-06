'use strict';

var _ = require('underscore');
var React = require('react/addons');
var PageView = require('./PageView');

var PaginationListView = React.createClass({
  displayName: 'PaginationListView',

  _pageCssClass: function _pageCssClass(i) {
    var cssClass = this.props.pageClass;
    if (i == 0) {
      cssClass += ' ' + this.props.firstPageClass;
    }
    if (i == this.props.pageNum - 1) {
      cssClass += ' ' + this.props.lastPageClass;
    }

    return cssClass;
  },
  render: function render() {
    var items = {};

    if (this.props.pageNum <= this.props.pageRangeDisplayed) {

      var pageViews = _.range(0, this.props.pageNum).map((function (page, i) {
        return React.createElement(PageView, {
          onClick: this.props.onPageSelected.bind(null, page),
          selected: this.props.selected === page,
          cssClass: this._pageCssClass(i),
          activeClass: this.props.activeClass,
          page: page + 1 });
      }).bind(this));

      pageViews.forEach(function (pageView, index) {
        items['key' + index] = pageView;
      });
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
          cssClass: this._pageCssClass(index),
          activeClass: this.props.activeClass,
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