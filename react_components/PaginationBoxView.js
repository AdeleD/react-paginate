'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import createFragment from 'react-addons-create-fragment';
import PageView from './PageView';
import BreakView from './BreakView';


export default class PaginationBoxView extends Component {
  static propTypes = {
    pageNum               : PropTypes.number.isRequired,
    pageRangeDisplayed    : PropTypes.number.isRequired,
    marginPagesDisplayed  : PropTypes.number.isRequired,
    previousLabel         : PropTypes.node,
    nextLabel             : PropTypes.node,
    breakLabel            : PropTypes.node,
    clickCallback         : PropTypes.func,
    initialSelected       : PropTypes.number,
    forceSelected         : PropTypes.number,
    containerClassName    : PropTypes.string,
    pageClassName         : PropTypes.string,
    pageLinkClassName     : PropTypes.string,
    activeClassName       : PropTypes.string,
    previousClassName     : PropTypes.string,
    nextClassName         : PropTypes.string,
    previousLinkClassName : PropTypes.string,
    nextLinkClassName     : PropTypes.string,
    disabledClassName     : PropTypes.string,
    breakClassName        : PropTypes.string
  };

  static defaultProps = {
    pageNum              : 10,
    pageRangeDisplayed   : 2,
    marginPagesDisplayed : 3,
    activeClassName      : "selected",
    previousClassName    : "previous",
    nextClassName        : "next",
    previousLabel        : "Previous",
    nextLabel            : "Next",
    breakLabel           : "...",
    disabledClassName    : "disabled"
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: props.initialSelected ? props.initialSelected :
                props.forceSelected   ? props.forceSelected :
                0
    };
  }

  componentDidMount() {
    // Call the callback with the initialSelected item:
    if (typeof(this.props.initialSelected) !== 'undefined') {
      this.callCallback(this.props.initialSelected);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof(nextProps.forceSelected) !== 'undefined' && this.props.forceSelected !== nextProps.forceSelected) {
      this.setState({selected: nextProps.forceSelected});
    }
  }

  handlePreviousPage = evt => {
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    if (this.state.selected > 0) {
      this.handlePageSelected(this.state.selected - 1, evt);
    }
  };

  handleNextPage = evt => {
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    if (this.state.selected < this.props.pageNum - 1) {
      this.handlePageSelected(this.state.selected + 1, evt);
    }
  };

  handlePageSelected = (selected, evt) => {
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);

    if (this.state.selected === selected) return;

    this.setState({selected: selected});

    // Call the callback with the new selected item:
    this.callCallback(selected);
  };

  callCallback = (selectedItem) => {
    if (typeof(this.props.clickCallback) !== "undefined" &&
        typeof(this.props.clickCallback) === "function") {
      this.props.clickCallback({selected: selectedItem});
    }
  };

  pagination = () => {
    let items = {};

    if (this.props.pageNum <= this.props.pageRangeDisplayed) {

      for (let index = 0; index < this.props.pageNum; index++) {
        items['key' + index] = <PageView
          onClick={this.handlePageSelected.bind(null, index)}
          selected={this.state.selected === index}
          pageClassName={this.props.pageClassName}
          pageLinkClassName={this.props.pageLinkClassName}
          activeClassName={this.props.activeClassName}
          page={index + 1} />
      }

    } else {

      let leftSide  = (this.props.pageRangeDisplayed / 2);
      let rightSide = (this.props.pageRangeDisplayed - leftSide);

      if (this.state.selected > this.props.pageNum - this.props.pageRangeDisplayed / 2) {
        rightSide = this.props.pageNum - this.state.selected;
        leftSide  = this.props.pageRangeDisplayed - rightSide;
      }
      else if (this.state.selected < this.props.pageRangeDisplayed / 2) {
        leftSide  = this.state.selected;
        rightSide = this.props.pageRangeDisplayed - leftSide;
      }

      let index;
      let page;
      let breakView;

      for (index = 0; index < this.props.pageNum; index++) {

        page = index + 1;

        let pageView = (
          <PageView
            onClick={this.handlePageSelected.bind(null, index)}
            selected={this.state.selected === index}
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

        if ((index >= this.state.selected - leftSide) && (index <= this.state.selected + rightSide)) {
          items['key' + index] = pageView;
          continue;
        }

        let keys            = Object.keys(items);
        let breakLabelKey   = keys[keys.length - 1];
        let breakLabelValue = items[breakLabelKey];

        if (this.props.breakLabel && breakLabelValue !== breakView) {
          breakView = (
            <BreakView
              breakLabel={this.props.breakLabel}
              breakClassName={this.props.breakClassName}
            />
          );

          items['key' + index] = breakView;
        }
      }
    }

    return items;
  };

  render() {
    let disabled = this.props.disabledClassName;

    const previousClasses = classNames(this.props.previousClassName,
                                       {[disabled]: this.state.selected === 0});

    const nextClasses = classNames(this.props.nextClassName,
                                   {[disabled]: this.state.selected === this.props.pageNum - 1});

    return (
      <ul className={this.props.containerClassName}>
        <li onClick={this.handlePreviousPage} className={previousClasses}>
          <a className={this.props.previousLinkClassName}>{this.props.previousLabel}</a>
        </li>

        {createFragment(this.pagination())}

        <li onClick={this.handleNextPage} className={nextClasses}>
          <a className={this.props.nextLinkClassName}>{this.props.nextLabel}</a>
        </li>
      </ul>
    );
  }
};
