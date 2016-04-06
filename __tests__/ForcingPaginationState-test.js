'use-strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

jest.dontMock('./../react_components/PaginationBoxView');
jest.dontMock('./../react_components/PageView');
jest.dontMock('./../react_components/BreakView');

const PaginationBoxView =
  require('./../react_components/PaginationBoxView').default;

describe('prop initialSelected', () => {
  it('should force selected page on first render', () => {
    const initialSelectedPageIndex = 1;
    const forcedPagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        pageNum={2}
        initialSelected={initialSelectedPageIndex}
      />
    );

    const actualSelected =
      ReactDOM.findDOMNode(forcedPagination).querySelector('.selected a');
    const expectedSelectedPageLabel = initialSelectedPageIndex + 1 + '';

    expect(actualSelected.textContent).toBe(expectedSelectedPageLabel);
  });

  it('should not change selected page when the prop value changes', () => {
    const initialSelectedPageIndex = 1;
    const domNode = document.createElement('div');
    const forcedPagination = ReactDOM.render(
      <PaginationBoxView
        pageNum={2}
        initialSelected={initialSelectedPageIndex}
      />,
      domNode
    );

    ReactDOM.render(
      <PaginationBoxView
        pageNum={2}
        initialSelected={initialSelectedPageIndex + 1}
      />,
      domNode
    );

    const actualSelected =
      ReactDOM.findDOMNode(forcedPagination).querySelector('.selected a');
    const expectedSelectedPageLabel = initialSelectedPageIndex + 1 + '';

    expect(actualSelected.textContent).toBe(expectedSelectedPageLabel);
  });
});

describe('prop forceSelected', () => {
  describe('on first render', () => {
    it('should not override initialSelected', () => {
      const initialSelectedPageIndex = 1;
      const forcedPagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageNum={2}
          initialSelected={initialSelectedPageIndex}
          forceSelected={initialSelectedPageIndex - 1}
        />
      );

      const actualSelected =
        ReactDOM.findDOMNode(forcedPagination).querySelector('.selected a');
      const expectedSelectedPageLabel = initialSelectedPageIndex + 1 + '';

      expect(actualSelected.textContent).toBe(expectedSelectedPageLabel);
    });

    it('should set selected page if initialSelected is NOT specified', () => {
      const initialSelectedPageIndex = 1;
      const forcedPagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageNum={2}
          forceSelected={initialSelectedPageIndex}
        />
      );

      const actualSelected =
        ReactDOM.findDOMNode(forcedPagination).querySelector('.selected a');
      const expectedSelectedPageLabel = initialSelectedPageIndex + 1 + '';

      expect(actualSelected.textContent).toBe(expectedSelectedPageLabel);
    });
  });

  describe('on change', () => {
    it('should change selected page', () => {
      let domNode = document.createElement('div');
      const expectedSelectedPageIndex = 1;
      const forcedPagination = ReactDOM.render(
        <PaginationBoxView
          pageNum={2}
          forceSelected={0}
        />,
        domNode
      );

      ReactDOM.render(
        <PaginationBoxView
          pageNum={2}
          forceSelected={expectedSelectedPageIndex}
        />,
        domNode
      );

      const actualSelected =
        ReactDOM.findDOMNode(forcedPagination).querySelector('.selected a');
      const expectedSelectedPageLabel = expectedSelectedPageIndex + 1 + '';

      expect(actualSelected.textContent).toBe(expectedSelectedPageLabel);
    });
  });
});
