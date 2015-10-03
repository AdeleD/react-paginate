import React from 'react/addons';
import PaginationBoxView from './../react_components/PaginationBoxView';
import PaginationListView from './../react_components/PaginationListView';
import PageView from './../react_components/PageView';
const TestUtils = React.addons.TestUtils;

describe('PaginationBoxView', () => {
  const pagination = TestUtils.renderIntoDocument(
    <PaginationBoxView />
  );

  it('should render a pagination component', () => {
    expect(React.findDOMNode(pagination).nodeName).toEqual("UL");

    TestUtils.scryRenderedComponentsWithType(pagination, PaginationListView);

    expect(React.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("1");

    const pages = React.findDOMNode(pagination).querySelectorAll("li");
    expect(pages.length).toEqual(8);
  });

  it('test previous and next buttons', () => {
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(pagination, 'next'));

    expect(React.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("2");

    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(pagination, 'previous'));

    expect(React.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("1");
  });

  it('test click on a page item', () => {
    TestUtils.findRenderedComponentWithType(pagination, PaginationListView);

    const pageItem = React.findDOMNode(pagination).querySelector("li:nth-child(3)").querySelector("a");

    TestUtils.Simulate.click(pageItem);

    expect(React.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("3");
  });

  it('test rendering only active page item', function() {
    const smallPagination = TestUtils.renderIntoDocument(
      <PaginationBoxView pageRangeDisplayed={0} marginPagesDisplayed={0} initialSelected={1} />
    );
    const pageItems = React.findDOMNode(smallPagination).querySelectorAll("li");
    // Prev, current, next
    expect(pageItems.length).toBe(3);
  });
});
