'use strict';

var _        = require("underscore");
var React    = require('react');
var PageView = require("./PageView");


var PaginationListView = React.createClass({

  render: function() {

    var items = {};

    if (this.props.pageNum <= this.props.pageRangeDisplayed) {

      var pageViews = _.range(1, this.props.pageNum + 1).map(function(page, index) {
        return (
          <PageView
            onClick={this.props.onPageSelected.bind(null, index)}
            selected={this.props.selected === index}
            activeClass={this.props.activeClass}
            page={page} />
        )
      }.bind(this));

      pageViews.forEach(function(pageView, index) {
        items[String(index)] = pageView;
      });

    } else {

      var leftSide  = (this.props.pageRangeDisplayed / 2);
      var rightSide = (this.props.pageRangeDisplayed - leftSide);

      if (this.props.selected > this.props.pageNum - this.props.pageRangeDisplayed / 2) {
        rightSide = this.props.pageNum - this.props.selected;
        leftSide  = this.props.pageRangeDisplayed - rightSide;
      }

      if (this.props.selected < this.props.pageRangeDisplayed / 2) {
        leftSide  = this.props.selected;
        rightSide = this.props.pageRangeDisplayed - leftSide;
      }

      var index;

      for (index = 1; index < this.props.pageNum + 1; index++) {

        var pageView = (
          <PageView
            onClick={this.props.onPageSelected.bind(null, index)}
            selected={this.props.selected === index}
            activeClass={this.props.activeClass}
            page={index} />
        );

        if (index <= this.props.marginPagesDisplayed) {
          items[String(index)] = pageView;
          continue;
        }

        if (index > this.props.pageNum - this.props.marginPagesDisplayed) {
          items[String(index)] = pageView;
          continue;
        }

        if ((index >= this.props.selected - leftSide) && (index <= this.props.selected + rightSide)) {
          items[String(index)] = pageView;
          continue;
        }

        var keys            = Object.keys(items);
        var breakLabelKey   = keys[keys.length - 1];
        var breakLabelValue = items[breakLabelKey];

        if (breakLabelValue !== this.props.breakLabel) {
          items[String(index)] = this.props.breakLabel;
        }
      }
    }

    return (
      <ul className={this.props.subContainerClassName}>
        {items}
      </ul>
    );
  }
});

module.exports = PaginationListView;
