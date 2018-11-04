import React from 'react';
import ReactDOM from 'react-dom';

jest.dontMock('./../react_components/PaginationBoxView');
jest.dontMock('./../react_components/PageView');
jest.dontMock('./../react_components/BreakView');

import PaginationBoxView from './../react_components/PaginationBoxView';

import ReactTestUtils from 'react-dom/test-utils';

describe('Test clicks', () => {
  const pagination = ReactTestUtils.renderIntoDocument(
    <PaginationBoxView />
  );

  it('test clicks on previous and next buttons', () => {
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
});
