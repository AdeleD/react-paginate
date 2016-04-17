import React from 'react';
import ReactDOM from 'react-dom';

jest.dontMock('./../react_components/PaginationBoxView');
jest.dontMock('./../react_components/PageView');
jest.dontMock('./../react_components/BreakView');
jest.dontMock('classnames');

const PaginationBoxView = require('./../react_components/PaginationBoxView').default;
const PageView = require('./../react_components/PageView').default;
const BreakView = require('./../react_components/BreakView').default;

import ReactTestUtils from 'react-addons-test-utils';


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
    let elmts = ReactTestUtils.scryRenderedDOMComponentsWithTag(pagination, 'li');
    let previous = elmts[0];
    let next = elmts[elmts.length - 1];

    ReactTestUtils.Simulate.click(next);

    expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("2");

    ReactTestUtils.Simulate.click(previous);

    expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("1");
  });

  it('test click on a page item', () => {
    ReactTestUtils.findRenderedComponentWithType(pagination, PaginationBoxView);

    const pageItem = ReactDOM.findDOMNode(pagination).querySelector("li:nth-child(3)").querySelector("a");

    ReactTestUtils.Simulate.click(pageItem);

    expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("2");
  });

  it('test rendering only active page item', function() {
    const smallPagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialSelected={0}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        breakLabel={null} />
    );

    const pageItems = ReactDOM.findDOMNode(smallPagination).querySelectorAll("li");
    // Prev, selected page, next
    expect(pageItems.length).toBe(3);
  });

  it('accepts disabledClassName prop to set class on disabled previous and next buttons', function() {
    const expectedClassName = "disabledClassNameForTest";
    const disabledPagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        pageNum={5}
        pageRangeDisplayed={5}
        marginPagesDisplayed={0}
        disabledClassName={expectedClassName} />
    );

    // Test that the previous button uses the proper disabled class
    const firstPage = ReactDOM.findDOMNode(disabledPagination).querySelector("li:nth-child(2)").querySelector("a");
    ReactTestUtils.Simulate.click(firstPage);
    expect(ReactDOM.findDOMNode(disabledPagination)
      .querySelector("li:nth-child(1)")
      .classList.contains(expectedClassName))
      .toBe(true);

    // Test that the next button uses the proper disabled class
    const lastPage = ReactDOM.findDOMNode(disabledPagination).querySelector("li:nth-child(6)").querySelector("a");
    ReactTestUtils.Simulate.click(lastPage);
    expect(ReactDOM.findDOMNode(disabledPagination)
      .querySelector("li:nth-child(7)")
      .classList.contains(expectedClassName))
      .toBe(true);
  });
});
