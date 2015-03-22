/** @jsx React.DOM */
jest.dontMock('./../react_components/index.js');
jest.dontMock('./../react_components/PaginationBoxView.jsx');
jest.dontMock('./../react_components/PaginationListView.jsx');
jest.dontMock('./../react_components/PageView.jsx');

var React = require('react/addons');
var PaginationBoxView = require('./../react_components/PaginationBoxView.jsx');
var PaginationListView = require('./../react_components/PaginationListView.jsx');
var PageView = require('./../react_components/PageView.jsx');
var TestUtils = React.addons.TestUtils;

describe('PaginationBoxView', function() {
  var pagination = TestUtils.renderIntoDocument(
    <PaginationBoxView />
  );

  it('should render a pagination component', function() {
    expect(pagination.getDOMNode().nodeName).toEqual("UL");

    TestUtils.scryRenderedComponentsWithType(pagination, PaginationListView);

    expect(pagination.getDOMNode().querySelector(".selected a").textContent).toBe("1");

    var pages = pagination.getDOMNode().querySelectorAll("li");
    expect(pages.length).toEqual(8);
  });

  it('test previous and next buttons', function() {
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(pagination, 'next'));

    expect(pagination.getDOMNode().querySelector(".selected a").textContent).toBe("2");

    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(pagination, 'previous'));

    expect(pagination.getDOMNode().querySelector(".selected a").textContent).toBe("1");
  });

  it('test click on a page item', function() {
    TestUtils.findRenderedComponentWithType(pagination, PaginationListView);

    var pageItem = pagination.getDOMNode().querySelector("li:nth-child(3)").querySelector("a");

    TestUtils.Simulate.click(pageItem);

    expect(pagination.getDOMNode().querySelector(".selected a").textContent).toBe("3");
  });
});
