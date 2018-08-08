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
      extraAriaContext
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
      // 1,2,3...5,6,7,8,9...11,12,13
      //         ^
      let leftSideIndex = selected - Math.floor(pageRangeDisplayed / 2);
      leftSideIndex = Math.max(0, leftSideIndex);

      // 1,2,3...5,6,7,8,9...11,12,13
      // ^^^^^
      const leftMarginIndexes = Array.from(
        { length: marginPagesDisplayed },
        (_, k) => k
      );

      // 1,2,3...5,6,7,8,9...11,12,13
      //                     ^^^^^^^^
      const rightMarginIndexes = Array.from(
        { length: marginPagesDisplayed },
        (_, k) => k + pageCount - marginPagesDisplayed
      );

      // 1,2,3...5,6,7,8,9...11,12,13
      //         ^^^^^^^^^
      const rangeIndexes = Array.from(
        // pageRangeDisplayed can be 0
        // but at least one item must be in this array (selected item)
        { length: Math.max(pageRangeDisplayed, 1) },
        (_, k) => k + leftSideIndex
      );

      // 1,2,3...5,6,7,8,9...11,12,13
      // ^^^^^ + ^^^^^^^^^ + ^^^^^^^^
      let lastIndex = -1;
      const indexes = [
        ...leftMarginIndexes,
        ...rangeIndexes,
        ...rightMarginIndexes
      ].filter(i => {
        const outOfRange = i < 0 || i >= pageCount;
        const duplicated = i <= lastIndex;
        lastIndex = Math.max(i, lastIndex);
        return !outOfRange && !duplicated;
      });

      const createPageView = index => this.getPageElement(index);

      for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i];
        const prevIndex = i > 0 ? indexes[i - 1] : indexes[i];

        // if distance between current and previous page more than 1, then render BreakView
        if (index - prevIndex > 1) {
          items.push(
            <BreakView
              key={`breakview-${index}`}
              breakLabel={breakLabel}
              breakClassName={breakClassName}
            />
          );
        }

        items.push(createPageView(index));
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
