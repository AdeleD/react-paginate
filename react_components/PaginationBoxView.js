'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageView from './PageView';
import BreakView from './BreakView';


export default class PaginationBoxView extends Component {
  static propTypes = {
    pageCount             : PropTypes.number.isRequired,
    pageRangeDisplayed    : PropTypes.number.isRequired,
    marginPagesDisplayed  : PropTypes.number.isRequired,
    previousLabel         : PropTypes.node,
    nextLabel             : PropTypes.node,
    breakLabel            : PropTypes.node,
    hrefBuilder           : PropTypes.func,
    onPageChange          : PropTypes.func,
    initialPage           : PropTypes.number,
    forcePage             : PropTypes.number,
    disableInitialCallback: PropTypes.bool,
    containerClassName    : PropTypes.string,
    pageClassName         : PropTypes.string,
    pageLinkClassName     : PropTypes.string,
    activeClassName       : PropTypes.string,
    previousClassName     : PropTypes.string,
    nextClassName         : PropTypes.string,
    previousLinkClassName : PropTypes.string,
    nextLinkClassName     : PropTypes.string,
    disabledClassName     : PropTypes.string,
    breakClassName        : PropTypes.string,
    oneIndexed           : PropTypes.bool
  };

  static defaultProps = {
    pageCount             : 10,
    pageRangeDisplayed    : 2,
    marginPagesDisplayed  : 3,
    activeClassName       : "selected",
    previousClassName     : "previous",
    nextClassName         : "next",
    previousLabel         : "Previous",
    nextLabel             : "Next",
    breakLabel            : "...",
    disabledClassName     : "disabled",
    disableInitialCallback: false,
    oneIndexed            : false
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: props.initialPage ? props.initialPage :
        props.forcePage   ? props.forcePage :
          0
    };
  }

  componentDidMount() {
    const { initialPage, disableInitialCallback } = this.props;
    // Call the callback with the initialPage item:
    if (typeof(initialPage) !== 'undefined' && !disableInitialCallback) {
      this.callCallback(initialPage);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof(nextProps.forcePage) !== 'undefined' && this.props.forcePage !== nextProps.forcePage) {
      this.setState({selected: nextProps.forcePage});
    }
  }

  handlePreviousPage = evt => {
    const { selected } = this.state;
    const { oneIndexed } = this.props;
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    if (selected > (oneIndexed ? 1 : 0)) {
      this.handlePageSelected(selected - 1, evt);
    }
  };

  handleNextPage = evt => {
    const { selected } = this.state;
    const { pageCount, oneIndexed } = this.props;

    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    if (selected < pageCount - (oneIndexed ? 0 : 1)) {
      this.handlePageSelected(selected + 1, evt);
    }
  };

  handlePageSelected = (selected, evt) => {
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);

    if (this.state.selected === selected) return;

    this.setState({selected: selected});

    // Call the callback with the new selected item:
    this.callCallback(selected);
  };

  hrefBuilder(pageIndex) {
    const {
      hrefBuilder,
      pageCount,
      oneIndexed
    } = this.props;
    if (hrefBuilder &&
      pageIndex !== this.state.selected &&
      pageIndex >= 0 &&
      pageIndex < pageCount + (oneIndexed ? 1 : 0)
    ) {
      return hrefBuilder(pageIndex + (oneIndexed ? 0 : 1));
    }
  }

  callCallback = (selectedItem) => {
    if (typeof(this.props.onPageChange) !== "undefined" &&
      typeof(this.props.onPageChange) === "function") {
      this.props.onPageChange({selected: selectedItem});
    }
  };

  getPageElement(index) {
    const { selected } = this.state;
    const {
      pageClassName,
      pageLinkClassName,
      activeClassName,
      extraAriaContext,
      oneIndexed
    } = this.props;

    return <PageView
      key={index}
      onClick={this.handlePageSelected.bind(null, index)}
      selected={selected === index}
      pageClassName={pageClassName}
      pageLinkClassName={pageLinkClassName}
      activeClassName={activeClassName}
      extraAriaContext={extraAriaContext}
      href={this.hrefBuilder(index)}
      page={oneIndexed ? index : index + 1} />
  }

  pagination = () => {
    const items = [];
    const {
      pageRangeDisplayed,
      pageCount,
      marginPagesDisplayed,
      breakLabel,
      breakClassName,
      oneIndexed
    } = this.props;

    const { selected } = this.state;

    if (pageCount <= pageRangeDisplayed) {

      for (let index = 0; index < pageCount; index++) {
        items.push(this.getPageElement(index));
      }

    } else {

      let leftSide  = (pageRangeDisplayed / 2);
      let rightSide = (pageRangeDisplayed - leftSide);

      if (selected > pageCount - pageRangeDisplayed / 2) {
        rightSide = pageCount - selected;
        leftSide  = pageRangeDisplayed - rightSide;
      }
      else if (selected < pageRangeDisplayed / 2) {
        leftSide  = selected;
        rightSide = pageRangeDisplayed - leftSide;
      }

      let index;
      let page;
      let breakView;
      let createPageView = (index) => this.getPageElement(oneIndexed ? index + 1 : index);

      for (index = 0; index < pageCount; index++) {

        page = index + 1;

        if (page <= marginPagesDisplayed) {
          items.push(createPageView(index));
          continue;
        }

        if (page > pageCount - marginPagesDisplayed) {
          items.push(createPageView(index));
          continue;
        }

        if ((index >= selected - leftSide) && (index <= selected + rightSide)) {
          items.push(createPageView(index));
          continue;
        }

        if (breakLabel && items[items.length - 1] !== breakView) {
          breakView = (
            <BreakView
              key={oneIndexed ? index + 1 : index}
              breakLabel={breakLabel}
              breakClassName={breakClassName}
            />
          );
          items.push(breakView);
        }
      }
    }

    return items;
  };

  render() {
    const {
      disabledClassName,
      previousClassName,
      nextClassName,
      pageCount,
      containerClassName,
      previousLinkClassName,
      previousLabel,
      nextLinkClassName,
      nextLabel,
      oneIndexed
    } = this.props;

    const { selected } = this.state;

    const previousClasses = previousClassName + (selected === (oneIndexed ? 1 : 0) ? ` ${disabledClassName}` : '');
    const nextClasses = nextClassName + (selected === pageCount - (oneIndexed ? 0 : 1) ? ` ${disabledClassName}` : '');

    return (
      <ul className={containerClassName}>
        <li className={previousClasses}>
          <a onClick={this.handlePreviousPage}
             className={previousLinkClassName}
             href={this.hrefBuilder(selected - 1)}
             tabIndex="0"
             role="button"
             onKeyPress={this.handlePreviousPage}>
            {previousLabel}
          </a>
        </li>

        {this.pagination()}

        <li className={nextClasses}>
          <a onClick={this.handleNextPage}
             className={nextLinkClassName}
             href={this.hrefBuilder(selected + 1)}
             tabIndex="0"
             role="button"
             onKeyPress={this.handleNextPage}>
            {nextLabel}
          </a>
        </li>
      </ul>
    );
  }
};
