import React from 'react';
import ReactDOM from 'react-dom';

jest.dontMock('./../react_components/PaginationBoxView');
jest.dontMock('./../react_components/PageView');
jest.dontMock('./../react_components/BreakView');

import PaginationBoxView from './../react_components/PaginationBoxView';

import ReactTestUtils from 'react-dom/test-utils';

describe('Zero-indexed pagination', () => {
  describe('default previousLabel/nextLabel', () => {
    it('should use the default previousLabel/nextLabel', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:first-child a").textContent).toBe("Previous");
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:last-child a").textContent).toBe("Next");
    });
  });

  describe('default breakLabel/breakClassName', () => {
    it('should use the default breakLabel/breakClassName', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li.break").textContent).toBe("...");
      expect(ReactDOM.findDOMNode(pagination).querySelector(".break")).not.toBe(null);
    });
  });

  describe('default onPageChange', () => {
    it('should not call any onPageChange callback if not defined but it should go to the next page', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView />
      );
      const nextItem = ReactDOM.findDOMNode(pagination).querySelector("li:last-child a");
      ReactTestUtils.Simulate.click(nextItem);

      expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("2");
    });
  });

  describe('default initialPage/forcePage', () => {
    it('should use the default initial selected page (0)', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("1");
    });
  });

  describe('default disableInitialCallback', () => {
    it('should call the onPageChange callback when disableInitialCallback is set to false/undefined', () => {
      const myOnPageChangeMethod = jest.fn();
      ReactTestUtils.renderIntoDocument(
        <PaginationBoxView 
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
        <PaginationBoxView />
      );
      expect(ReactDOM.findDOMNode(pagination).className).toEqual("");
    });
  });

  describe('default pageClassName/activeClassName', () => {
    it('should not use any classname on page items and a default activeClassName', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView 
          previousClassName="prev"
          nextClassName="next"
        />
      );

      const pageItem = ReactDOM.findDOMNode(pagination).querySelector("li:nth-child(3) a");
      ReactTestUtils.Simulate.click(pageItem);

      expect(ReactDOM.findDOMNode(pagination).querySelector("li:not(.selected):not(.prev):not(.next)").className).toBe("");
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:nth-child(3)").className).toBe("selected");
    });
  });

  describe('default pageLinkClassName/activeLinkClassName', () => {
    it('should not use any classname on selected links by default', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          previousClassName="prev"
          nextClassName="next"
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:not(.selected):not(.prev):not(.next) a").className).toBe("");
      expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").className).toBe("");
    });
  });

  describe('default previousClassName/nextClassName', () => {
    it('should use the default previousClassName/nextClassName', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView 
          initialPage={2}
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:first-child").className).toBe("previous");
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:last-child").className).toBe("next");
    });
  });

  describe('default previousLinkClassName/nextLinkClassName', () => {
    it('should not use any classname on previous/next links by default', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView 
          initialPage={2}
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:first-child a").className).toBe("");
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:last-child a").className).toBe("");
    });
  });

  describe('default disabledClassName', () => {
    it('should use the default disabledClassName', function() {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          initialPage={0}
          pageCount={1}
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:first-child").className).toBe("previous disabled");
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:last-child").className).toBe("next disabled");
    });
  });

  describe('default hrefBuilder', () => {
    it('should not render href attributes on page items if hrefBuilder is not defined', function() {
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
  });

  describe('default extraAriaContext', () => {
    it('should use the default extraAriaContext', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          previousClassName="prev"
          nextClassName="next"
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:not(.selected):not(.prev):not(.next) a").getAttribute('aria-label')).toBe("Page 2");
      expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").getAttribute('aria-label')).toBe("Page 1 is your current page");
    });
  });
});

describe('One-indexed pagination', () => {
  describe('default onPageChange', () => {
    it('should not call any onPageChange callback if not defined but it should go to the next page', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView oneIndexed />
      );
      const nextItem = ReactDOM.findDOMNode(pagination).querySelector("li:last-child a");
      ReactTestUtils.Simulate.click(nextItem);

      expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("2");
    });
  });

  describe('default initialPage/forcePage', () => {
    it('should use the default initial selected page (0)', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView oneIndexed />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("1");
    });
  });

  describe('default disableInitialCallback', () => {
    it('should call the onPageChange callback when disableInitialCallback is set to false/undefined', () => {
      const myOnPageChangeMethod = jest.fn();
      ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          initialPage={5}
          onPageChange={myOnPageChangeMethod}
          oneIndexed
        />
      );
      expect(myOnPageChangeMethod).toHaveBeenCalledWith({ selected: 5 });
    });
  });

  describe('default disabledClassName', () => {
    it('should use the default disabledClassName', function() {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          initialPage={1}
          pageCount={1}
          oneIndexed
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:first-child").className).toBe("previous disabled");
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:last-child").className).toBe("next disabled");
    });
  });

  describe('default extraAriaContext', () => {
    it('should use the default extraAriaContext', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          previousClassName="prev"
          nextClassName="next"
          oneIndexed
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:not(.selected):not(.prev):not(.next) a").getAttribute('aria-label')).toBe("Page 2");
      expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").getAttribute('aria-label')).toBe("Page 1 is your current page");
    });
  });
});
