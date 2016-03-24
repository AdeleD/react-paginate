'use strict';

import React, { Component } from 'react';
import createFragment from 'react-addons-create-fragment';
import PageView from './PageView';
import BreakView from './BreakView';


export default class PaginationListView extends Component {
  render() {
    let items = {};

    if (this.props.pageNum <= this.props.pageRangeDisplayed) {

      for (let index = 0; index < this.props.pageNum; index++) {
        items['key' + index] = <PageView
          onClick={this.props.onPageSelected.bind(null, index)}
          selected={this.props.selected === index}
          pageClassName={this.props.pageClassName}
          pageLinkClassName={this.props.pageLinkClassName}
          activeClassName={this.props.activeClassName}
          page={index + 1} />
      }

    } else {

      let leftSide  = (this.props.pageRangeDisplayed / 2);
      let rightSide = (this.props.pageRangeDisplayed - leftSide);

      if (this.props.selected > this.props.pageNum - this.props.pageRangeDisplayed / 2) {
        rightSide = this.props.pageNum - this.props.selected;
        leftSide  = this.props.pageRangeDisplayed - rightSide;
      }
      else if (this.props.selected < this.props.pageRangeDisplayed / 2) {
        leftSide  = this.props.selected;
        rightSide = this.props.pageRangeDisplayed - leftSide;
      }

      let index;
      let page;
      let breakView;

      for (index = 0; index < this.props.pageNum; index++) {

        page = index + 1;

        let pageView = (
          <PageView
            onClick={this.props.onPageSelected.bind(null, index)}
            selected={this.props.selected === index}
            pageClassName={this.props.pageClassName}
            pageLinkClassName={this.props.pageLinkClassName}
            activeClassName={this.props.activeClassName}
            page={index + 1} />
        );

        if (page <= this.props.marginPagesDisplayed) {
          items['key' + index] = pageView;
          continue;
        }

        if (page > this.props.pageNum - this.props.marginPagesDisplayed) {
          items['key' + index] = pageView;
          continue;
        }

        if ((index >= this.props.selected - leftSide) && (index <= this.props.selected + rightSide)) {
          items['key' + index] = pageView;
          continue;
        }

        let keys            = Object.keys(items);
        let breakLabelKey   = keys[keys.length - 1];
        let breakLabelValue = items[breakLabelKey];

        if (breakLabelValue !== breakView) {
          breakView = (
            <BreakView breakLabel={this.props.breakLabel} />
          );

          items['key' + index] = breakView;
        }
      }
    }

    return (
      <ul className={this.props.subContainerClassName}>
        {createFragment(items)}
      </ul>
    );
  }
};
