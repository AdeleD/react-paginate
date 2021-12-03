/**
 * @jest-environment jsdom
 */
/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';

jest.dontMock('./../react_components/PaginationBoxView');
jest.dontMock('./../react_components/PageView');
jest.dontMock('./../react_components/BreakView');

import PaginationBoxView from '../react_components/PaginationBoxView';

// TODO Migrate to React Testing Library.
// -> ReactDOM.findDOMNode won't work with function components.
// https://testing-library.com/docs/react-testing-library/intro
// with jest-dom
// https://github.com/testing-library/jest-dom

import ReactTestUtils from 'react-dom/test-utils';

const DEFAULT_PAGE_COUNT = 10;

describe('Test rendering', () => {
  it('should render a pagination component', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />
    );

    expect(ReactDOM.findDOMNode(pagination).nodeName).toEqual('UL');

    ReactTestUtils.scryRenderedComponentsWithType(
      pagination,
      PaginationBoxView
    );

    expect(
      ReactDOM.findDOMNode(pagination).querySelector('li:first-child a')
        .textContent
    ).toBe('Previous');
    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('1');
    expect(
      ReactDOM.findDOMNode(pagination).querySelector('li:last-child a')
        .textContent
    ).toBe('Next');

    const pages = ReactDOM.findDOMNode(pagination).querySelectorAll('li');
    // 3 * 2 margins + 1 break label + previous & next buttons == 9:
    expect(pages.length).toEqual(9);
  });

  it('test rendering only active page item', function () {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        pageCount={DEFAULT_PAGE_COUNT}
        initialPage={0}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        breakLabel={null}
      />
    );

    const pageItems = ReactDOM.findDOMNode(pagination).querySelectorAll('li');
    // Prev, selected page, next
    expect(pageItems.length).toBe(3);
  });
});

describe('Page count is zero', () => {
  it('should render Previous / Next if page count is zero (default / when renderOnZeroPageCount is undefined)', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        pageCount={0}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        breakLabel={null}
      />
    );
    const pageItems = ReactDOM.findDOMNode(pagination).querySelectorAll('li');
    // Prev page, next
    expect(pageItems.length).toBe(2);
  });
  it('should render nothing if page count is zero when renderOnZeroPageCount is null', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        pageCount={0}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        breakLabel={null}
        renderOnZeroPageCount={null}
      />
    );
    expect(ReactDOM.findDOMNode(pagination)).toBeNull();
  });
  it('should render provided Component if page count is zero when renderOnZeroPageCount is not null', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        pageCount={0}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        breakLabel={null}
        renderOnZeroPageCount={() => <h2>Nothing</h2>}
      />
    );
    expect(ReactDOM.findDOMNode(pagination).textContent).toBe('Nothing');
  });
});

describe('Page count checks', () => {
  it('should trigger a warning when a float is provided', () => {
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        pageCount={2.5}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        breakLabel={null}
      />
    );
    const pageItems = ReactDOM.findDOMNode(pagination).querySelectorAll('li');
    // Prev page, next
    expect(pageItems.length).toBe(4);
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      '(react-paginate): The pageCount prop value provided is not an integer (2.5). Did you forget a Math.ceil()?'
    );
    consoleWarnMock.mockRestore();
  });

  it('should trigger a warning when the initialPage provided is greater than the maximum page index (from pageCount)', () => {
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
    ReactTestUtils.renderIntoDocument(
      <PaginationBoxView pageCount={10} initialPage={10} />
    );
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      '(react-paginate): The initialPage prop provided is greater than the maximum page index from pageCount prop (10 > 9).'
    );
    consoleWarnMock.mockRestore();
  });

  it('should trigger a warning when the forcePage provided is greater than the maximum page index (from pageCount)', () => {
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
    ReactTestUtils.renderIntoDocument(
      <PaginationBoxView pageCount={9} forcePage={9} />
    );
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      '(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (9 > 8).'
    );
    consoleWarnMock.mockRestore();
  });

  // TODO Warning on prop change.
});

describe('Test clicks', () => {
  it('test clicks on previous and next buttons', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />
    );

    let elmts = ReactTestUtils.scryRenderedDOMComponentsWithTag(
      pagination,
      'a'
    );
    let previous = elmts[0];
    let next = elmts[elmts.length - 1];

    ReactTestUtils.Simulate.click(next);

    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('2');

    ReactTestUtils.Simulate.click(previous);

    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('1');
  });

  it('test click on a page item', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />
    );

    ReactTestUtils.findRenderedComponentWithType(pagination, PaginationBoxView);

    const pageItem =
      ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3) a');

    ReactTestUtils.Simulate.click(pageItem);

    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('2');
  });

  it('test click on the left break view', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={0}
        pageCount={22}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    // The selected page is before the left break
    const rightBreakView =
      ReactDOM.findDOMNode(pagination).querySelector('.break a');
    ReactTestUtils.Simulate.click(rightBreakView);
    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('6');

    const rightBreakView2 =
      ReactDOM.findDOMNode(pagination).querySelector('.break a');
    ReactTestUtils.Simulate.click(rightBreakView2);
    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('11');

    // The selected page is after the left break
    const leftBreakView2 =
      ReactDOM.findDOMNode(pagination).querySelectorAll('.break a')[0];
    ReactTestUtils.Simulate.click(leftBreakView2);
    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('6');
  });

  it('test click on the right break view', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={10}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    // The selected page is before the right break
    const rightBreak1 =
      ReactDOM.findDOMNode(pagination).querySelectorAll('.break a')[1];
    ReactTestUtils.Simulate.click(rightBreak1);
    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('16');

    // The selected page is after the right break
    const rightBreak2 =
      ReactDOM.findDOMNode(pagination).querySelector('.break a');
    ReactTestUtils.Simulate.click(rightBreak2);
    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('11');
  });
});

describe('Test custom event listener', () => {
  it('test custom listener on previous and next buttons', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        pageCount={DEFAULT_PAGE_COUNT}
        eventListener="onMouseOver"
      />
    );

    let elmts = ReactTestUtils.scryRenderedDOMComponentsWithTag(
      pagination,
      'a'
    );
    let previous = elmts[0];
    let next = elmts[elmts.length - 1];

    ReactTestUtils.Simulate.mouseOver(next);

    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('2');

    ReactTestUtils.Simulate.mouseOver(previous);

    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('1');
  });

  it('test custom listener on a page item', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        pageCount={DEFAULT_PAGE_COUNT}
        eventListener="onMouseOver"
      />
    );

    ReactTestUtils.findRenderedComponentWithType(pagination, PaginationBoxView);

    const pageItem =
      ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3) a');

    ReactTestUtils.Simulate.mouseOver(pageItem);

    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('2');
  });

  it('test custom listener on the left break view', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={0}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        eventListener="onMouseOver"
      />
    );

    // The selected page is before the left break
    const rightBreakView =
      ReactDOM.findDOMNode(pagination).querySelector('.break a');
    ReactTestUtils.Simulate.mouseOver(rightBreakView);
    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('6');

    const rightBreakView2 =
      ReactDOM.findDOMNode(pagination).querySelector('.break a');
    ReactTestUtils.Simulate.mouseOver(rightBreakView2);
    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('11');

    // The selected page is after the left break
    const leftBreakView2 =
      ReactDOM.findDOMNode(pagination).querySelectorAll('.break a')[0];
    ReactTestUtils.Simulate.mouseOver(leftBreakView2);
    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('6');
  });
});

describe('Test pagination behaviour', () => {
  it('should display 2 elements to the left, 1 break element and 2 elements to the right', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={0}
        pageCount={20}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
      />
    );

    const previousElement =
      ReactDOM.findDOMNode(pagination).querySelector('li:first-child');
    const nextElement =
      ReactDOM.findDOMNode(pagination).querySelector('li:last-child');

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll(
      'li:not(.previous):not(.next)'
    );
    elements.forEach((element) => {
      if (breakElementReached === false && element.className !== 'break') {
        leftElements.push(element);
      } else if (
        breakElementReached === true &&
        element.className !== 'break'
      ) {
        rightElements.push(element);
      } else {
        breakElements.push(element);
        breakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous disabled');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(2);
    expect(rightElements.length).toBe(1);
    expect(breakElements.length).toBe(1);
  });

  it('should display 5 elements to the left, 1 break element and 2 elements to the right', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={0}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    const previousElement =
      ReactDOM.findDOMNode(pagination).querySelector('li:first-child');
    const nextElement =
      ReactDOM.findDOMNode(pagination).querySelector('li:last-child');

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll(
      'li:not(.previous):not(.next)'
    );
    elements.forEach((element) => {
      if (breakElementReached === false && element.className !== 'break') {
        leftElements.push(element);
      } else if (
        breakElementReached === true &&
        element.className !== 'break'
      ) {
        rightElements.push(element);
      } else {
        breakElements.push(element);
        breakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous disabled');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(5);
    expect(rightElements.length).toBe(2);
    expect(breakElements.length).toBe(1);
  });

  it('should display 7 elements to the left, 1 break element and 2 elements to the right', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={4}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    const previousElement =
      ReactDOM.findDOMNode(pagination).querySelector('li:first-child');
    const nextElement =
      ReactDOM.findDOMNode(pagination).querySelector('li:last-child');

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll(
      'li:not(.previous):not(.next)'
    );
    elements.forEach((element) => {
      if (breakElementReached === false && element.className !== 'break') {
        leftElements.push(element);
      } else if (
        breakElementReached === true &&
        element.className !== 'break'
      ) {
        rightElements.push(element);
      } else {
        breakElements.push(element);
        breakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(7);
    expect(rightElements.length).toBe(2);
    expect(breakElements.length).toBe(1);
  });

  it('should display 2 elements to the left, 5 elements in the middle, 2 elements to the right and 2 break elements', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={7}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    const previousElement =
      ReactDOM.findDOMNode(pagination).querySelector('li:first-child');
    const nextElement =
      ReactDOM.findDOMNode(pagination).querySelector('li:last-child');

    let leftElements = [];
    let middleElements = [];
    let rightElements = [];
    let breakElements = [];
    let leftBreakElementReached = false;
    let rightBreakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll(
      'li:not(.previous):not(.next)'
    );
    elements.forEach((element) => {
      if (
        leftBreakElementReached === false &&
        rightBreakElementReached === false &&
        element.className !== 'break'
      ) {
        leftElements.push(element);
      } else if (
        leftBreakElementReached === true &&
        rightBreakElementReached === false &&
        element.className !== 'break'
      ) {
        middleElements.push(element);
      } else if (
        leftBreakElementReached === true &&
        rightBreakElementReached === true &&
        element.className !== 'break'
      ) {
        rightElements.push(element);
      } else if (breakElements.length === 0 && element.className === 'break') {
        breakElements.push(element);
        leftBreakElementReached = true;
      } else if (breakElements.length === 1 && element.className === 'break') {
        breakElements.push(element);
        rightBreakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(2);
    expect(middleElements.length).toBe(5);
    expect(rightElements.length).toBe(2);
    expect(breakElements.length).toBe(2);
  });

  it('should display 2 elements to the left, 1 break element and 7 elements to the right', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={15}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    const previousElement =
      ReactDOM.findDOMNode(pagination).querySelector('li:first-child');
    const nextElement =
      ReactDOM.findDOMNode(pagination).querySelector('li:last-child');

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll(
      'li:not(.previous):not(.next)'
    );
    elements.forEach((element) => {
      if (breakElementReached === false && element.className !== 'break') {
        leftElements.push(element);
      } else if (
        breakElementReached === true &&
        element.className !== 'break'
      ) {
        rightElements.push(element);
      } else {
        breakElements.push(element);
        breakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(2);
    expect(rightElements.length).toBe(7);
    expect(breakElements.length).toBe(1);
  });

  it('should display 2 elements to the left, 1 break element and 6 elements to the right', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={16}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    const previousElement =
      ReactDOM.findDOMNode(pagination).querySelector('li:first-child');
    const nextElement =
      ReactDOM.findDOMNode(pagination).querySelector('li:last-child');

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll(
      'li:not(.previous):not(.next)'
    );
    elements.forEach((element) => {
      if (breakElementReached === false && element.className !== 'break') {
        leftElements.push(element);
      } else if (
        breakElementReached === true &&
        element.className !== 'break'
      ) {
        rightElements.push(element);
      } else {
        breakElements.push(element);
        breakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(2);
    expect(rightElements.length).toBe(6);
    expect(breakElements.length).toBe(1);
  });

  // 1 2 3 4 5 6 7 ... 9 10
  //         |
  it('should not display a break containing only one page', () => {
    // should display 10 elements, 0 break element
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={5}
        pageCount={10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    const previousElement =
      ReactDOM.findDOMNode(pagination).querySelector('li:first-child');
    const nextElement =
      ReactDOM.findDOMNode(pagination).querySelector('li:last-child');

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll(
      'li:not(.previous):not(.next)'
    );
    elements.forEach((element) => {
      if (breakElementReached === false && element.className !== 'break') {
        leftElements.push(element);
      } else if (
        breakElementReached === true &&
        element.className !== 'break'
      ) {
        rightElements.push(element);
      } else {
        breakElements.push(element);
        breakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(10);
    expect(rightElements.length).toBe(0);
    expect(breakElements.length).toBe(0);
  });

  it('should use ariaLabelBuilder for rendering aria-labels if ariaLabelBuilder is specified', function () {
    const linkedPagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={1}
        pageCount={3}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        ariaLabelBuilder={(page, selected) =>
          selected ? 'Current page' : 'Goto page ' + page
        }
      />
    );
    expect(
      ReactDOM.findDOMNode(linkedPagination)
        .querySelector('li:nth-last-child(2) a')
        .getAttribute('aria-label')
    ).toBe('Goto page 3');
    expect(
      ReactDOM.findDOMNode(linkedPagination)
        .querySelector('li:nth-child(2) a')
        .getAttribute('aria-label')
    ).toBe('Goto page 1');
    expect(
      ReactDOM.findDOMNode(linkedPagination)
        .querySelector('.selected a')
        .getAttribute('aria-label')
    ).toBe('Current page');
  });

  it('test ariaLabelBuilder works with extraAriaContext', function () {
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
    const linkedPagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={1}
        pageCount={3}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        ariaLabelBuilder={(page, selected) =>
          selected ? 'Current page' : 'Goto page ' + page
        }
        extraAriaContext="foobar"
      />
    );
    expect(
      ReactDOM.findDOMNode(linkedPagination)
        .querySelector('li:nth-last-child(2) a')
        .getAttribute('aria-label')
    ).toBe('Goto page 3 foobar');
    expect(
      ReactDOM.findDOMNode(linkedPagination)
        .querySelector('li:nth-child(2) a')
        .getAttribute('aria-label')
    ).toBe('Goto page 1 foobar');
    expect(
      ReactDOM.findDOMNode(linkedPagination)
        .querySelector('.selected a')
        .getAttribute('aria-label')
    ).toBe('Current page');
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      'DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead.'
    );
    consoleWarnMock.mockRestore();
  });
});

describe('Test default props', () => {
  describe('default previousLabel/nextLabel', () => {
    it('should use the default previousLabel/nextLabel', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:first-child a')
          .textContent
      ).toBe('Previous');
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:last-child a')
          .textContent
      ).toBe('Next');
    });
  });

  describe('default breakLabel/breakClassName/breakLinkClassName', () => {
    it('should use the default breakLabel/breakClassName/breakLinkClassName', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li.break').textContent
      ).toBe('...');
      expect(ReactDOM.findDOMNode(pagination).querySelector('.break')).not.toBe(
        null
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.break a').className
      ).toBe('');
    });
  });

  describe('default onPageChange', () => {
    it('should not call any onPageChange callback if not defined but it should go to the next page', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />
      );
      const nextItem =
        ReactDOM.findDOMNode(pagination).querySelector('li:last-child a');
      ReactTestUtils.Simulate.click(nextItem);

      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('2');
    });
  });

  describe('default initialPage/forcePage', () => {
    it('should use the default initial selected page (0)', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('1');
    });
  });

  describe('default disableInitialCallback', () => {
    it('should call the onPageChange callback when disableInitialCallback is set to false/undefined', () => {
      const myOnPageChangeMethod = jest.fn();
      ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={5}
          onPageChange={myOnPageChangeMethod}
        />
      );
      expect(myOnPageChangeMethod).toHaveBeenCalledWith({ selected: 5 });
    });
  });

  describe('default containerClassName', () => {
    it('should not use any classname on the container by default', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />
      );
      expect(ReactDOM.findDOMNode(pagination).className).toEqual('');
    });
  });

  describe('default pageClassName/activeClassName', () => {
    it('should not use any classname on page items and a default activeClassName', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          previousClassName="prev"
          nextClassName="next"
        />
      );

      const pageItem =
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3) a');
      ReactTestUtils.Simulate.click(pageItem);

      expect(
        ReactDOM.findDOMNode(pagination).querySelector(
          'li:not(.selected):not(.prev):not(.next)'
        ).className
      ).toBe('');
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3)')
          .className
      ).toBe('selected');
    });
  });

  describe('default pageLinkClassName/activeLinkClassName', () => {
    it('should not use any classname on selected links by default', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          previousClassName="prev"
          nextClassName="next"
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector(
          'li:not(.selected):not(.prev):not(.next) a'
        ).className
      ).toBe('');
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a').className
      ).toBe('');
    });
  });

  describe('default previousClassName/nextClassName', () => {
    it('should use the default previousClassName/nextClassName', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} initialPage={2} />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:first-child')
          .className
      ).toBe('previous');
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:last-child')
          .className
      ).toBe('next');
    });
  });

  describe('default previousLinkClassName/nextLinkClassName/disabledLinkClassName', () => {
    it('should not use any classname on previous/next links by default', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} initialPage={2} />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:first-child a')
          .className
      ).toBe('');
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:last-child a')
          .className
      ).toBe('');
    });
  });

  describe('default disabledClassName', () => {
    it('should use the default disabledClassName', function () {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView initialPage={0} pageCount={1} />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:first-child')
          .className
      ).toBe('previous disabled');
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:last-child')
          .className
      ).toBe('next disabled');
    });
  });

  describe('default hrefBuilder', () => {
    it('should not render href attributes on page items if hrefBuilder is not defined', function () {
      const linkedPagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />
      );

      expect(
        ReactDOM.findDOMNode(linkedPagination)
          .querySelector('li:last-child a')
          .hasAttribute('href')
      ).toBe(false);
      expect(
        ReactDOM.findDOMNode(linkedPagination)
          .querySelector('li:first-child a')
          .hasAttribute('href')
      ).toBe(false);
      expect(
        ReactDOM.findDOMNode(linkedPagination)
          .querySelector('.selected a')
          .hasAttribute('href')
      ).toBe(false);
    });
  });

  describe('default extraAriaContext', () => {
    it('should use the default extraAriaContext', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          previousClassName="prev"
          nextClassName="next"
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:not(.selected):not(.prev):not(.next) a')
          .getAttribute('aria-label')
      ).toBe('Page 2');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('.selected a')
          .getAttribute('aria-label')
      ).toBe('Page 1 is your current page');
    });
  });

  describe('default tabindex', () => {
    it('should set the tabindex to 0 on all controls', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} initialPage={0} />
      );
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-child(3) a')
          .getAttribute('tabindex')
      ).toBe('0');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('.selected a')
          .getAttribute('tabindex')
      ).toBe('-1');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:first-child a')
          .getAttribute('tabindex')
      ).toBe('-1');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:last-child a')
          .getAttribute('tabindex')
      ).toBe('0');
    });
  });
});

describe('Test custom props', () => {
  describe('previousLabel/nextLabel', () => {
    it('should use the previousLabel prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          previousLabel={'Custom previous label'}
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:first-child a')
          .textContent
      ).toBe('Custom previous label');
    });

    it('should use the nextLabel prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          nextLabel={'Custom next label'}
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:last-child a')
          .textContent
      ).toBe('Custom next label');
    });
  });

  describe('breakLabel/breakClassName/breakLinkClassName', () => {
    it('should use the breakLabel string prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} breakLabel={'...'} />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li.break').firstChild
          .nodeType
      ).toBe(Node.ELEMENT_NODE);
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li.break').firstChild
          .nodeName
      ).toBe('A');
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li.break').firstChild
          .textContent
      ).toBe('...');
    });

    it('should use the breakLabel node prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          breakLabel={<span>...</span>}
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li.break a').firstChild
          .nodeName
      ).toBe('SPAN');
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li.break a').lastChild
          .textContent
      ).toBe('...');
    });

    it('should use the breakClassName prop when defined', function () {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          breakClassName={'break-me'}
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.break-me')
      ).not.toBe(null);
    });

    it('should use the breakLinkClassName prop when defined', function () {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          breakLinkClassName={'break-link'}
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.break-link')
      ).not.toBe(null);
    });
  });

  describe('onPageChange', () => {
    it('should use the onPageChange prop when defined', () => {
      const myOnPageChangeMethod = jest.fn();
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          onPageChange={myOnPageChangeMethod}
        />
      );
      const nextItem =
        ReactDOM.findDOMNode(pagination).querySelector('li:last-child a');
      ReactTestUtils.Simulate.click(nextItem);

      expect(myOnPageChangeMethod).toHaveBeenCalledWith({ selected: 1 });
    });
  });

  describe('onPageActive', () => {
    it('should use the onPageActive prop when defined', () => {
      const myOnPageActiveMethod = jest.fn();
      const myOnPageChangeMethod = jest.fn();
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          onPageActive={myOnPageActiveMethod}
          onPageChange={myOnPageChangeMethod}
        />
      );
      const activeItem =
        ReactDOM.findDOMNode(pagination).querySelector('.selected a');
      ReactTestUtils.Simulate.click(activeItem);

      expect(myOnPageActiveMethod).toHaveBeenCalledWith({ selected: 0 });
      expect(myOnPageChangeMethod).not.toHaveBeenCalled();
    });
  });

  describe('initialPage', () => {
    it('should use the initialPage prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} initialPage={2} />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('3');
    });
  });

  describe('forcePage', () => {
    it('should use the forcePage prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} forcePage={2} />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('3');
    });

    it('should update forcePage and hence selected page when forcePage value is changed', () => {
      const node = document.createElement('div');
      // TODO Fix this test: use mounted component (requires enzyme?) and change prop on it.
      let pagination = React.createRef();
      ReactDOM.render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          ref={pagination}
          forcePage={2}
        />,
        node,
        () => {
          expect(
            ReactDOM.findDOMNode(pagination.current).querySelector(
              '.selected a'
            ).textContent
          ).toBe('3');
        }
      );
      pagination = React.createRef();
      ReactDOM.render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          ref={pagination}
          forcePage={3}
        />,
        node,
        () => {
          expect(
            ReactDOM.findDOMNode(pagination.current).querySelector(
              '.selected a'
            ).textContent
          ).toBe('3');
        }
      );
    });

    it('should report a warning when using both initialPage and forcePage props', () => {
      const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={3}
          forcePage={2}
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('4');
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenLastCalledWith(
        '(react-paginate): Both initialPage (3) and forcePage (2) props are provided, which is discouraged.' +
          ' Use exclusively forcePage prop for a controlled component.\n' +
          'See https://reactjs.org/docs/forms.html#controlled-components'
      );
      consoleWarnMock.mockRestore();
    });

    it('(observation) is not totally controlled when forcePage is provided', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} forcePage={2} />
      );

      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('3');

      const pageItem =
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3) a');

      ReactTestUtils.Simulate.click(pageItem);

      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('2');
    });

    it('(observation) is not totally controlled when forcePage is provided, even when it is 0', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} forcePage={0} />
      );

      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('1');

      const pageItem =
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3) a');

      ReactTestUtils.Simulate.click(pageItem);

      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('2');
    });
  });

  describe('disableInitialCallback', () => {
    it('should not call the onPageChange callback when disableInitialCallback is set to true', () => {
      const myOnPageChangeMethod = jest.fn();
      ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={5}
          disableInitialCallback={true}
          onPageChange={myOnPageChangeMethod}
        />
      );
      expect(myOnPageChangeMethod).not.toHaveBeenCalled();
    });
  });

  describe('containerClassName', () => {
    it('should use the containerClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          containerClassName="my-pagination"
        />
      );
      expect(ReactDOM.findDOMNode(pagination).className).toEqual(
        'my-pagination'
      );
    });

    it('should use the className prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          className="my-pagination"
        />
      );
      expect(ReactDOM.findDOMNode(pagination).className).toEqual(
        'my-pagination'
      );
    });

    it('should use the className prop in priority from containerClassName', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          className="my-pagination"
          containerClassName="another"
        />
      );
      expect(ReactDOM.findDOMNode(pagination).className).toEqual(
        'my-pagination'
      );
    });
  });

  describe('pageClassName/activeClassName', () => {
    it('should use the pageClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          pageClassName={'page-item'}
          previousClassName="prev"
          nextClassName="next"
        />
      );

      const pageItem =
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3) a');
      ReactTestUtils.Simulate.click(pageItem);

      expect(
        ReactDOM.findDOMNode(pagination).querySelector(
          'li:not(.selected):not(.prev):not(.next)'
        ).className
      ).toBe('page-item');
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3)')
          .className
      ).toBe('page-item selected');
    });

    it('should use the activeClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          activeClassName="active-page-item"
          previousClassName="prev"
          nextClassName="next"
        />
      );

      const pageItem =
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3) a');
      ReactTestUtils.Simulate.click(pageItem);

      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3)')
          .className
      ).toBe('active-page-item');
    });

    it('should use the activeClassName prop without overriding the defined pageClassName', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          pageClassName="page-item"
          activeClassName="active-page-item"
          previousClassName="prev"
          nextClassName="next"
        />
      );

      const pageItem =
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3) a');
      ReactTestUtils.Simulate.click(pageItem);

      expect(
        ReactDOM.findDOMNode(pagination).querySelector(
          'li:not(.selected):not(.prev):not(.next)'
        ).className
      ).toBe('page-item');
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3)')
          .className
      ).toBe('page-item active-page-item');
    });
  });

  describe('pageLinkClassName/activeLinkClassName', () => {
    it('should use the pageLinkClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          pageLinkClassName="page-item-link"
          previousClassName="prev"
          nextClassName="next"
        />
      );

      expect(
        ReactDOM.findDOMNode(pagination).querySelector(
          'li:not(.selected):not(.prev):not(.next) a'
        ).className
      ).toBe('page-item-link');
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a').className
      ).toBe('page-item-link');
    });

    it('should use the activeLinkClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          activeLinkClassName="active-page-item-link"
          pageCount={5}
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a').className
      ).toBe('active-page-item-link');
    });

    it('should use the activeLinkClassName prop without overriding the defined pageLinkClassName', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          pageLinkClassName="page-item-link"
          activeLinkClassName="active-page-item-link"
          previousClassName="prev"
          nextClassName="next"
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector(
          'li:not(.selected):not(.prev):not(.next) a'
        ).className
      ).toBe('page-item-link');
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a').className
      ).toBe('page-item-link active-page-item-link');
    });
  });

  describe('previousClassName/nextClassName', () => {
    it('should use the previousClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={2}
          previousClassName="custom-previous-classname"
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:first-child')
          .className
      ).toBe('custom-previous-classname');
    });

    it('should use the nextClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={2}
          nextClassName="custom-next-classname"
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:last-child')
          .className
      ).toBe('custom-next-classname');
    });
  });

  describe('previousLinkClassName/nextLinkClassName/disabledLinkClassName', () => {
    it('should use the previousLinkClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={2}
          previousLinkClassName="custom-previous-link-classname"
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:first-child a')
          .className
      ).toBe('custom-previous-link-classname');
    });

    it('should use the nextLinkClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={2}
          nextLinkClassName="custom-next-link-classname"
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:last-child a')
          .className
      ).toBe('custom-next-link-classname');
    });

    it('should use the disabledLinkClassName prop when defined', () => {
      const paginationFirst = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={0}
          disabledLinkClassName="custom-disabled-link-classname"
        />
      );
      expect(
        ReactDOM.findDOMNode(paginationFirst).querySelector('li:first-child a')
          .className
      ).toBe(' custom-disabled-link-classname');
      expect(
        ReactDOM.findDOMNode(paginationFirst).querySelector('li:last-child a')
          .className
      ).toBe('');

      const paginationLast = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={9}
          disabledLinkClassName="custom-disabled-link-classname"
        />
      );
      expect(
        ReactDOM.findDOMNode(paginationLast).querySelector('li:first-child a')
          .className
      ).toBe('');
      expect(
        ReactDOM.findDOMNode(paginationLast).querySelector('li:last-child a')
          .className
      ).toBe(' custom-disabled-link-classname');
    });

    it('should combines the previousLinkClassName and disabledLinkClassName props', () => {
      const paginationFirst = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={0}
          previousLinkClassName="custom-previous-link-classname"
          nextLinkClassName="custom-next-link-classname"
          disabledLinkClassName="custom-disabled-link-classname"
        />
      );
      expect(
        ReactDOM.findDOMNode(paginationFirst).querySelector('li:first-child a')
          .className
      ).toBe('custom-previous-link-classname custom-disabled-link-classname');
      expect(
        ReactDOM.findDOMNode(paginationFirst).querySelector('li:last-child a')
          .className
      ).toBe('custom-next-link-classname');
    });

    it('should combines the nextLinkClassName and disabledLinkClassName props', () => {
      const paginationFirst = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={9}
          previousLinkClassName="custom-previous-link-classname"
          nextLinkClassName="custom-next-link-classname"
          disabledLinkClassName="custom-disabled-link-classname"
        />
      );
      expect(
        ReactDOM.findDOMNode(paginationFirst).querySelector('li:first-child a')
          .className
      ).toBe('custom-previous-link-classname');
      expect(
        ReactDOM.findDOMNode(paginationFirst).querySelector('li:last-child a')
          .className
      ).toBe('custom-next-link-classname custom-disabled-link-classname');
    });
  });

  describe('prevRel/nextRel', () => {
    it('should render default rel if they are not specified', function () {
      const linkedPagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={3} />
      );

      expect(
        ReactDOM.findDOMNode(linkedPagination)
          .querySelector('li:last-child a')
          .getAttribute('rel')
      ).toBe('next');
      expect(
        ReactDOM.findDOMNode(linkedPagination)
          .querySelector('li:first-child a')
          .getAttribute('rel')
      ).toBe('prev');
    });

    it('should render custom rel if they are defined', function () {
      const linkedPagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={3}
          nextRel={'nofollow noreferrer'}
          prevRel={'nofollow noreferrer'}
        />
      );

      expect(
        ReactDOM.findDOMNode(linkedPagination)
          .querySelector('li:last-child a')
          .getAttribute('rel')
      ).toBe('nofollow noreferrer');
      expect(
        ReactDOM.findDOMNode(linkedPagination)
          .querySelector('li:first-child a')
          .getAttribute('rel')
      ).toBe('nofollow noreferrer');
    });
  });

  describe('disabledClassName', () => {
    it('should use the disabledClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          initialPage={0}
          pageCount={1}
          disabledClassName="custom-disabled-classname"
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:first-child')
          .className
      ).toBe('previous custom-disabled-classname');
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:last-child')
          .className
      ).toBe('next custom-disabled-classname');
    });
  });

  describe('hrefBuilder', () => {
    it('should use the hrefBuilder prop when defined', function () {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={1}
          hrefBuilder={(page) => '/page/' + page}
        />
      );

      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:last-child a')
          .getAttribute('href')
      ).toBe('/page/3');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:first-child a')
          .getAttribute('href')
      ).toBe('/page/1');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('.selected a')
          .getAttribute('href')
      ).toBe('/page/2');
    });

    it('should not add href to disabled next / previous buttons', function () {
      const paginationFirst = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={0}
          hrefBuilder={(page) => '/page/' + page}
        />
      );

      expect(
        ReactDOM.findDOMNode(paginationFirst)
          .querySelector('li:last-child a')
          .getAttribute('href')
      ).toBe('/page/2');
      expect(
        ReactDOM.findDOMNode(paginationFirst)
          .querySelector('li:first-child a')
          .getAttribute('href')
      ).toBe(null);
      expect(
        ReactDOM.findDOMNode(paginationFirst)
          .querySelector('.selected a')
          .getAttribute('href')
      ).toBe('/page/1');

      const paginationLast = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={DEFAULT_PAGE_COUNT - 1}
          hrefBuilder={(page) => '/page/' + page}
        />
      );

      expect(
        ReactDOM.findDOMNode(paginationLast)
          .querySelector('li:last-child a')
          .getAttribute('href')
      ).toBe(null);
      expect(
        ReactDOM.findDOMNode(paginationLast)
          .querySelector('li:first-child a')
          .getAttribute('href')
      ).toBe('/page/9');
      expect(
        ReactDOM.findDOMNode(paginationLast)
          .querySelector('.selected a')
          .getAttribute('href')
      ).toBe('/page/10');
    });

    it('should add href to all controls when hrefAllControls is set to true', function () {
      const paginationFirst = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={0}
          hrefBuilder={(page, pageCount) =>
            page >= 1 && page <= pageCount ? `/page/${page}` : '#'
          }
          hrefAllControls
        />
      );

      expect(
        ReactDOM.findDOMNode(paginationFirst)
          .querySelector('li:last-child a')
          .getAttribute('href')
      ).toBe('/page/2');
      expect(
        ReactDOM.findDOMNode(paginationFirst)
          .querySelector('li:first-child a')
          .getAttribute('href')
      ).toBe('#');
      expect(
        ReactDOM.findDOMNode(paginationFirst)
          .querySelector('.selected a')
          .getAttribute('href')
      ).toBe('/page/1');

      const paginationLast = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={DEFAULT_PAGE_COUNT - 1}
          hrefBuilder={(page) => '/page/' + page}
        />
      );

      expect(
        ReactDOM.findDOMNode(paginationLast)
          .querySelector('li:last-child a')
          .getAttribute('href')
      ).toBe(null);
      expect(
        ReactDOM.findDOMNode(paginationLast)
          .querySelector('li:first-child a')
          .getAttribute('href')
      ).toBe('/page/9');
      expect(
        ReactDOM.findDOMNode(paginationLast)
          .querySelector('.selected a')
          .getAttribute('href')
      ).toBe('/page/10');
    });
  });

  describe('extraAriaContext', () => {
    it('should use the extraAriaContext prop when defined', () => {
      const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          extraAriaContext="can be clicked"
          previousClassName="prev"
          nextClassName="next"
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:not(.selected):not(.prev):not(.next) a')
          .getAttribute('aria-label')
      ).toBe('Page 2 can be clicked');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('.selected a')
          .getAttribute('aria-label')
      ).toBe('Page 1 is your current page');
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenLastCalledWith(
        'DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead.'
      );
      consoleWarnMock.mockRestore();
    });
  });

  describe('aria-disabled', () => {
    it('should be true for previous link when link is disabled', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView initialPage={0} pageCount={5} />
      );
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:first-child a')
          .getAttribute('aria-disabled')
      ).toBe('true');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:last-child a')
          .getAttribute('aria-disabled')
      ).toBe('false');
    });

    it('should be true for next link when link is disabled', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView initialPage={4} pageCount={5} />
      );

      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:first-child a')
          .getAttribute('aria-disabled')
      ).toBe('false');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:last-child a')
          .getAttribute('aria-disabled')
      ).toBe('true');
    });
  });

  it('should be true for both previous and next links when only one page', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView initialPage={0} pageCount={1} />
    );

    expect(
      ReactDOM.findDOMNode(pagination)
        .querySelector('li:first-child a')
        .getAttribute('aria-disabled')
    ).toBe('true');
    expect(
      ReactDOM.findDOMNode(pagination)
        .querySelector('li:last-child a')
        .getAttribute('aria-disabled')
    ).toBe('true');
  });

  it('should render default aria labels if they are not specified', function () {
    const linkedPagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView pageCount={3} />
    );

    expect(
      ReactDOM.findDOMNode(linkedPagination)
        .querySelector('li:last-child a')
        .getAttribute('aria-label')
    ).toBe('Next page');
    expect(
      ReactDOM.findDOMNode(linkedPagination)
        .querySelector('li:first-child a')
        .getAttribute('aria-label')
    ).toBe('Previous page');
  });

  it('should render custom aria labels if they are defined', function () {
    const linkedPagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        pageCount={3}
        nextAriaLabel={'Go to the next page'}
        previousAriaLabel={'Go to the previous page'}
      />
    );

    expect(
      ReactDOM.findDOMNode(linkedPagination)
        .querySelector('li:last-child a')
        .getAttribute('aria-label')
    ).toBe('Go to the next page');
    expect(
      ReactDOM.findDOMNode(linkedPagination)
        .querySelector('li:first-child a')
        .getAttribute('aria-label')
    ).toBe('Go to the previous page');
  });

  describe('render custom page labels if defined', () => {
    it('should use custom page labels', () => {
      const data = [
        { name: 'Item 1' },
        { name: 'Item 2' },
        { name: 'Item 3' },
        { name: 'Item 4' },
        { name: 'Item 5' },
      ];

      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={data.length}
          pageLabelBuilder={(page) => {
            const pageIndex = page - 1;
            return data[pageIndex]?.name;
          }}
        />
      );

      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('Item 1');
    });
  });
  describe('prevPageRel/nextPageRel/selectedPageRel', () => {
    it('should render default rel if not defined', function () {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={4} />
      );

      const activeItem =
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3) a');
      ReactTestUtils.Simulate.click(activeItem);

      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-child(3) a')
          .getAttribute('rel')
      ).toBe('canonical');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-child(2) a')
          .getAttribute('rel')
      ).toBe('prev');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-child(4) a')
          .getAttribute('rel')
      ).toBe('next');
    });
    it('should render custom rel if defined', function () {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={4}
          prevPageRel="custom-prev-rel"
          nextPageRel="custom-next-rel"
          selectedPageRel="custom-selected-rel"
        />
      );

      const activeItem =
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3) a');
      ReactTestUtils.Simulate.click(activeItem);

      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-child(3) a')
          .getAttribute('rel')
      ).toBe('custom-selected-rel');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-child(2) a')
          .getAttribute('rel')
      ).toBe('custom-prev-rel');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-child(4) a')
          .getAttribute('rel')
      ).toBe('custom-next-rel');
    });
    it('should not render rel if prePageRel, selectedPageRel and nextPageRel are null', function () {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={4}
          prevPageRel={null}
          nextPageRel={null}
          selectedPageRel={null}
        />
      );

      const activeItem =
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-Child(3) a');
      ReactTestUtils.Simulate.click(activeItem);

      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-child(2) a')
          .getAttribute('rel')
      ).toBe(null);
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-child(3) a')
          .getAttribute('rel')
      ).toBe(null);
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('.selected a')
          .getAttribute('rel')
      ).toBe(null);
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-child(4) a')
          .getAttribute('rel')
      ).toBe(null);
    });
    it('should not render prevPageRel and nextPageRel if pageCount is 1', function () {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={1} />
      );

      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:first-child a')
          .getAttribute('aria-label')
      ).toBe('Previous page');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-Child(2) a')
          .getAttribute('rel')
      ).toBe('canonical');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('.selected a')
          .getAttribute('rel')
      ).toBe('canonical');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-last-Child(2) a')
          .getAttribute('rel')
      ).toBe('canonical');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:last-child a')
          .getAttribute('aria-label')
      ).toBe('Next page');
    });
    it('should not render prevPageRel if selected page is first', function () {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={4} />
      );

      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-Child(1) a')
          .getAttribute('aria-label')
      ).toBe('Previous page');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-Child(2) a')
          .getAttribute('rel')
      ).toBe('canonical');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-Child(3) a')
          .getAttribute('rel')
      ).toBe('next');
    });
    it('should not render nextPageRel if selected page is last', function () {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView pageCount={4} />
      );

      const activeItem = ReactDOM.findDOMNode(pagination).querySelector(
        'li:nth-last-child(2) a'
      );
      ReactTestUtils.Simulate.click(activeItem);

      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-last-Child(1) a')
          .getAttribute('aria-label')
      ).toBe('Next page');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-last-Child(2) a')
          .getAttribute('rel')
      ).toBe('canonical');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-last-Child(3) a')
          .getAttribute('rel')
      ).toBe('prev');
    });
    it('should not render nextPageRel if the break page is present just after the selected page', function () {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={20}
          marginPagesDisplayed={2}
          pageRangeDisplayed={0}
        />
      );

      const activeItem =
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3) a');
      ReactTestUtils.Simulate.click(activeItem);

      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-Child(2) a')
          .getAttribute('rel')
      ).toBe('prev');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-Child(3) a')
          .getAttribute('rel')
      ).toBe('canonical');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-Child(4)')
          .getAttribute('class')
      ).toBe('break');
    });
    it('should not render prevPageRel if the break page is present just before the selected page', function () {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageCount={20}
          marginPagesDisplayed={2}
          pageRangeDisplayed={0}
        />
      );

      const activeItem = ReactDOM.findDOMNode(pagination).querySelector(
        'li:nth-last-child(3) a'
      );

      ReactTestUtils.Simulate.click(activeItem);
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-last-Child(2) a')
          .getAttribute('rel')
      ).toBe('next');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-last-Child(3) a')
          .getAttribute('rel')
      ).toBe('canonical');
      expect(
        ReactDOM.findDOMNode(pagination)
          .querySelector('li:nth-last-Child(4)')
          .getAttribute('class')
      ).toBe('break');
    });
  });

  describe('Prevent breaks for one page', () => {
    it('test clicks on previous and next buttons', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageRangeDisplayed={5}
          pageCount={12}
          renderOnZeroPageCount={null}
          marginPagesDisplayed={1}
        />
      );

      const elmts = ReactTestUtils.scryRenderedDOMComponentsWithTag(
        pagination,
        'a'
      );
      const previous = elmts[0];
      const next = elmts[elmts.length - 1];

      ReactTestUtils.Simulate.click(next);
      expect(
        ReactDOM.findDOMNode(pagination).querySelectorAll('.selected a').length
      ).toBe(1);
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('2');

      // Click to go to page 8.
      for (let i = 1; i < 7; i++) {
        ReactTestUtils.Simulate.click(next);
        expect(
          ReactDOM.findDOMNode(pagination).querySelectorAll('.selected a')
            .length
        ).toBe(1);
        expect(
          ReactDOM.findDOMNode(pagination).querySelector('.selected a')
            .textContent
        ).toBe(`${2 + i}`);
      }
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('8');

      ReactTestUtils.Simulate.click(previous);

      expect(
        ReactDOM.findDOMNode(pagination).querySelectorAll('.selected a').length
      ).toBe(1);
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('7');
    });
  });

  describe('Prevent breaks when only one active page', () => {
    it('does not show break', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageRangeDisplayed={0}
          pageCount={12}
          marginPagesDisplayed={0}
        />
      );

      const elmts = ReactTestUtils.scryRenderedDOMComponentsWithTag(
        pagination,
        'a'
      );
      const next = elmts[elmts.length - 1];

      expect(
        ReactDOM.findDOMNode(pagination).querySelectorAll('.break a').length
      ).toBe(0);
      expect(
        ReactDOM.findDOMNode(pagination).querySelectorAll('.selected a').length
      ).toBe(1);
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('1');

      ReactTestUtils.Simulate.click(next);
      expect(
        ReactDOM.findDOMNode(pagination).querySelectorAll('.break a').length
      ).toBe(0);
      expect(
        ReactDOM.findDOMNode(pagination).querySelectorAll('.selected a').length
      ).toBe(1);
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('2');
    });
  });

  describe('onClick', () => {
    it('should use the onClick prop when defined', () => {
      const myOnClick = jest.fn(() => false);
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          onClick={myOnClick}
          initialPage={10}
          pageCount={20}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
        />
      );
      const breakItem =
        ReactDOM.findDOMNode(pagination).querySelector('li.break a');
      ReactTestUtils.Simulate.click(breakItem);

      expect(myOnClick).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 2,
          selected: 10,
          event: expect.objectContaining({ target: expect.any(Element) }),
          isPrevious: false,
          isNext: false,
          isBreak: true,
          isActive: false,
        })
      );

      // page should not change because onClick returned false
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('11');
    });

    it('should use the return value from onClick to change page', () => {
      const myOnClick = () => 5;
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          onClick={myOnClick}
          initialPage={10}
          pageCount={20}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
        />
      );
      const breakItem =
        ReactDOM.findDOMNode(pagination).querySelector('li.break a');
      ReactTestUtils.Simulate.click(breakItem);

      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('6');
    });
  });
});
