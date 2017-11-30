import React from 'react';
import ReactDOM from 'react-dom';

jest.dontMock('./../react_components/PaginationBoxView');
jest.dontMock('./../react_components/PageView');
jest.dontMock('./../react_components/BreakView');

import PaginationBoxView from './../react_components/PaginationBoxView';

import ReactTestUtils from 'react-dom/test-utils';

describe('Test rendering', () => {
  it('should render a pagination component', () => {
    const pagination = ReactTestUtils.renderIntoDocument(<PaginationBoxView />);

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

  it('test rendering only active page item', function() {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
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

describe('Test clicks', () => {
  it('test clicks on previous and next buttons', () => {
    const pagination = ReactTestUtils.renderIntoDocument(<PaginationBoxView />);

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
    const pagination = ReactTestUtils.renderIntoDocument(<PaginationBoxView />);

    ReactTestUtils.findRenderedComponentWithType(pagination, PaginationBoxView);

    const pageItem = ReactDOM.findDOMNode(pagination).querySelector(
      'li:nth-child(3) a'
    );

    ReactTestUtils.Simulate.click(pageItem);

    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('2');
  });

  it('test click on the left break view', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={0}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    // The selected page is before the left break
    const leftBreakView1 = ReactDOM.findDOMNode(pagination).querySelector(
      '.break a'
    );
    ReactTestUtils.Simulate.click(leftBreakView1);
    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('6');

    // The selected page is after the left break
    const leftBreakView2 = ReactDOM.findDOMNode(pagination).querySelectorAll(
      '.break a'
    )[0];
    ReactTestUtils.Simulate.click(leftBreakView2);
    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('1');
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
    const rightBreak1 = ReactDOM.findDOMNode(pagination).querySelectorAll(
      '.break a'
    )[1];
    ReactTestUtils.Simulate.click(rightBreak1);
    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('16');

    // The selected page is after the right break
    const rightBreak2 = ReactDOM.findDOMNode(pagination).querySelector(
      '.break a'
    );
    ReactTestUtils.Simulate.click(rightBreak2);
    expect(
      ReactDOM.findDOMNode(pagination).querySelector('.selected a').textContent
    ).toBe('11');
  });
});

describe('Test pagination behaviour', () => {
  it('should display 6 elements to the left, 1 break element and 2 elements to the right', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={0}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    const previousElement = ReactDOM.findDOMNode(pagination).querySelector(
      'li:first-child'
    );
    const nextElement = ReactDOM.findDOMNode(pagination).querySelector(
      'li:last-child'
    );

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll(
      'li:not(.previous):not(.next)'
    );
    elements.forEach(element => {
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
    expect(leftElements.length).toBe(6);
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

    const previousElement = ReactDOM.findDOMNode(pagination).querySelector(
      'li:first-child'
    );
    const nextElement = ReactDOM.findDOMNode(pagination).querySelector(
      'li:last-child'
    );

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll(
      'li:not(.previous):not(.next)'
    );
    elements.forEach(element => {
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
        initialPage={5}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    const previousElement = ReactDOM.findDOMNode(pagination).querySelector(
      'li:first-child'
    );
    const nextElement = ReactDOM.findDOMNode(pagination).querySelector(
      'li:last-child'
    );

    let leftElements = [];
    let middleElements = [];
    let rightElements = [];
    let breakElements = [];
    let leftBreakElementReached = false;
    let rightBreakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll(
      'li:not(.previous):not(.next)'
    );
    elements.forEach(element => {
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

    const previousElement = ReactDOM.findDOMNode(pagination).querySelector(
      'li:first-child'
    );
    const nextElement = ReactDOM.findDOMNode(pagination).querySelector(
      'li:last-child'
    );

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll(
      'li:not(.previous):not(.next)'
    );
    elements.forEach(element => {
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

    const previousElement = ReactDOM.findDOMNode(pagination).querySelector(
      'li:first-child'
    );
    const nextElement = ReactDOM.findDOMNode(pagination).querySelector(
      'li:last-child'
    );

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll(
      'li:not(.previous):not(.next)'
    );
    elements.forEach(element => {
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

  it('should use ariaLabelBuilder for rendering aria-labels if ariaLabelBuilder is specified', function() {
    const linkedPagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={1}
        pageCount={3}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        ariaLabelBuilder={(page, selected) => selected ? 'Current page' : 'Goto page ' + page } />
    );
    expect(ReactDOM.findDOMNode(linkedPagination).querySelector('li:nth-last-child(2) a')
      .getAttribute('aria-label')).toBe('Goto page 3');
    expect(ReactDOM.findDOMNode(linkedPagination).querySelector('li:nth-child(2) a')
      .getAttribute('aria-label')).toBe('Goto page 1');
    expect(ReactDOM.findDOMNode(linkedPagination).querySelector('.selected a')
      .getAttribute('aria-label')).toBe('Current page');
  });

  it('test ariaLabelBuilder works with extraAriaContext', function() {
    const linkedPagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView
        initialPage={1}
        pageCount={3}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        ariaLabelBuilder={(page, selected) => selected ? 'Current page' : 'Goto page ' + page }
        extraAriaContext="foobar" />
    );
    expect(ReactDOM.findDOMNode(linkedPagination).querySelector('li:nth-last-child(2) a')
      .getAttribute('aria-label')).toBe('Goto page 3 foobar');
    expect(ReactDOM.findDOMNode(linkedPagination).querySelector('li:nth-child(2) a')
      .getAttribute('aria-label')).toBe('Goto page 1 foobar');
    expect(ReactDOM.findDOMNode(linkedPagination).querySelector('.selected a')
      .getAttribute('aria-label')).toBe('Current page');
  });
});

describe('Test default props', () => {
  describe('default previousLabel/nextLabel', () => {
    it('should use the default previousLabel/nextLabel', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView />
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
        <PaginationBoxView />
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
        <PaginationBoxView />
      );
      const nextItem = ReactDOM.findDOMNode(pagination).querySelector(
        'li:last-child a'
      );
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
        <PaginationBoxView />
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
      expect(ReactDOM.findDOMNode(pagination).className).toEqual('');
    });
  });

  describe('default pageClassName/activeClassName', () => {
    it('should not use any classname on page items and a default activeClassName', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView previousClassName="prev" nextClassName="next" />
      );

      const pageItem = ReactDOM.findDOMNode(pagination).querySelector(
        'li:nth-child(3) a'
      );
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
        <PaginationBoxView previousClassName="prev" nextClassName="next" />
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
        <PaginationBoxView initialPage={2} />
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

  describe('default previousLinkClassName/nextLinkClassName', () => {
    it('should not use any classname on previous/next links by default', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView initialPage={2} />
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
    it('should use the default disabledClassName', function() {
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
    it('should not render href attributes on page items if hrefBuilder is not defined', function() {
      const linkedPagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView />
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
        <PaginationBoxView previousClassName="prev" nextClassName="next" />
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
});

describe('Test custom props', () => {
  describe('previousLabel/nextLabel', () => {
    it('should use the previousLabel prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView previousLabel={'Custom previous label'} />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:first-child a')
          .textContent
      ).toBe('Custom previous label');
    });

    it('should use the nextLabel prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView nextLabel={'Custom next label'} />
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
        <PaginationBoxView breakLabel={'...'} />
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
        <PaginationBoxView breakLabel={<span>...</span>} />
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

    it('should use the breakClassName prop when defined', function() {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView breakClassName={'break-me'} />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.break-me')
      ).not.toBe(null);
    });

    it('should use the breakLinkClassName prop when defined', function() {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView breakLinkClassName={'break-link'} />
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
        <PaginationBoxView onPageChange={myOnPageChangeMethod} />
      );
      const nextItem = ReactDOM.findDOMNode(pagination).querySelector(
        'li:last-child a'
      );
      ReactTestUtils.Simulate.click(nextItem);

      expect(myOnPageChangeMethod).toHaveBeenCalledWith({ selected: 1 });
    });
  });

  describe('initialPage', () => {
    it('should use the initialPage prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView initialPage={2} />
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
        <PaginationBoxView forcePage={2} />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('.selected a')
          .textContent
      ).toBe('3');
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
        <PaginationBoxView containerClassName={'my-pagination'} />
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
          pageClassName={'page-item'}
          previousClassName="prev"
          nextClassName="next"
        />
      );

      const pageItem = ReactDOM.findDOMNode(pagination).querySelector(
        'li:nth-child(3) a'
      );
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
          activeClassName="active-page-item"
          previousClassName="prev"
          nextClassName="next"
        />
      );

      const pageItem = ReactDOM.findDOMNode(pagination).querySelector(
        'li:nth-child(3) a'
      );
      ReactTestUtils.Simulate.click(pageItem);

      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:nth-child(3)')
          .className
      ).toBe('active-page-item');
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

      const pageItem = ReactDOM.findDOMNode(pagination).querySelector(
        'li:nth-child(3) a'
      );
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

  describe('previousLinkClassName/nextLinkClassName', () => {
    it('should use the previousLinkClassName prop when defined', () => {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
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
          initialPage={2}
          nextLinkClassName="custom-next-link-classname"
        />
      );
      expect(
        ReactDOM.findDOMNode(pagination).querySelector('li:last-child a')
          .className
      ).toBe('custom-next-link-classname');
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
    it('should use the hrefBuilder prop when defined', function() {
      const pagination = ReactTestUtils.renderIntoDocument(
        <PaginationBoxView
          initialPage={1}
          hrefBuilder={page => '/page/' + page}
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
      ).toBe(null);
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
});
