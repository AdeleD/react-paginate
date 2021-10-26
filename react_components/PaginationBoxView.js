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
    previousAriaLabel: PropTypes.string,
    prevRel: PropTypes.string,
    nextLabel: PropTypes.node,
    nextAriaLabel: PropTypes.string,
    nextRel: PropTypes.string,
    breakLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    hrefBuilder: PropTypes.func,
    onPageChange: PropTypes.func,
    onPageActive: PropTypes.func,
    initialPage: PropTypes.number,
    forcePage: PropTypes.number,
    disableInitialCallback: PropTypes.bool,
    containerClassName: PropTypes.string,
    className: PropTypes.string,
    pageClassName: PropTypes.string,
    pageLinkClassName: PropTypes.string,
    pageLabelBuilder: PropTypes.func,
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
    eventListener: PropTypes.string,
    renderOnZeroPageCount: PropTypes.func,
  };

  static defaultProps = {
    pageCount: 10,
    pageRangeDisplayed: 2,
    marginPagesDisplayed: 3,
    activeClassName: 'selected',
    previousLabel: 'Previous',
    previousClassName: 'previous',
    previousAriaLabel: 'Previous page',
    prevRel: 'prev',
    nextLabel: 'Next',
    nextClassName: 'next',
    nextAriaLabel: 'Next page',
    nextRel: 'next',
    breakLabel: '...',
    disabledClassName: 'disabled',
    disableInitialCallback: false,
    pageLabelBuilder: (page) => page,
    eventListener: 'onClick',
    renderOnZeroPageCount: undefined,
  };

  constructor(props) {
    super(props);

    if (props.initialPage !== undefined && props.forcePage !== undefined) {
      console.warn(
        `(react-paginate): Both initialPage (${props.initialPage}) and forcePage (${props.forcePage}) props are provided, which is discouraged.` +
          ' Use exclusively forcePage prop for a controlled component.\nSee https://reactjs.org/docs/forms.html#controlled-components'
      );
    }

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
    const { initialPage, disableInitialCallback, extraAriaContext, pageCount } =
      this.props;
    // Call the callback with the initialPage item:
    if (typeof initialPage !== 'undefined' && !disableInitialCallback) {
      this.callCallback(initialPage);
    }

    if (extraAriaContext) {
      console.warn(
        'DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead.'
      );
    }

    if (!Number.isInteger(pageCount)) {
      console.warn(
        `(react-paginate): The pageCount prop value provided is not an integer (${this.props.pageCount}). Did you forget a Math.ceil()?`
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

    if (
      Number.isInteger(prevProps.pageCount) &&
      !Number.isInteger(this.props.pageCount)
    ) {
      console.warn(
        `(react-paginate): The pageCount prop value provided is not an integer (${this.props.pageCount}). Did you forget a Math.ceil()?`
      );
    }
  }

  handlePreviousPage = (evt) => {
    const { selected } = this.state;
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    if (selected > 0) {
      this.handlePageSelected(selected - 1, evt);
    }
  };

  handleNextPage = (evt) => {
    const { selected } = this.state;
    const { pageCount } = this.props;

    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    if (selected < pageCount - 1) {
      this.handlePageSelected(selected + 1, evt);
    }
  };

  handlePageSelected = (selected, evt) => {
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);

    if (this.state.selected === selected) {
      this.callActiveCallback(selected);
      return;
    }

    this.setState({ selected: selected });

    // Call the callback with the new selected item:
    this.callCallback(selected);
  };

  getEventListener = (handlerFunction) => {
    const { eventListener } = this.props;
    return {
      [eventListener]: handlerFunction,
    };
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

  callCallback = (selectedItem) => {
    if (
      typeof this.props.onPageChange !== 'undefined' &&
      typeof this.props.onPageChange === 'function'
    ) {
      this.props.onPageChange({ selected: selectedItem });
    }
  };

  callActiveCallback = (selectedItem) => {
    if (
      typeof this.props.onPageActive !== 'undefined' &&
      typeof this.props.onPageActive === 'function'
    ) {
      this.props.onPageActive({ selected: selectedItem });
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
      pageLabelBuilder,
    } = this.props;

    return (
      <PageView
        key={index}
        pageSelectedHandler={this.handlePageSelected.bind(null, index)}
        selected={selected === index}
        pageClassName={pageClassName}
        pageLinkClassName={pageLinkClassName}
        activeClassName={activeClassName}
        activeLinkClassName={activeLinkClassName}
        extraAriaContext={extraAriaContext}
        href={this.hrefBuilder(index)}
        ariaLabel={this.ariaLabelBuilder(index)}
        page={index + 1}
        pageLabelBuilder={pageLabelBuilder}
        getEventListener={this.getEventListener}
      />
    );
  }

  pagination = () => {
    const items = [];
    const {
      pageRangeDisplayed,
      pageCount,
      marginPagesDisplayed,
      breakLabel,
      breakClassName,
      breakLinkClassName,
    } = this.props;

    const { selected } = this.state;

    if (pageCount <= pageRangeDisplayed) {
      for (let index = 0; index < pageCount; index++) {
        items.push(this.getPageElement(index));
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
              breakHandler={this.handleBreakClick.bind(null, index)}
              getEventListener={this.getEventListener}
            />
          );
          items.push(breakView);
        }
      }
    }

    return items;
  };

  render() {
    const { renderOnZeroPageCount } = this.props;
    if (this.props.pageCount === 0 && renderOnZeroPageCount !== undefined) {
      return renderOnZeroPageCount
        ? renderOnZeroPageCount(this.props)
        : renderOnZeroPageCount;
    }
    const {
      disabledClassName,
      pageCount,
      className,
      containerClassName,
      previousLabel,
      previousClassName,
      previousLinkClassName,
      previousAriaLabel,
      prevRel,
      nextLabel,
      nextClassName,
      nextLinkClassName,
      nextAriaLabel,
      nextRel,
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
      <ul className={className || containerClassName}>
        <li className={previousClasses}>
          <a
            className={previousLinkClassName}
            href={this.hrefBuilder(selected - 1)}
            tabIndex="0"
            role="button"
            onKeyPress={this.handlePreviousPage}
            aria-disabled={previousAriaDisabled}
            aria-label={previousAriaLabel}
            rel={prevRel}
            {...this.getEventListener(this.handlePreviousPage)}
          >
            {previousLabel}
          </a>
        </li>

        {this.pagination()}

        <li className={nextClasses}>
          <a
            className={nextLinkClassName}
            href={this.hrefBuilder(selected + 1)}
            tabIndex="0"
            role="button"
            onKeyPress={this.handleNextPage}
            aria-disabled={nextAriaDisabled}
            aria-label={nextAriaLabel}
            rel={nextRel}
            {...this.getEventListener(this.handleNextPage)}
          >
            {nextLabel}
          </a>
        </li>
      </ul>
    );
  }
}
