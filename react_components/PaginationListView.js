/** @jsx React.DOM */
'use strict';

var React = require('react');
var PageView = require("./PageView");


var PaginationListView = React.createClass({
    render: function() {
        if (this.props.pageNum <= this.props.pageRangeDisplayed) {
            items = _.range(1, this.props.pageNum + 1).map(function(page, index) {
                return (
                    <PageView
                        onClick={this.props.onPageSelected.bind(null, index)}
                        selected={this.props.selected === index}
                        key={index}>
                        {page}
                    </PageView>
                )
            }.bind(this));
        } else {
            var leftSide = (this.props.pageRangeDisplayed / 2),
                rightSide = (this.props.pageRangeDisplayed - leftSide);

            if (this.props.selected > this.props.pageNum - this.props.pageRangeDisplayed / 2) {
                rightSide = this.props.pageNum - this.props.selected;
                leftSide = this.props.pageRangeDisplayed - rightSide;
            }
            else if (this.props.selected < this.props.pageRangeDisplayed / 2) {
                leftSide = this.props.selected;
                rightSide = this.props.pageRangeDisplayed - leftSide;
            }

            var items = [];

            for (var index=0; index < this.props.pageNum; index++) {
                var pageView = (
                    <PageView
                        onClick={this.props.onPageSelected.bind(null, index)}
                        selected={this.props.selected === index}
                        key={index}>
                        {index + 1}
                        </PageView>
                );

                if (index <= this.props.pageRangeDisplayed) {
                    items.push(pageView);
                    continue;
                }
                if (index > this.props.pageNum - this.props.marginPagesDisplayed) {
                    items.push(pageView);
                    continue;
                }
                if ((index >= this.props.selected - leftSide) && (index <= this.props.selected + rightSide)) {
                    items.push(pageView);
                    continue;
                }
                if (items[items.length-1] !== this.props.breakLabel) {
                    items.push(this.props.breakLabel);
                }
            }
        }

        return (
            <ul className="pages">
                {items}
            </ul>
        );
    }
});

module.exports = PaginationListView;
