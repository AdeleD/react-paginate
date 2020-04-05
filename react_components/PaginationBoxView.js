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

  componentDidUpdate(prevProps) {
    if (
      typeof this.props.forcePage !== 'undefined' &&
      this.props.forcePage !== prevProps.forcePage
    ) {
      this.setState({ selected: this.props.forcePage });
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

    this.setState({ selected: selected });

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

  callCallback = selectedItem => {
    if (
      typeof this.props.onPageChange !== 'undefined' &&
      typeof this.props.onPageChange === 'function'
    ) {
      this.props.onPageChange({ selected: selectedItem });
    }
  };

  getPageElement(index) {
    const { selected } = this.state;
    const {
      pageClassName,
      pageLinkClassName,
      activeClassName,
      activeLinkClassName,
      extraAriaContext,
    } = this.props;

    return (
      <PageView
        key={index}
        onClick={this.handlePageSelected.bind(null, index)}
        selected={selected === index}
        pageClassName={pageClassName}
        pageLinkClassName={pageLinkClassName}
        activeClassName={activeClassName}
        activeLinkClassName={activeLinkClassName}
        extraAriaContext={extraAriaContext}
        href={this.hrefBuilder(index)}
        ariaLabel={this.ariaLabelBuilder(index)}
        page={index + 1}
      />
    );
  }

  createBreakView = page => {
    const { breakLabel, breakClassName, breakLinkClassName } = this.props;
    return (
      <BreakView
        key={page - 1}
        breakLabel={breakLabel}
        breakClassName={breakClassName}
        breakLinkClassName={breakLinkClassName}
        onClick={this.handleBreakClick.bind(null, page - 1)}
      />
    );
  };

  intervalsIntersect(intervalA, intervalB) {
    return intervalA.end >= intervalB.start - 1;
  }

  generatePageInterval(start, end) {
    const arr = new Array(end - start + 1);
    for (let i = 0; i <= end - start; i++) {
      arr[i] = i + start;
    }
    return arr;
  }

  intervalLength({ start, end }) {
    return end - start;
  }

  startButtonIndexes(startInterval, selectedInterval) {
    const { marginPagesDisplayed } = this.props;
    if (startInterval.end >= selectedInterval.start - 1) {
      const totalLength =
        marginPagesDisplayed + this.intervalLength(selectedInterval);
      return this.generatePageInterval(1, totalLength + 1);
    }
    return this.generatePageInterval(startInterval.start, startInterval.end);
  }

  middleButtonIndexes({ start, end }) {
    const { pageCount, marginPagesDisplayed } = this.props;
    if (
      start - 1 > marginPagesDisplayed &&
      end < pageCount - marginPagesDisplayed + 1
    ) {
      return this.generatePageInterval(start, end);
    }
    return [];
  }

  endButtonIndexes(selectedInterval, endInterval) {
    const { pageCount, marginPagesDisplayed } = this.props;
    if (selectedInterval.end >= endInterval.start) {
      const totalLength =
        marginPagesDisplayed + this.intervalLength(selectedInterval);
      return this.generatePageInterval(pageCount - totalLength, pageCount);
    }
    return this.generatePageInterval(endInterval.start, endInterval.end);
  }

  pagination = () => {
    const items = [];
    const {
      pageRangeDisplayed: propRange,
      pageCount,
      marginPagesDisplayed,
      breakLabel,
    } = this.props;

    const { selected } = this.state;
    const pageRangeDisplayed = propRange + 1 - (propRange % 2); // make pageRangeDisplayed odd
    if (pageCount <= pageRangeDisplayed + 2 * marginPagesDisplayed) {
      for (let index = 0; index < pageCount; index++) {
        items.push(this.getPageElement(index));
      }
    } else {
      let createPageView = page => this.getPageElement(page - 1);
      // the default range of displayed buttons on the left
      const startInterval = { start: 1, end: marginPagesDisplayed };
      // the range of displayed buttons around the selected page
      const selectedInterval = {
        start: selected - Math.floor(pageRangeDisplayed / 2) + 1,
        end: selected + Math.floor(pageRangeDisplayed / 2) + 1,
      };
      //the default range of displayed buttons on the right
      const endInterval = {
        start: pageCount - marginPagesDisplayed + 1,
        end: pageCount,
      };

      const displayedButtons = [
        ...this.startButtonIndexes(startInterval, selectedInterval),
        ...this.middleButtonIndexes(selectedInterval),
        ...this.endButtonIndexes(selectedInterval, endInterval),
      ];

      for (let i = 0, expectedPage = 1; i < displayedButtons.length; i++) {
        if (expectedPage !== displayedButtons[i]) {
          if (breakLabel) items.push(this.createBreakView(expectedPage));
          expectedPage = displayedButtons[i];
        }
        items.push(createPageView(expectedPage));
        expectedPage++;
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
    } = this.props;

    const { selected } = this.state;

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
            onClick={this.handlePreviousPage}
            className={previousLinkClassName}
            href={this.hrefBuilder(selected - 1)}
            tabIndex="0"
            role="button"
            onKeyPress={this.handlePreviousPage}
            aria-disabled={previousAriaDisabled}
          >
            {previousLabel}
          </a>
        </li>

        {this.pagination()}

        <li className={nextClasses}>
          <a
            onClick={this.handleNextPage}
            className={nextLinkClassName}
            href={this.hrefBuilder(selected + 1)}
            tabIndex="0"
            role="button"
            onKeyPress={this.handleNextPage}
            aria-disabled={nextAriaDisabled}
          >
            {nextLabel}
          </a>
        </li>
      </ul>
    );
  }
}
