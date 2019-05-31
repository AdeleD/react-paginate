'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageView from './PageView';
import BreakView from './BreakView';

export default class PaginationBoxView extends Component {
  static propTypes = {
    pageCount: PropTypes.number.isRequired,
    pageRangeDisplayed: PropTypes.number.isRequired,
    marginPagesDisplayed: PropTypes.number.isRequired,
    previousLabel: PropTypes.node,
    nextLabel: PropTypes.node,
    breakLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    hrefBuilder: PropTypes.func,
    onPageChange: PropTypes.func,
    initialPage: PropTypes.number,
    forcePage: PropTypes.number,
    disableInitialCallback: PropTypes.bool,
    containerClassName: PropTypes.string,
    pageClassName: PropTypes.string,
    pageLinkClassName: PropTypes.string,
    activeClassName: PropTypes.string,
    activeLinkClassName: PropTypes.string,
    activeTabIndex: PropTypes.number,
    previousClassName: PropTypes.string,
    nextClassName: PropTypes.string,
    previousLinkClassName: PropTypes.string,
    nextLinkClassName: PropTypes.string,
    disabledClassName: PropTypes.string,
    breakClassName: PropTypes.string,
    breakLinkClassName: PropTypes.string,
    extraAriaContext: PropTypes.string,
    ariaLabelBuilder: PropTypes.func,
  };

  static defaultProps = {
    pageCount: 10,
    pageRangeDisplayed: 2,
    marginPagesDisplayed: 3,
    activeClassName: 'selected',
    activeTabIndex: 0,
    previousClassName: 'previous',
    nextClassName: 'next',
    previousLabel: 'Previous',
    nextLabel: 'Next',
    breakLabel: '...',
    disabledClassName: 'disabled',
    disableInitialCallback: false,
  };

  constructor(props) {
    super(props);

    let initialSelected;
    if (props.initialPage) {
      initialSelected = props.initialPage;
    } else if (props.forcePage) {
      initialSelected = props.forcePage;
    } else {
      initialSelected = 0;
    }

    this.state = {
      selected: initialSelected,
    };
  }

  componentDidMount() {
    const {
      initialPage,
      disableInitialCallback,
      extraAriaContext,
    } = this.props;
    // Call the callback with the initialPage item:
    if (typeof initialPage !== 'undefined' && !disableInitialCallback) {
      this.callCallback(initialPage);
    }

    if (extraAriaContext) {
      console.warn(
        'DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead.'
      );
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.forcePage !== 'undefined' &&
      this.props.forcePage !== nextProps.forcePage
    ) {
      this.setState({ selected: nextProps.forcePage });
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

    this.setState({ selected });

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
      selected < index ? this.getForwardJump() : this.getBackwardJump(),
      evt
    );
  };

  hrefBuilder(pageIndex) {
    const { hrefBuilder, pageCount } = this.props;
    if (
      hrefBuilder &&
      pageIndex !== this.state.selected &&
      pageIndex >= 0 &&
      pageIndex < pageCount
    ) {
      return hrefBuilder(pageIndex + 1);
    }
  }

  ariaLabelBuilder(pageIndex) {
    const selected = pageIndex === this.state.selected;
    if (
      this.props.ariaLabelBuilder &&
      pageIndex >= 0 &&
      pageIndex < this.props.pageCount
    ) {
      let label = this.props.ariaLabelBuilder(pageIndex + 1, selected);
      // DEPRECATED: The extraAriaContext prop was used to add additional context
      // to the aria-label. Users should now use the ariaLabelBuilder instead.
      if (this.props.extraAriaContext && !selected) {
        label = label + ' ' + this.props.extraAriaContext;
      }
      return label;
    }
  }

  callCallback = selected => {
    if (
      typeof this.props.onPageChange !== 'undefined' &&
      typeof this.props.onPageChange === 'function'
    ) {
      this.props.onPageChange({ selected });
    }
  };

  getPageElement(index) {
    const { selected } = this.state;
    const {
      pageClassName,
      pageLinkClassName,
      activeClassName,
      activeLinkClassName,
      activeTabIndex,
      extraAriaContext,
    } = this.props;
    const isSelected = selected === index;
    const pageTabIndex = (isSelected && activeTabIndex) ? `${activeTabIndex}` : "0";

    return (
      <PageView
        key={index}
        page={index + 1}
        selected={isSelected}
        pageTabIndex={pageTabIndex}
        pageClassName={pageClassName}
        pageLinkClassName={pageLinkClassName}
        activeClassName={activeClassName}
        activeLinkClassName={activeLinkClassName}
        extraAriaContext={extraAriaContext}
        href={this.hrefBuilder(index)}
        ariaLabel={this.ariaLabelBuilder(index)}
        onClick={this.handlePageSelected.bind(null, index)}
      />
    );
  }

  pagination = () => {
    const { selected } = this.state;
    const {
      pageRangeDisplayed,
      pageCount,
      marginPagesDisplayed,
      breakLabel,
      breakClassName,
      breakLinkClassName,
    } = this.props;

    const items = [];
    let createPageView = index => this.getPageElement(index);

    if (pageCount <= pageRangeDisplayed) {
      for (let index = 0; index < pageCount; index++) {
        items.push(createPageView(index));
      }
    } else {
      let leftSide = pageRangeDisplayed / 2;
      let rightSide = pageRangeDisplayed - leftSide;

      // If the selected page index is on the default right side of the pagination,
      // we consider that the new right side is made up of it (= only one break element).
      // If the selected page index is on the default left side of the pagination,
      // we consider that the new left side is made up of it (= only one break element).
      if (selected > pageCount - pageRangeDisplayed / 2) {
        rightSide = pageCount - selected;
        leftSide = pageRangeDisplayed - rightSide;
      } else if (selected < pageRangeDisplayed / 2) {
        leftSide = selected;
        rightSide = pageRangeDisplayed - leftSide;
      }

      let breakView;
      let page;

      for (let index = 0; index < pageCount; index++) {
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
        if (index >= selected - leftSide && index <= selected + rightSide) {
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
              breakLinkClassName={breakLinkClassName}
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
    const { selected } = this.state;
    const {
      pageCount,
      disabledClassName,
      previousClassName,
      nextClassName,
      containerClassName,
      previousLinkClassName,
      previousLabel,
      nextLinkClassName,
      nextLabel,
    } = this.props;

    const previousClasses =
      previousClassName + (selected === 0 ? ` ${disabledClassName}` : '');
    const nextClasses =
      nextClassName +
      (selected === pageCount - 1 ? ` ${disabledClassName}` : '');

    const previousAriaDisabled = selected === 0 ? 'true' : 'false';
    const nextAriaDisabled = selected === pageCount - 1 ? 'true' : 'false';

    return (
      <ul className={containerClassName}>
        <li className={previousClasses}>
          <a
            className={previousLinkClassName}
            tabIndex="0"
            role="button"
            href={this.hrefBuilder(selected - 1)}
            aria-disabled={previousAriaDisabled}
            onClick={this.handlePreviousPage}
            onKeyPress={this.handlePreviousPage}>
            {previousLabel}
          </a>
        </li>

        {this.pagination()}

        <li className={nextClasses}>
          <a
            className={nextLinkClassName}
            tabIndex="0"
            role="button"
            href={this.hrefBuilder(selected + 1)}
            aria-disabled={nextAriaDisabled}
            onClick={this.handleNextPage}
            onKeyPress={this.handleNextPage}>
            {nextLabel}
          </a>
        </li>
      </ul>
    );
  }
}
