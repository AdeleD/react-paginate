import React from 'react';
import ReactDOM from 'react-dom';

jest.dontMock('./../react_components/PaginationBoxView');
jest.dontMock('./../react_components/PageView');
jest.dontMock('./../react_components/BreakView');

import PaginationBoxView from './../react_components/PaginationBoxView';
import PageView from './../react_components/PageView';
import BreakView from './../react_components/BreakView';

import ReactTestUtils from 'react-dom/test-utils';

describe('PaginationBoxView', () => {
  const pagination = ReactTestUtils.renderIntoDocument(
    <PaginationBoxView />
  );

  it('should render a pagination component', () => {
    expect(ReactDOM.findDOMNode(pagination).nodeName).toEqual("UL");

    ReactTestUtils.scryRenderedComponentsWithType(pagination, PaginationBoxView);

    expect(ReactDOM.findDOMNode(pagination).querySelector("li:first-child a").textContent).toBe("Previous");
    expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("1");
    expect(ReactDOM.findDOMNode(pagination).querySelector("li:last-child a").textContent).toBe("Next");

    const pages = ReactDOM.findDOMNode(pagination).querySelectorAll("li");
    // 3*2 margins + 1 break label + previous & next buttons == 9:
    expect(pages.length).toEqual(9);
  });

  it('test previous and next buttons', () => {
    let elmts = ReactTestUtils.scryRenderedDOMComponentsWithTag(pagination, 'a');
    let previous = elmts[0];
    let next = elmts[elmts.length - 1];

    ReactTestUtils.Simulate.click(next);

    expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("2");

    ReactTestUtils.Simulate.click(previous);

    expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("1");
  });

  it('test click on a page item', () => {
    ReactTestUtils.findRenderedComponentWithType(pagination, PaginationBoxView);

    const pageItem = ReactDOM.findDOMNode(pagination).querySelector("li:nth-child(3) a");

    ReactTestUtils.Simulate.click(pageItem);

    expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("2");
  });

  it('test rendering only active page item', function() {
    const smallPagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={0}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        breakLabel={null} />
    );

    const pageItems = ReactDOM.findDOMNode(smallPagination).querySelectorAll("li");
    // Prev, selected page, next
    expect(pageItems.length).toBe(3);
  });

  it('should render href attribute in items if hrefBuilder is specified', function() {
    const linkedPagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={1}
        hrefBuilder={(page) => '/page/' + page } />
    );

    expect(ReactDOM.findDOMNode(linkedPagination).querySelector('li:last-child a')
      .getAttribute('href')).toBe('/page/3');
    expect(ReactDOM.findDOMNode(linkedPagination).querySelector('li:first-child a')
      .getAttribute('href')).toBe('/page/1');
    expect(ReactDOM.findDOMNode(linkedPagination).querySelector('.selected a')
      .getAttribute('href')).toBe(null);
  });

  it('should not render href attribute in items if hrefBuilder is not specified', function() {
    const linkedPagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView />
    );

    expect(ReactDOM.findDOMNode(linkedPagination).querySelector('li:last-child a')
      .hasAttribute('href')).toBe(false);
    expect(ReactDOM.findDOMNode(linkedPagination).querySelector('li:first-child a')
      .hasAttribute('href')).toBe(false);
    expect(ReactDOM.findDOMNode(linkedPagination).querySelector('.selected a')
      .hasAttribute('href')).toBe(false);
  });

  it('test breakClassName rendering', function() {
    const smallPagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView breakClassName={"break-me"}/>
    );

    const breakItem = ReactDOM.findDOMNode(smallPagination).querySelectorAll(".break-me");
    expect(breakItem.length).toBe(1);
  });

  describe('prop disableInitialCallback', () => {
    it('test when true', function() {
      const onPageChange = jest.fn();
      const smallPagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          disableInitialCallback={true}
          initialPage={5}
          onPageChange={onPageChange}
        />
      );

      expect(onPageChange).not.toHaveBeenCalled();
    });
    it('test when false', function() {
      const onPageChange = jest.fn();
      const smallPagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView initialPage={5} onPageChange={onPageChange} />
      );

      expect(onPageChange).toHaveBeenCalled();
    });
  });

  describe('prop disabledClassName', () => {
    it('defaults to disable when no provided', function() {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          initialPage={0}
          pageCount={1}
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:first-child").className).toBe("previous disabled");
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:last-child").className).toBe("next disabled");
    });
    it('use the prop when provided', function() {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          initialPage={0}
          pageCount={1}
          disabledClassName="custom disabled class"
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:first-child").className).toBe("previous custom disabled class");
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:last-child").className).toBe("next custom disabled class");
    });
  });
});
