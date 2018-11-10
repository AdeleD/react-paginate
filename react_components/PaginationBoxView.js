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
    breakLabel            : PropTypes.oneOfType([
                              PropTypes.string,
                              PropTypes.node,
                            ]),
    hrefBuilder           : PropTypes.func,
    onPageChange          : PropTypes.func,
    initialPage           : PropTypes.number,
    forcePage             : PropTypes.number,
    disableInitialCallback: PropTypes.bool,
    containerClassName    : PropTypes.string,
    pageClassName         : PropTypes.string,
    pageLinkClassName     : PropTypes.string,
    activeClassName       : PropTypes.string,
    activeLinkClassName   : PropTypes.string,
    previousClassName     : PropTypes.string,
    nextClassName         : PropTypes.string,
    previousLinkClassName : PropTypes.string,
    nextLinkClassName     : PropTypes.string,
    disabledClassName     : PropTypes.string,
    breakClassName        : PropTypes.string
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
    disableInitialCallback: false
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
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    if (selected > 0) {
      this.handlePageSelected(selected - 1, evt);
    }
  };

  handleNextPage = evt => {
    const { selected } = this.state;
    const { pageCount } = this.props;

    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    if (selected < pageCount - 1) {
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

  getForwardJump() {
    const { selected } = this.state;
    const { pageCount, pageRangeDisplayed } = this.props;

    const forwardJump = selected + pageRangeDisplayed;
    return forwardJump >= pageCount ? pageCount - 1 : forwardJump;
  }

  getBackwardJump() {
    const { selected } = this.state;
    const { pageRangeDisplayed } = this.props;

    const backwardJump = selected - pageRangeDisplayed;
    return backwardJump < 0 ? 0 : backwardJump;
  }

  handleBreakClick = (index, evt) => {
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);

    const { selected } = this.state;

    this.handlePageSelected(
      selected < index ?
        this.getForwardJump() :
        this.getBackwardJump(),
      evt
    );
  }

  hrefBuilder(pageIndex) {
    const { hrefBuilder, pageCount } = this.props;
    if (hrefBuilder &&
      pageIndex !== this.state.selected &&
      pageIndex >= 0 &&
      pageIndex < pageCount
    ) {
      return hrefBuilder(pageIndex + 1);
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
      activeLinkClassName,
      extraAriaContext
    } = this.props;

    return <PageView
      key={index}
      onClick={this.handlePageSelected.bind(null, index)}
      selected={selected === index}
      pageClassName={pageClassName}
      pageLinkClassName={pageLinkClassName}
      activeClassName={activeClassName}
      activeLinkClassName={activeLinkClassName}
      extraAriaContext={extraAriaContext}
      href={this.hrefBuilder(index)}
      page={index + 1} />
  }

  pagination = () => {
    const items = [];
    const {
      pageRangeDisplayed,
      pageCount,
      marginPagesDisplayed,
      breakLabel,
      breakClassName
    } = this.props;

    const { selected } = this.state;

    if (pageCount <= pageRangeDisplayed) {

      for (let index = 0; index < pageCount; index++) {
        items.push(this.getPageElement(index));
      }

    } else {

      let leftSide  = (pageRangeDisplayed / 2);
      let rightSide = (pageRangeDisplayed - leftSide);

      // If the selected page index is on the default right side of the pagination,
      // we consider that the new right side is made up of it (= only one break element).
      // If the selected page index is on the default left side of the pagination,
      // we consider that the new left side is made up of it (= only one break element).
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
      let createPageView = (index) => this.getPageElement(index);

      for (index = 0; index < pageCount; index++) {

        page = index + 1;

        // If the page index is lower than the margin defined,
        // the page has to be displayed on the left side of
        // the pagination.
        if (page <= marginPagesDisplayed) {
          items.push(createPageView(index));
          continue;
        }

        // If the page index is greater than the page count
        // minus the margin defined, the page has to be
        // displayed on the right side of the pagination.
        if (page > pageCount - marginPagesDisplayed) {
          items.push(createPageView(index));
          continue;
        }

        // If the page index is near the selected page index
        // and inside the defined range (pageRangeDisplayed)
        // we have to display it (it will create the center
        // part of the pagination).
        if ((index >= selected - leftSide) && (index <= selected + rightSide)) {
          items.push(createPageView(index));
          continue;
        }

        // If the page index doesn't meet any of the conditions above,
        // we check if the last item of the current "items" array
        // is a break element. If not, we add a break element, else,
        // we do nothing (because we don't want to display the page).
        if (breakLabel && items[items.length - 1] !== breakView) {
          breakView = (
            <BreakView
              key={index}
              breakLabel={breakLabel}
              breakClassName={breakClassName}
              onClick={this.handleBreakClick.bind(null, index)}
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
      nextLabel
    } = this.props;

    const { selected } = this.state;

    const previousClasses = previousClassName + (selected === 0 ? ` ${disabledClassName}` : '');
    const nextClasses = nextClassName + (selected === pageCount - 1 ? ` ${disabledClassName}` : '');

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
