import React from 'react';
import ReactDOM from 'react-dom';

jest.dontMock('./../react_components/PaginationBoxView');
jest.dontMock('./../react_components/PageView');
jest.dontMock('./../react_components/BreakView');

import PaginationBoxView from './../react_components/PaginationBoxView';

import ReactTestUtils from 'react-dom/test-utils';

describe('Test custom props', () => {
  describe('previousLabel/nextLabel', () => {
    it('should use the previousLabel prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          previousLabel={"Custom previous label"}
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:first-child a").textContent).toBe("Custom previous label");
    });
  
    it('should use the nextLabel prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          nextLabel={"Custom next label"}
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:last-child a").textContent).toBe("Custom next label");
    });
  });

  describe('breakLabel/breakClassName', () => {
    it('should use the breakLabel prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          breakLabel={<a href="">...</a>}
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li.break").firstChild.nodeType).toBe(Node.ELEMENT_NODE);
      expect(ReactDOM.findDOMNode(pagination).querySelector("li.break").firstChild.nodeName).toBe("A");
      expect(ReactDOM.findDOMNode(pagination).querySelector("li.break").firstChild.textContent).toBe("...");
    });

    it('should use the breakClassName prop when defined', function() {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView breakClassName={"break-me"} />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector(".break-me")).not.toBe(null);
    });
  });

  describe('onPageChange', () => {
    it('should use the onPageChange prop when defined', () => {
      const myOnPageChangeMethod = jest.fn();
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView onPageChange={myOnPageChangeMethod} />
      );
      const nextItem = ReactDOM.findDOMNode(pagination).querySelector("li:last-child a");
      ReactTestUtils.Simulate.click(nextItem);

      expect(myOnPageChangeMethod).toHaveBeenCalledWith({ selected: 1 });
    });
  });

  describe('initialPage', () => {
    it('should use the initialPage prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView initialPage={2} />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("3");
    });
  });

  describe('forcePage', () => {
    it('should use the forcePage prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView forcePage={2} />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("3");
    });
  });

  describe('disableInitialCallback', () => {
    it('should not call the onPageChange callback when disableInitialCallback is set to true', () => {
      const myOnPageChangeMethod = jest.fn();
      ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
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
        <PaginationBoxView containerClassName={"my-pagination"} />
      );
      expect(ReactDOM.findDOMNode(pagination).className).toEqual("my-pagination");
    });
  });

  describe('pageClassName/activeClassName', () => {
    it('should use the pageClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView 
          pageClassName={"page-item"}
          previousClassName="prev"
          nextClassName="next"
        />
      );

      const pageItem = ReactDOM.findDOMNode(pagination).querySelector("li:nth-child(3) a");
      ReactTestUtils.Simulate.click(pageItem);

      expect(ReactDOM.findDOMNode(pagination).querySelector("li:not(.selected):not(.prev):not(.next)").className).toBe("page-item");
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:nth-child(3)").className).toBe("page-item selected");
    });

    it('should use the activeClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          activeClassName="active-page-item"
          previousClassName="prev"
          nextClassName="next"
        />
      );

      const pageItem = ReactDOM.findDOMNode(pagination).querySelector("li:nth-child(3) a");
      ReactTestUtils.Simulate.click(pageItem);

      expect(ReactDOM.findDOMNode(pagination).querySelector("li:nth-child(3)").className).toBe("active-page-item");
    });

    it('should use the activeClassName prop without overriding the defined pageClassName', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageClassName="page-item"
          activeClassName="active-page-item"
          previousClassName="prev"
          nextClassName="next"
        />
      );

      const pageItem = ReactDOM.findDOMNode(pagination).querySelector("li:nth-child(3) a");
      ReactTestUtils.Simulate.click(pageItem);

      expect(ReactDOM.findDOMNode(pagination).querySelector("li:not(.selected):not(.prev):not(.next)").className).toBe("page-item");
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:nth-child(3)").className).toBe("page-item active-page-item");
    });
  });

  describe('pageLinkClassName/activeLinkClassName', () => {
    it('should use the pageLinkClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageLinkClassName="page-item-link"
          previousClassName="prev"
          nextClassName="next"
        />
      );
      
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:not(.selected):not(.prev):not(.next) a").className).toBe("page-item-link");
      expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").className).toBe("page-item-link");
    });

    it('should use the activeLinkClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          activeLinkClassName="active-page-item-link"
          pageCount={5}
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").className).toBe("active-page-item-link");
    });

    it('should use the activeLinkClassName prop without overriding the defined pageLinkClassName', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          pageLinkClassName="page-item-link"
          activeLinkClassName="active-page-item-link"
          previousClassName="prev"
          nextClassName="next"
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:not(.selected):not(.prev):not(.next) a").className).toBe("page-item-link");
      expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").className).toBe("page-item-link active-page-item-link");
    });
  });

  describe('previousClassName/nextClassName', () => {
    it('should use the previousClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView 
          initialPage={2}
          previousClassName="custom-previous-classname" 
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:first-child").className).toBe("custom-previous-classname");
    });

    it('should use the nextClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView 
          initialPage={2}
          nextClassName="custom-next-classname"
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:last-child").className).toBe("custom-next-classname");
    });
  });

  describe('previousLinkClassName/nextLinkClassName', () => {
    it('should use the previousLinkClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView 
          initialPage={2}
          previousLinkClassName="custom-previous-link-classname" 
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:first-child a").className).toBe("custom-previous-link-classname");
    });

    it('should use the nextLinkClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView 
          initialPage={2}
          nextLinkClassName="custom-next-link-classname"
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:last-child a").className).toBe("custom-next-link-classname");
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
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:first-child").className).toBe("previous custom-disabled-classname");
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:last-child").className).toBe("next custom-disabled-classname");
    });
  });

  describe('hrefBuilder', () => {
    it('should use the hrefBuilder prop when defined', function() {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          initialPage={1}
          hrefBuilder={(page) => '/page/' + page } />
      );
  
      expect(ReactDOM.findDOMNode(pagination).querySelector('li:last-child a')
        .getAttribute('href')).toBe('/page/2');
      expect(ReactDOM.findDOMNode(pagination).querySelector('li:first-child a')
        .getAttribute('href')).toBe('/page/0');
      expect(ReactDOM.findDOMNode(pagination).querySelector('.selected a')
        .getAttribute('href')).toBe(null);
    });
  });

  describe('extraAriaContext', () => {
    it('should use the extraAriaContext prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          extraAriaContext="can be clicked"
          previousClassName="prev"
          nextClassName="next"
        />
      );
      expect(ReactDOM.findDOMNode(pagination).querySelector("li:not(.selected):not(.prev):not(.next) a").getAttribute('aria-label')).toBe("Page 2 can be clicked");
      expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").getAttribute('aria-label')).toBe("Page 1 is your current page");
    });
  });
});
