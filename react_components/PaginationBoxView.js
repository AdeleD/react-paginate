'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageView from './PageView';
import BreakView from './BreakView';
import { classNameIfDefined } from './utils';

export default class PaginationBoxView extends Component {
  static propTypes = {
    pageCount: PropTypes.number.isRequired,
    pageRangeDisplayed: PropTypes.number,
    marginPagesDisplayed: PropTypes.number,
    previousLabel: PropTypes.node,
    previousAriaLabel: PropTypes.string,
    prevPageRel: PropTypes.string,
    prevRel: PropTypes.string,
    nextLabel: PropTypes.node,
    nextAriaLabel: PropTypes.string,
    nextPageRel: PropTypes.string,
    nextRel: PropTypes.string,
    breakLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    hrefBuilder: PropTypes.func,
    hrefAllControls: PropTypes.bool,
    onPageChange: PropTypes.func,
    onPageActive: PropTypes.func,
    onClick: PropTypes.func,
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
    disabledLinkClassName: PropTypes.string,
    breakClassName: PropTypes.string,
    breakLinkClassName: PropTypes.string,
    extraAriaContext: PropTypes.string,
    ariaLabelBuilder: PropTypes.func,
    eventListener: PropTypes.string,
    renderOnZeroPageCount: PropTypes.func,
    selectedPageRel: PropTypes.string,
  };

  static defaultProps = {
    pageRangeDisplayed: 2,
    marginPagesDisplayed: 3,
    activeClassName: 'selected',
    previousLabel: 'Previous',
    previousClassName: 'previous',
    previousAriaLabel: 'Previous page',
    prevPageRel: 'prev',
    prevRel: 'prev',
    nextLabel: 'Next',
    nextClassName: 'next',
    nextAriaLabel: 'Next page',
    nextPageRel: 'next',
    nextRel: 'next',
    breakLabel: '...',
    disabledClassName: 'disabled',
    disableInitialCallback: false,
    pageLabelBuilder: (page) => page,
    eventListener: 'onClick',
    renderOnZeroPageCount: undefined,
    selectedPageRel: 'canonical',
    hrefAllControls: false,
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
    const {
      initialPage,
      disableInitialCallback,
      extraAriaContext,
      pageCount,
      forcePage,
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

    if (!Number.isInteger(pageCount)) {
      console.warn(
        `(react-paginate): The pageCount prop value provided is not an integer (${pageCount}). Did you forget a Math.ceil()?`
      );
    }

    if (initialPage !== undefined && initialPage > pageCount - 1) {
      console.warn(
        `(react-paginate): The initialPage prop provided is greater than the maximum page index from pageCount prop (${initialPage} > ${
          pageCount - 1
        }).`
      );
    }

    if (forcePage !== undefined && forcePage > pageCount - 1) {
      console.warn(
        `(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (${forcePage} > ${
          pageCount - 1
        }).`
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.forcePage !== undefined &&
      this.props.forcePage !== prevProps.forcePage
    ) {
      if (this.props.forcePage > this.props.pageCount - 1) {
        console.warn(
          `(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (${
            this.props.forcePage
          } > ${this.props.pageCount - 1}).`
        );
      }

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

  handlePreviousPage = (event) => {
    const { selected } = this.state;

    this.handleClick(event, null, selected > 0 ? selected - 1 : undefined, {
      isPrevious: true,
    });
  };

  handleNextPage = (event) => {
    const { selected } = this.state;
    const { pageCount } = this.props;

    this.handleClick(
      event,
      null,
      selected < pageCount - 1 ? selected + 1 : undefined,
      { isNext: true }
    );
  };

  handlePageSelected = (selected, event) => {
    if (this.state.selected === selected) {
      this.callActiveCallback(selected);
      this.handleClick(event, null, undefined, { isActive: true });
      return;
    }

    this.handleClick(event, null, selected);
  };

  handlePageChange = (selected) => {
    if (this.state.selected === selected) {
      return;
    }
    this.setState({ selected });

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

  handleClick = (
    event,
    index,
    nextSelectedPage,
    {
      isPrevious = false,
      isNext = false,
      isBreak = false,
      isActive = false,
    } = {}
  ) => {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    const { selected } = this.state;
    const { onClick } = this.props;

    let newPage = nextSelectedPage;

    if (onClick) {
      const onClickReturn = onClick({
        index,
        selected,
        nextSelectedPage,
        event,
        isPrevious,
        isNext,
        isBreak,
        isActive,
      });
      if (onClickReturn === false) {
        // We abord standard behavior and let parent handle
        // all behavior.
        return;
      }
      if (Number.isInteger(onClickReturn)) {
        // We assume parent want to go to the returned page.
        newPage = onClickReturn;
      }
    }

    if (newPage !== undefined) {
      this.handlePageChange(newPage);
    }
  };

  handleBreakClick = (index, event) => {
    const { selected } = this.state;

    this.handleClick(
      event,
      index,
      selected < index ? this.getForwardJump() : this.getBackwardJump(),
      { isBreak: true }
    );
  };

  getElementHref(pageIndex) {
    const { hrefBuilder, pageCount, hrefAllControls } = this.props;
    if (!hrefBuilder) return;
    if (hrefAllControls || (pageIndex >= 0 && pageIndex < pageCount)) {
      return hrefBuilder(pageIndex + 1, pageCount, this.state.selected);
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
      this.props.onPageChange !== undefined &&
      typeof this.props.onPageChange === 'function'
    ) {
      this.props.onPageChange({ selected: selectedItem });
    }
  };

  callActiveCallback = (selectedItem) => {
    if (
      this.props.onPageActive !== undefined &&
      typeof this.props.onPageActive === 'function'
    ) {
      this.props.onPageActive({ selected: selectedItem });
    }
  };

  getElementPageRel = (index) => {
    const { selected } = this.state;
    const { nextPageRel, prevPageRel, selectedPageRel } = this.props;

    if (selected - 1 === index) {
      return prevPageRel;
    } else if (selected === index) {
      return selectedPageRel;
    } else if (selected + 1 === index) {
      return nextPageRel;
    }
    return undefined;
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
        rel={this.getElementPageRel(index)}
        pageClassName={pageClassName}
        pageLinkClassName={pageLinkClassName}
        activeClassName={activeClassName}
        activeLinkClassName={activeLinkClassName}
        extraAriaContext={extraAriaContext}
        href={this.getElementHref(index)}
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

      let createPageView = (index) => this.getPageElement(index);
      let index;
      let breakView;

      // First pass: process the pages or breaks to display (or not).
      const pagesBreaking = [];
      for (index = 0; index < pageCount; index++) {
        const page = index + 1;

        // If the page index is lower than the margin defined,
        // the page has to be displayed on the left side of
        // the pagination.
        if (page <= marginPagesDisplayed) {
          pagesBreaking.push({
            type: 'page',
            index,
            display: createPageView(index),
          });
          continue;
        }

        // If the page index is greater than the page count
        // minus the margin defined, the page has to be
        // displayed on the right side of the pagination.
        if (page > pageCount - marginPagesDisplayed) {
          pagesBreaking.push({
            type: 'page',
            index,
            display: createPageView(index),
          });
          continue;
        }

        // If it is the first element of the array the rightSide need to be adjusted,
        //  otherwise an extra element will be rendered
        const adjustedRightSide =
          selected === 0 && pageRangeDisplayed > 1 ? rightSide - 1 : rightSide;

        // If the page index is near the selected page index
        // and inside the defined range (pageRangeDisplayed)
        // we have to display it (it will create the center
        // part of the pagination).
        if (
          index >= selected - leftSide &&
          index <= selected + adjustedRightSide
        ) {
          pagesBreaking.push({
            type: 'page',
            index,
            display: createPageView(index),
          });
          continue;
        }

        // If the page index doesn't meet any of the conditions above,
        // we check if the last item of the current "items" array
        // is a break element. If not, we add a break element, else,
        // we do nothing (because we don't want to display the page).
        if (
          breakLabel &&
          pagesBreaking.length > 0 &&
          pagesBreaking[pagesBreaking.length - 1].display !== breakView &&
          // We do not show break if only one active page is displayed.
          (pageRangeDisplayed > 0 || marginPagesDisplayed > 0)
        ) {
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
          pagesBreaking.push({ type: 'break', index, display: breakView });
        }
      }
      // Second pass: we remove breaks containing one page to the actual page.
      pagesBreaking.forEach((pageElement, i) => {
        let actualPageElement = pageElement;
        // 1 2 3 4 5 6 7 ... 9 10
        //         |
        // 1 2 ... 4 5 6 7 8 9 10
        //             |
        // The break should be replaced by the page.
        if (
          pageElement.type === 'break' &&
          pagesBreaking[i - 1] &&
          pagesBreaking[i - 1].type === 'page' &&
          pagesBreaking[i + 1] &&
          pagesBreaking[i + 1].type === 'page' &&
          pagesBreaking[i + 1].index - pagesBreaking[i - 1].index <= 2
        ) {
          actualPageElement = {
            type: 'page',
            index: pageElement.index,
            display: createPageView(pageElement.index),
          };
        }
        // We add the displayed elements in the same pass, to avoid another iteration.
        items.push(actualPageElement.display);
      });
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
      disabledLinkClassName,
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

    const isPreviousDisabled = selected === 0;
    const isNextDisabled = selected === pageCount - 1;

    const previousClasses = `${classNameIfDefined(previousClassName)}${
      isPreviousDisabled ? ` ${classNameIfDefined(disabledClassName)}` : ''
    }`;
    const nextClasses = `${classNameIfDefined(nextClassName)}${
      isNextDisabled ? ` ${classNameIfDefined(disabledClassName)}` : ''
    }`;

    const previousLinkClasses = `${classNameIfDefined(previousLinkClassName)}${
      isPreviousDisabled ? ` ${classNameIfDefined(disabledLinkClassName)}` : ''
    }`;
    const nextLinkClasses = `${classNameIfDefined(nextLinkClassName)}${
      isNextDisabled ? ` ${classNameIfDefined(disabledLinkClassName)}` : ''
    }`;

    const previousAriaDisabled = isPreviousDisabled ? 'true' : 'false';
    const nextAriaDisabled = isNextDisabled ? 'true' : 'false';

    return (
      <ul className={className || containerClassName}>
        <li className={previousClasses}>
          <a
            className={previousLinkClasses}
            href={this.getElementHref(selected - 1)}
            tabIndex={isPreviousDisabled ? '-1' : '0'}
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
            className={nextLinkClasses}
            href={this.getElementHref(selected + 1)}
            tabIndex={isNextDisabled ? '-1' : '0'}
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
