import React from 'react';
import ReactDOM from 'react-dom';

jest.dontMock('./../react_components/PaginationBoxView');
jest.dontMock('./../react_components/PageView');
jest.dontMock('./../react_components/BreakView');

import PaginationBoxView from './../react_components/PaginationBoxView';

import ReactTestUtils from 'react-dom/test-utils';

describe('Zero-indexed pagination', () => {
  it('should render a pagination component', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView />
    );

    expect(ReactDOM.findDOMNode(pagination).nodeName).toEqual("UL");

    ReactTestUtils.scryRenderedComponentsWithType(pagination, PaginationBoxView);

    expect(ReactDOM.findDOMNode(pagination).querySelector("li:first-child a").textContent).toBe("Previous");
    expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("1");
    expect(ReactDOM.findDOMNode(pagination).querySelector("li:last-child a").textContent).toBe("Next");

    const pages = ReactDOM.findDOMNode(pagination).querySelectorAll("li");
    // 3 * 2 margins + 1 break label + previous & next buttons == 9:
    expect(pages.length).toEqual(9);
  });

  it('test rendering only active page item', function() {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={0}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        breakLabel={null} />
    );

    const pageItems = ReactDOM.findDOMNode(pagination).querySelectorAll("li");
    // Prev, selected page, next
    expect(pageItems.length).toBe(3);
  });
});

describe('One-indexed pagination', () => {
  it('should render a pagination component', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView oneIndexed />
    );
    expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("1");
  });
});
