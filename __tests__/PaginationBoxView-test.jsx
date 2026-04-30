import { fireEvent, render, screen, within } from '@testing-library/react';
import 'core-js/stable';
import PaginationBoxView from '../react_components/PaginationBoxView';

const DEFAULT_PAGE_COUNT = 10;

function hasClass(element, className) {
  return element.classList.contains(className);
}

function getAttribute(element, attr) {
  return element.getAttribute(attr);
}

describe('Test rendering', () => {
  it('should render a pagination component', async () => {
    render(<PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />);

    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();
    expect(pagination.tagName).toEqual('UL');

    const firstLi = within(pagination).getByText('Previous').closest('li');
    const selectedLi = within(pagination).getByText('1').closest('li');
    const lastLi = within(pagination).getByText('Next').closest('li');

    expect(firstLi).toBeDefined();
    expect(selectedLi).toBeDefined();
    expect(hasClass(selectedLi, 'selected')).toBe(true);
    expect(lastLi).toBeDefined();

    const pages = within(pagination).getAllByRole('listitem');
    expect(pages.length).toEqual(9);
  });

  it('test rendering only active page item', async function () {
    render(
      <PaginationBoxView
        pageCount={DEFAULT_PAGE_COUNT}
        initialPage={0}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        breakLabel={null}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const pageItems = within(pagination).getAllByRole('listitem');
    expect(pageItems.length).toBe(3);
  });
});

describe('Page count is zero', () => {
  it('should render Previous / Next if page count is zero (default / when renderOnZeroPageCount is undefined)', async () => {
    render(
      <PaginationBoxView
        pageCount={0}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        breakLabel={null}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();
    const pageItems = within(pagination).getAllByRole('listitem');
    expect(pageItems.length).toBe(2);
  });
  it('should render nothing if page count is zero when renderOnZeroPageCount is null', async () => {
    render(
      <PaginationBoxView
        pageCount={0}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        breakLabel={null}
        renderOnZeroPageCount={null}
      />
    );
    const pagination = screen.queryByRole('navigation');
    expect(pagination).toBeNull();
  });
  it('should render provided Component if page count is zero when renderOnZeroPageCount is not null', async () => {
    render(
      <PaginationBoxView
        pageCount={0}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        breakLabel={null}
        renderOnZeroPageCount={() => <h2 role="note">Nothing</h2>}
      />
    );
    const pagination = await screen.findByRole('note');
    expect(pagination).toBeDefined();
    expect(pagination.textContent).toBe('Nothing');
  });
});

describe('Page count checks', () => {
  it('should trigger a warning when a float is provided', async () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation();
    render(
      <PaginationBoxView
        pageCount={2.5}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        breakLabel={null}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();
    const pageItems = within(pagination).getAllByRole('listitem');
    expect(pageItems.length).toBe(4);
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      '(react-paginate): The pageCount prop value provided is not an integer (2.5). Did you forget a Math.ceil()?'
    );
    consoleWarnMock.mockRestore();
  });

  it('should trigger a warning when the initialPage provided is greater than the maximum page index (from pageCount)', () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation();
    render(<PaginationBoxView pageCount={10} initialPage={10} />);
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      '(react-paginate): The initialPage prop provided is greater than the maximum page index from pageCount prop (10 > 9).'
    );
    consoleWarnMock.mockRestore();
  });

  it('should trigger a warning when the forcePage provided is greater than the maximum page index (from pageCount)', () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation();
    render(<PaginationBoxView pageCount={9} forcePage={9} />);
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      '(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (9 > 8).'
    );
    consoleWarnMock.mockRestore();
  });
});

describe('Test clicks', () => {
  it('test clicks on previous and next buttons', async () => {
    render(<PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />);
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const links = within(pagination).getAllByRole('button');
    let previous = links[0];
    let next = links[links.length - 1];

    fireEvent.click(next);

    const selectedAfterNext = within(pagination).getByText('2').closest('li');
    expect(hasClass(selectedAfterNext, 'selected')).toBe(true);

    fireEvent.click(previous);

    const selectedAfterPrev = within(pagination).getByText('1').closest('li');
    expect(hasClass(selectedAfterPrev, 'selected')).toBe(true);
  });

  it('test click on a page item', async () => {
    render(<PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />);
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const pageItem = within(pagination).getByText('2').closest('li');

    fireEvent.click(pageItem.querySelector('a'));

    const selectedAfterClick = within(pagination).getByText('2').closest('li');
    expect(hasClass(selectedAfterClick, 'selected')).toBe(true);
  });

  it('test click on the left break view', async () => {
    render(
      <PaginationBoxView
        initialPage={0}
        pageCount={22}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const breakLinks = within(pagination)
      .getAllByText('...', { exact: false })
      .map((el) => el.closest('a'))
      .filter(Boolean);
    const rightBreakView = breakLinks[breakLinks.length - 1];

    fireEvent.click(rightBreakView);
    expect(
      hasClass(
        within(pagination).getByText('6', { exact: false }).closest('li'),
        'selected'
      )
    ).toBe(true);

    const breakLinks2 = within(pagination)
      .getAllByText('...', { exact: false })
      .map((el) => el.closest('a'))
      .filter(Boolean);
    const rightBreakView2 = breakLinks2[breakLinks2.length - 1];
    fireEvent.click(rightBreakView2);
    expect(
      hasClass(
        within(pagination).getByText('11', { exact: false }).closest('li'),
        'selected'
      )
    ).toBe(true);

    const breakLinks3 = within(pagination)
      .getAllByText('...', { exact: false })
      .map((el) => el.closest('a'))
      .filter(Boolean);
    fireEvent.click(breakLinks3[0]);
    expect(
      hasClass(
        within(pagination).getByText('6', { exact: false }).closest('li'),
        'selected'
      )
    ).toBe(true);
  });

  it('test click on the right break view', async () => {
    render(
      <PaginationBoxView
        initialPage={10}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const breakLinks = within(pagination)
      .getAllByText('...', { exact: false })
      .map((el) => el.closest('a'))
      .filter(Boolean);

    fireEvent.click(breakLinks[1]);
    expect(
      hasClass(
        within(pagination).getByText('16', { exact: false }).closest('li'),
        'selected'
      )
    ).toBe(true);

    fireEvent.click(breakLinks[0]);
    expect(
      hasClass(
        within(pagination).getByText('11', { exact: false }).closest('li'),
        'selected'
      )
    ).toBe(true);
  });
});

describe('Test custom event listener', () => {
  it('test custom listener on previous and next buttons', async () => {
    render(
      <PaginationBoxView
        pageCount={DEFAULT_PAGE_COUNT}
        eventListener="onMouseOver"
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const buttons = within(pagination).getAllByRole('button');
    let previous = buttons[0];
    let next = buttons[buttons.length - 1];

    fireEvent.mouseOver(next);

    expect(
      hasClass(within(pagination).getByText('2').closest('li'), 'selected')
    ).toBe(true);

    fireEvent.mouseOver(previous);

    expect(
      hasClass(within(pagination).getByText('1').closest('li'), 'selected')
    ).toBe(true);
  });

  it('test custom listener on a page item', async () => {
    render(
      <PaginationBoxView
        pageCount={DEFAULT_PAGE_COUNT}
        eventListener="onMouseOver"
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const pageItem = within(pagination).getByText('2').closest('li');

    fireEvent.mouseOver(pageItem.querySelector('a'));

    expect(
      hasClass(within(pagination).getByText('2').closest('li'), 'selected')
    ).toBe(true);
  });

  it('test custom listener on the left break view', async () => {
    render(
      <PaginationBoxView
        initialPage={0}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        eventListener="onMouseOver"
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    // Get break links - when initialPage=0, there are 2 breaks
    const breakLinks = within(pagination)
      .getAllByText('...', { exact: false })
      .map((el) => el.closest('a'))
      .filter(Boolean);
    const rightBreak = breakLinks[breakLinks.length - 1];

    // Mouseover on right break from page 0 -> page 6
    fireEvent.mouseOver(rightBreak);
    let listitems = within(pagination).getAllByRole('listitem');
    let selectedItem = listitems.find((li) => hasClass(li, 'selected'));
    expect(selectedItem.textContent).toBe('6');

    // Mouseover on right break again -> page 11
    fireEvent.mouseOver(rightBreak);
    listitems = within(pagination).getAllByRole('listitem');
    selectedItem = listitems.find((li) => hasClass(li, 'selected'));
    expect(selectedItem.textContent).toBe('6');
  });
});

describe('Test pagination behaviour', () => {
  it('should display 2 elements to the left, 1 break element and 2 elements to the right', async () => {
    render(
      <PaginationBoxView
        initialPage={0}
        pageCount={20}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const listitems = within(pagination).getAllByRole('listitem');
    const previousElement = listitems[0];
    const nextElement = listitems[listitems.length - 1];

    const nonNavListitems = listitems.filter(
      (li) => !hasClass(li, 'previous') && !hasClass(li, 'next')
    );

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    nonNavListitems.forEach((element) => {
      if (breakElementReached === false && !hasClass(element, 'break')) {
        leftElements.push(element);
      } else if (breakElementReached === true && !hasClass(element, 'break')) {
        rightElements.push(element);
      } else {
        breakElements.push(element);
        breakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous disabled');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(2);
    expect(rightElements.length).toBe(1);
    expect(breakElements.length).toBe(1);
  });

  it('should display 5 elements to the left, 1 break element and 2 elements to the right', async () => {
    render(
      <PaginationBoxView
        initialPage={0}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const listitems = within(pagination).getAllByRole('listitem');
    const previousElement = listitems[0];
    const nextElement = listitems[listitems.length - 1];

    const nonNavListitems = listitems.filter(
      (li) => !hasClass(li, 'previous') && !hasClass(li, 'next')
    );

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    nonNavListitems.forEach((element) => {
      if (breakElementReached === false && !hasClass(element, 'break')) {
        leftElements.push(element);
      } else if (breakElementReached === true && !hasClass(element, 'break')) {
        rightElements.push(element);
      } else {
        breakElements.push(element);
        breakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous disabled');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(5);
    expect(rightElements.length).toBe(2);
    expect(breakElements.length).toBe(1);
  });

  it('should display 7 elements to the left, 1 break element and 2 elements to the right', async () => {
    render(
      <PaginationBoxView
        initialPage={4}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const listitems = within(pagination).getAllByRole('listitem');
    const previousElement = listitems[0];
    const nextElement = listitems[listitems.length - 1];

    const nonNavListitems = listitems.filter(
      (li) => !hasClass(li, 'previous') && !hasClass(li, 'next')
    );

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    nonNavListitems.forEach((element) => {
      if (breakElementReached === false && !hasClass(element, 'break')) {
        leftElements.push(element);
      } else if (breakElementReached === true && !hasClass(element, 'break')) {
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

  it('should display 2 elements to the left, 5 elements in the middle, 2 elements to the right and 2 break elements', async () => {
    render(
      <PaginationBoxView
        initialPage={7}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const listitems = within(pagination).getAllByRole('listitem');
    const previousElement = listitems[0];
    const nextElement = listitems[listitems.length - 1];

    const nonNavListitems = listitems.filter(
      (li) => !hasClass(li, 'previous') && !hasClass(li, 'next')
    );

    let leftElements = [];
    let middleElements = [];
    let rightElements = [];
    let breakElements = [];
    let leftBreakElementReached = false;
    let rightBreakElementReached = false;

    nonNavListitems.forEach((element) => {
      if (
        leftBreakElementReached === false &&
        rightBreakElementReached === false &&
        !hasClass(element, 'break')
      ) {
        leftElements.push(element);
      } else if (
        leftBreakElementReached === true &&
        rightBreakElementReached === false &&
        !hasClass(element, 'break')
      ) {
        middleElements.push(element);
      } else if (
        leftBreakElementReached === true &&
        rightBreakElementReached === true &&
        !hasClass(element, 'break')
      ) {
        rightElements.push(element);
      } else if (breakElements.length === 0 && hasClass(element, 'break')) {
        breakElements.push(element);
        leftBreakElementReached = true;
      } else if (breakElements.length === 1 && hasClass(element, 'break')) {
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

  it('should display 2 elements to the left, 1 break element and 7 elements to the right', async () => {
    render(
      <PaginationBoxView
        initialPage={15}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const listitems = within(pagination).getAllByRole('listitem');
    const previousElement = listitems[0];
    const nextElement = listitems[listitems.length - 1];

    const nonNavListitems = listitems.filter(
      (li) => !hasClass(li, 'previous') && !hasClass(li, 'next')
    );

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    nonNavListitems.forEach((element) => {
      if (breakElementReached === false && !hasClass(element, 'break')) {
        leftElements.push(element);
      } else if (breakElementReached === true && !hasClass(element, 'break')) {
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

  it('should display 2 elements to the left, 1 break element and 6 elements to the right', async () => {
    render(
      <PaginationBoxView
        initialPage={16}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const listitems = within(pagination).getAllByRole('listitem');
    const previousElement = listitems[0];
    const nextElement = listitems[listitems.length - 1];

    const nonNavListitems = listitems.filter(
      (li) => !hasClass(li, 'previous') && !hasClass(li, 'next')
    );

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    nonNavListitems.forEach((element) => {
      if (breakElementReached === false && !hasClass(element, 'break')) {
        leftElements.push(element);
      } else if (breakElementReached === true && !hasClass(element, 'break')) {
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

  it('should not display a break containing only one page', async () => {
    render(
      <PaginationBoxView
        initialPage={5}
        pageCount={10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const listitems = within(pagination).getAllByRole('listitem');
    const previousElement = listitems[0];
    const nextElement = listitems[listitems.length - 1];

    const nonNavListitems = listitems.filter(
      (li) => !hasClass(li, 'previous') && !hasClass(li, 'next')
    );

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    nonNavListitems.forEach((element) => {
      if (breakElementReached === false && !hasClass(element, 'break')) {
        leftElements.push(element);
      } else if (breakElementReached === true && !hasClass(element, 'break')) {
        rightElements.push(element);
      } else {
        breakElements.push(element);
        breakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(10);
    expect(rightElements.length).toBe(0);
    expect(breakElements.length).toBe(0);
  });

  it('should use ariaLabelBuilder for rendering aria-labels if ariaLabelBuilder is specified', async function () {
    render(
      <PaginationBoxView
        initialPage={1}
        pageCount={3}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        ariaLabelBuilder={(page, selected) =>
          selected ? 'Current page' : 'Goto page ' + page
        }
      />
    );
    const linkedPagination = await screen.findByRole('navigation');
    expect(linkedPagination).toBeDefined();

    const listitems = within(linkedPagination).getAllByRole('listitem');
    const lastPageLink = listitems[listitems.length - 2].querySelector('a');
    expect(getAttribute(lastPageLink, 'aria-label')).toBe('Goto page 3');

    const firstPageLink = listitems[1].querySelector('a');
    expect(getAttribute(firstPageLink, 'aria-label')).toBe('Goto page 1');

    const selectedLink = within(linkedPagination).getByText('2').closest('a');
    expect(getAttribute(selectedLink, 'aria-label')).toBe('Current page');
  });

  it('test ariaLabelBuilder works with extraAriaContext', async function () {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation();
    render(
      <PaginationBoxView
        initialPage={1}
        pageCount={3}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        ariaLabelBuilder={(page, selected) =>
          selected ? 'Current page' : 'Goto page ' + page
        }
        extraAriaContext="foobar"
      />
    );
    const linkedPagination = await screen.findByRole('navigation');
    expect(linkedPagination).toBeDefined();

    const listitems = within(linkedPagination).getAllByRole('listitem');
    const lastPageLink = listitems[listitems.length - 2].querySelector('a');
    expect(getAttribute(lastPageLink, 'aria-label')).toBe('Goto page 3 foobar');

    const firstPageLink = listitems[1].querySelector('a');
    expect(getAttribute(firstPageLink, 'aria-label')).toBe(
      'Goto page 1 foobar'
    );

    const selectedLink = within(linkedPagination).getByText('2').closest('a');
    expect(getAttribute(selectedLink, 'aria-label')).toBe('Current page');

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      'DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead.'
    );
    consoleWarnMock.mockRestore();
  });

  it('should provide default forward aria-label for the break if breakAriaLabels is not provided and index is before the break', async () => {
    render(
      <PaginationBoxView
        initialPage={0}
        pageCount={22}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const breakLink = within(pagination).getByText('...').closest('a');
    expect(getAttribute(breakLink, 'aria-label')).toBe('Jump forward');
  });

  it('should provide default backward aria-label for the break if breakAriaLabels is not provided and index is after the break', async () => {
    render(
      <PaginationBoxView
        initialPage={21}
        pageCount={22}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const breakLink = within(pagination).getByText('...').closest('a');
    expect(getAttribute(breakLink, 'aria-label')).toBe('Jump backward');
  });

  it('should provide given forward aria-label for the break if breakAriaLabels is provided and index is before the break', async () => {
    render(
      <PaginationBoxView
        initialPage={0}
        pageCount={22}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        breakAriaLabels={{
          forward: 'Skip forward',
          backward: 'Skip backward',
        }}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const breakLink = within(pagination).getByText('...').closest('a');
    expect(getAttribute(breakLink, 'aria-label')).toBe('Skip forward');
  });

  it('should provide given backward aria-label for the break if breakAriaLabels is provided and index is after the break', async () => {
    render(
      <PaginationBoxView
        initialPage={21}
        pageCount={22}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        breakAriaLabels={{
          forward: 'Skip forward',
          backward: 'Skip backward',
        }}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const breakLink = within(pagination).getByText('...').closest('a');
    expect(getAttribute(breakLink, 'aria-label')).toBe('Skip backward');
  });
});

describe('Test default props', () => {
  describe('default previousLabel/nextLabel', () => {
    it('should use the default previousLabel/nextLabel', async () => {
      render(<PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />);
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const firstLi = within(pagination).getByText('Previous').closest('li');
      const lastLi = within(pagination).getByText('Next').closest('li');

      expect(firstLi).toBeDefined();
      expect(lastLi).toBeDefined();
    });
  });

  describe('default breakLabel/breakClassName/breakLinkClassName', () => {
    it('should use the default breakLabel/breakClassName/breakLinkClassName', async () => {
      render(<PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />);
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const breakLi = within(pagination).getByText('...').closest('li');
      expect(hasClass(breakLi, 'break')).toBe(true);
      const breakLink = within(pagination).getByText('...').closest('a');
      expect(breakLink.className).toBe('');
    });
  });

  describe('default onPageChange', () => {
    it('should not call any onPageChange callback if not defined but it should go to the next page', async () => {
      render(<PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />);
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const nextItem = within(pagination).getByText('Next').closest('a');
      fireEvent.click(nextItem);

      expect(
        hasClass(within(pagination).getByText('2').closest('li'), 'selected')
      ).toBe(true);
    });
  });

  describe('default initialPage/forcePage', () => {
    it('should use the default initial selected page (0)', async () => {
      render(<PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />);
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();
      expect(
        hasClass(within(pagination).getByText('1').closest('li'), 'selected')
      ).toBe(true);
    });
  });

  describe('default disableInitialCallback', () => {
    it('should call the onPageChange callback when disableInitialCallback is set to false/undefined', () => {
      const myOnPageChangeMethod = vi.fn();
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={5}
          onPageChange={myOnPageChangeMethod}
        />
      );
      expect(myOnPageChangeMethod).toHaveBeenCalledWith({ selected: 5 });
    });
  });

  describe('default containerClassName', () => {
    it('should not use any classname on the container by default', async () => {
      render(<PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />);
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();
      expect(pagination.className).toEqual('');
    });
  });

  describe('default pageClassName/activeClassName', () => {
    it('should not use any classname on page items and a default activeClassName', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          previousClassName="prev"
          nextClassName="next"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const pageItem = within(pagination).getByText('2').closest('li');
      fireEvent.click(pageItem.querySelector('a'));

      const nonSelectedItems = within(pagination)
        .getAllByRole('listitem')
        .filter(
          (li) =>
            !hasClass(li, 'selected') &&
            !hasClass(li, 'prev') &&
            !hasClass(li, 'next')
        );
      expect(nonSelectedItems[0].className).toBe('');
      expect(hasClass(pageItem, 'selected')).toBe(true);
    });
  });

  describe('default pageLinkClassName/activeLinkClassName', () => {
    it('should not use any classname on selected links by default', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          previousClassName="prev"
          nextClassName="next"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const nonSelectedItems = within(pagination)
        .getAllByRole('listitem')
        .filter(
          (li) =>
            !hasClass(li, 'selected') &&
            !hasClass(li, 'prev') &&
            !hasClass(li, 'next')
        );
      expect(nonSelectedItems[0].querySelector('a').className).toBe('');
      expect(within(pagination).getByText('1').closest('a').className).toBe('');
    });
  });

  describe('default previousClassName/nextClassName', () => {
    it('should use the default previousClassName/nextClassName', async () => {
      render(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} initialPage={2} />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const firstLi = within(pagination).getByText('Previous').closest('li');
      const lastLi = within(pagination).getByText('Next').closest('li');

      expect(hasClass(firstLi, 'previous')).toBe(true);
      expect(hasClass(lastLi, 'next')).toBe(true);
    });
  });

  describe('default previousLinkClassName/nextLinkClassName/disabledLinkClassName', () => {
    it('should not use any classname on previous/next links by default', async () => {
      render(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} initialPage={2} />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const firstLink = within(pagination).getByText('Previous');
      const lastLink = within(pagination).getByText('Next');

      expect(firstLink.className).toBe('');
      expect(lastLink.className).toBe('');
    });
  });

  describe('default disabledClassName', () => {
    it('should use the default disabledClassName', async function () {
      render(<PaginationBoxView initialPage={0} pageCount={1} />);
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const firstLi = within(pagination).getByText('Previous').closest('li');
      const lastLi = within(pagination).getByText('Next').closest('li');

      expect(hasClass(firstLi, 'previous')).toBe(true);
      expect(hasClass(firstLi, 'disabled')).toBe(true);
      expect(hasClass(lastLi, 'next')).toBe(true);
      expect(hasClass(lastLi, 'disabled')).toBe(true);
    });
  });

  describe('default hrefBuilder', () => {
    it('should not render href attributes on page items if hrefBuilder is not defined', async function () {
      render(<PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} />);
      const linkedPagination = await screen.findByRole('navigation');
      expect(linkedPagination).toBeDefined();

      const lastLink = within(linkedPagination).getByText('Next').closest('a');
      const firstLink = within(linkedPagination)
        .getByText('Previous')
        .closest('a');
      const selectedLink = within(linkedPagination).getByText('1').closest('a');

      expect(lastLink.hasAttribute('href')).toBe(false);
      expect(firstLink.hasAttribute('href')).toBe(false);
      expect(selectedLink.hasAttribute('href')).toBe(false);
    });
  });

  describe('default extraAriaContext', () => {
    it('should use the default extraAriaContext', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          previousClassName="prev"
          nextClassName="next"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const nonSelectedItems = within(pagination)
        .getAllByRole('listitem')
        .filter(
          (li) =>
            !hasClass(li, 'selected') &&
            !hasClass(li, 'prev') &&
            !hasClass(li, 'next')
        );
      expect(
        getAttribute(nonSelectedItems[0].querySelector('a'), 'aria-label')
      ).toBe('Page 2');
      expect(
        getAttribute(
          within(pagination).getByText('1').closest('a'),
          'aria-label'
        )
      ).toBe('Page 1 is your current page');
    });
  });

  describe('default tabindex', () => {
    it('should set the tabindex to 0 on all controls', async () => {
      render(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} initialPage={0} />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const listitems = within(pagination).getAllByRole('listitem');
      const thirdLink = listitems[2].querySelector('a');
      const selectedLink = within(pagination).getByText('1').closest('a');
      const firstLink = within(pagination).getByText('Previous').closest('a');
      const lastLink = within(pagination).getByText('Next').closest('a');

      expect(getAttribute(thirdLink, 'tabindex')).toBe('0');
      expect(getAttribute(selectedLink, 'tabindex')).toBe('-1');
      expect(getAttribute(firstLink, 'tabindex')).toBe('-1');
      expect(getAttribute(lastLink, 'tabindex')).toBe('0');
    });
  });
});

describe('Test custom props', () => {
  describe('previousLabel/nextLabel', () => {
    it('should use the previousLabel prop when defined', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          previousLabel={'Custom previous label'}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();
      expect(
        within(pagination).getByText('Custom previous label')
      ).toBeDefined();
    });

    it('should use the nextLabel prop when defined', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          nextLabel={'Custom next label'}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();
      expect(within(pagination).getByText('Custom next label')).toBeDefined();
    });
  });

  describe('breakLabel/breakClassName/breakLinkClassName', () => {
    it('should use the breakLabel string prop when defined', async () => {
      render(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} breakLabel={'...'} />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const breakLi = within(pagination).getByText('...').closest('li');
      expect(breakLi.firstChild.nodeType).toBe(Node.ELEMENT_NODE);
      expect(breakLi.firstChild.nodeName).toBe('A');
      expect(breakLi.firstChild.textContent).toBe('...');
    });

    it('should use the breakLabel node prop when defined', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          breakLabel={<span>...</span>}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const breakLink = within(pagination).getByText('...').closest('a');
      expect(breakLink.firstChild.nodeName).toBe('SPAN');
      expect(breakLink.lastChild.textContent).toBe('...');
    });

    it('should use the breakClassName prop when defined', async function () {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          breakClassName={'break-me'}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();
      expect(
        hasClass(within(pagination).getByText('...').closest('li'), 'break-me')
      ).toBe(true);
    });

    it('should use the breakLinkClassName prop when defined', async function () {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          breakLinkClassName={'break-link'}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();
      expect(
        hasClass(within(pagination).getByText('...').closest('a'), 'break-link')
      ).toBe(true);
    });
  });

  describe('onPageChange', () => {
    it('should use the onPageChange prop when defined', async () => {
      const myOnPageChangeMethod = vi.fn();
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          onPageChange={myOnPageChangeMethod}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const nextItem = within(pagination).getByText('Next').closest('a');
      fireEvent.click(nextItem);

      expect(myOnPageChangeMethod).toHaveBeenCalledWith({ selected: 1 });
    });
  });

  describe('onPageActive', () => {
    it('should use the onPageActive prop when defined', async () => {
      const myOnPageActiveMethod = vi.fn();
      const myOnPageChangeMethod = vi.fn();
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          onPageActive={myOnPageActiveMethod}
          onPageChange={myOnPageChangeMethod}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const activeItem = within(pagination).getByText('1').closest('a');
      fireEvent.click(activeItem);

      expect(myOnPageActiveMethod).toHaveBeenCalledWith({ selected: 0 });
      expect(myOnPageChangeMethod).not.toHaveBeenCalled();
    });
  });

  describe('initialPage', () => {
    it('should use the initialPage prop when defined', async () => {
      render(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} initialPage={2} />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();
      expect(
        hasClass(within(pagination).getByText('3').closest('li'), 'selected')
      ).toBe(true);
    });
  });

  describe('forcePage', () => {
    it('should use the forcePage prop when defined', async () => {
      render(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} forcePage={2} />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();
      expect(
        hasClass(within(pagination).getByText('3').closest('li'), 'selected')
      ).toBe(true);
    });

    it('should report a warning when using both initialPage and forcePage props', async () => {
      const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation();
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={3}
          forcePage={2}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();
      expect(
        hasClass(within(pagination).getByText('4').closest('li'), 'selected')
      ).toBe(true);
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenLastCalledWith(
        '(react-paginate): Both initialPage (3) and forcePage (2) props are provided, which is discouraged.' +
          ' Use exclusively forcePage prop for a controlled component.\n' +
          'See https://reactjs.org/docs/forms.html#controlled-components'
      );
      consoleWarnMock.mockRestore();
    });

    it('(observation) is not totally controlled when forcePage is provided', async () => {
      render(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} forcePage={2} />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      expect(
        hasClass(within(pagination).getByText('3').closest('li'), 'selected')
      ).toBe(true);

      const pageItem = within(pagination).getByText('2').closest('li');
      fireEvent.click(pageItem.querySelector('a'));

      expect(
        hasClass(within(pagination).getByText('2').closest('li'), 'selected')
      ).toBe(true);
    });

    it('(observation) is not totally controlled when forcePage is provided, even when it is 0', async () => {
      render(
        <PaginationBoxView pageCount={DEFAULT_PAGE_COUNT} forcePage={0} />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      expect(
        hasClass(within(pagination).getByText('1').closest('li'), 'selected')
      ).toBe(true);

      const pageItem = within(pagination).getByText('2').closest('li');
      fireEvent.click(pageItem.querySelector('a'));

      expect(
        hasClass(within(pagination).getByText('2').closest('li'), 'selected')
      ).toBe(true);
    });
  });

  describe('disableInitialCallback', () => {
    it('should not call the onPageChange callback when disableInitialCallback is set to true', () => {
      const myOnPageChangeMethod = vi.fn();
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={5}
          disableInitialCallback={true}
          onPageChange={myOnPageChangeMethod}
        />
      );
      expect(myOnPageChangeMethod).not.toHaveBeenCalled();
    });
  });

  describe('containerClassName', () => {
    it('should use the containerClassName prop when defined', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          containerClassName="my-pagination"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();
      expect(pagination.className).toEqual('my-pagination');
    });

    it('should use the className prop when defined', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          className="my-pagination"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();
      expect(pagination.className).toEqual('my-pagination');
    });

    it('should use the className prop in priority from containerClassName', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          className="my-pagination"
          containerClassName="another"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();
      expect(pagination.className).toEqual('my-pagination');
    });
  });

  describe('pageClassName/activeClassName', () => {
    it('should use the pageClassName prop when defined', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          pageClassName={'page-item'}
          previousClassName="prev"
          nextClassName="next"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const pageItem = within(pagination).getByText('2').closest('li');
      fireEvent.click(pageItem.querySelector('a'));

      const nonSelectedItems = within(pagination)
        .getAllByRole('listitem')
        .filter(
          (li) =>
            !hasClass(li, 'selected') &&
            !hasClass(li, 'prev') &&
            !hasClass(li, 'next')
        );
      expect(nonSelectedItems[0].className).toBe('page-item');
      expect(pageItem.className).toBe('page-item selected');
    });

    it('should use the activeClassName prop when defined', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          activeClassName="active-page-item"
          previousClassName="prev"
          nextClassName="next"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const pageItem = within(pagination).getByText('2').closest('li');
      fireEvent.click(pageItem.querySelector('a'));

      expect(hasClass(pageItem, 'active-page-item')).toBe(true);
    });

    it('should use the activeClassName prop without overriding the defined pageClassName', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          pageClassName="page-item"
          activeClassName="active-page-item"
          previousClassName="prev"
          nextClassName="next"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const pageItem = within(pagination).getByText('2').closest('li');
      fireEvent.click(pageItem.querySelector('a'));

      const nonSelectedItems = within(pagination)
        .getAllByRole('listitem')
        .filter(
          (li) =>
            !hasClass(li, 'selected') &&
            !hasClass(li, 'prev') &&
            !hasClass(li, 'next')
        );
      expect(nonSelectedItems[0].className).toBe('page-item');
      expect(pageItem.className).toBe('page-item active-page-item');
    });
  });

  describe('pageLinkClassName/activeLinkClassName', () => {
    it('should use the pageLinkClassName prop when defined', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          pageLinkClassName="page-item-link"
          previousClassName="prev"
          nextClassName="next"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const nonSelectedItems = within(pagination)
        .getAllByRole('listitem')
        .filter(
          (li) =>
            !hasClass(li, 'selected') &&
            !hasClass(li, 'prev') &&
            !hasClass(li, 'next')
        );
      expect(nonSelectedItems[0].querySelector('a').className).toBe(
        'page-item-link'
      );
      expect(within(pagination).getByText('1').closest('a').className).toBe(
        'page-item-link'
      );
    });

    it('should use the activeLinkClassName prop when defined', async () => {
      render(
        <PaginationBoxView
          activeLinkClassName="active-page-item-link"
          pageCount={5}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();
      expect(within(pagination).getByText('1').closest('a').className).toBe(
        'active-page-item-link'
      );
    });

    it('should use the activeLinkClassName prop without overriding the defined pageLinkClassName', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          pageLinkClassName="page-item-link"
          activeLinkClassName="active-page-item-link"
          previousClassName="prev"
          nextClassName="next"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const nonSelectedItems = within(pagination)
        .getAllByRole('listitem')
        .filter(
          (li) =>
            !hasClass(li, 'selected') &&
            !hasClass(li, 'prev') &&
            !hasClass(li, 'next')
        );
      expect(nonSelectedItems[0].querySelector('a').className).toBe(
        'page-item-link'
      );
      expect(within(pagination).getByText('1').closest('a').className).toBe(
        'page-item-link active-page-item-link'
      );
    });
  });

  describe('previousClassName/nextClassName', () => {
    it('should use the previousClassName prop when defined', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={2}
          previousClassName="custom-previous-classname"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const firstLi = within(pagination).getByText('Previous').closest('li');
      expect(hasClass(firstLi, 'custom-previous-classname')).toBe(true);
    });

    it('should use the nextClassName prop when defined', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={2}
          nextClassName="custom-next-classname"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const lastLi = within(pagination).getByText('Next').closest('li');
      expect(hasClass(lastLi, 'custom-next-classname')).toBe(true);
    });
  });

  describe('previousLinkClassName/nextLinkClassName/disabledLinkClassName', () => {
    it('should use the previousLinkClassName prop when defined', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={2}
          previousLinkClassName="custom-previous-link-classname"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const firstLink = within(pagination).getByText('Previous');
      expect(firstLink.className).toBe('custom-previous-link-classname');
    });

    it('should use the nextLinkClassName prop when defined', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={2}
          nextLinkClassName="custom-next-link-classname"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const lastLink = within(pagination).getByText('Next');
      expect(lastLink.className).toBe('custom-next-link-classname');
    });

    it('should use the disabledLinkClassName prop when defined', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={0}
          disabledLinkClassName="custom-disabled-link-classname"
        />
      );
      const paginationFirst = await screen.findByRole('navigation');
      expect(paginationFirst).toBeDefined();

      const firstLink = within(paginationFirst).getByText('Previous');
      const lastLink = within(paginationFirst).getByText('Next');

      expect(firstLink.className).toBe(' custom-disabled-link-classname');
      expect(lastLink.className).toBe('');

      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={9}
          disabledLinkClassName="custom-disabled-link-classname"
        />
      );
      const paginationLast = (await screen.findAllByRole('navigation'))[1];
      expect(paginationLast).toBeDefined();

      const firstLinkLast = within(paginationLast).getByText('Previous');
      const lastLinkLast = within(paginationLast).getByText('Next');

      expect(firstLinkLast.className).toBe('');
      expect(lastLinkLast.className).toBe(' custom-disabled-link-classname');
    });

    it('should combines the previousLinkClassName and disabledLinkClassName props', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={0}
          previousLinkClassName="custom-previous-link-classname"
          nextLinkClassName="custom-next-link-classname"
          disabledLinkClassName="custom-disabled-link-classname"
        />
      );
      const paginationFirst = await screen.findByRole('navigation');
      expect(paginationFirst).toBeDefined();

      const firstLink = within(paginationFirst).getByText('Previous');
      const lastLink = within(paginationFirst).getByText('Next');

      expect(firstLink.className).toBe(
        'custom-previous-link-classname custom-disabled-link-classname'
      );
      expect(lastLink.className).toBe('custom-next-link-classname');
    });

    it('should combines the nextLinkClassName and disabledLinkClassName props', async () => {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={9}
          previousLinkClassName="custom-previous-link-classname"
          nextLinkClassName="custom-next-link-classname"
          disabledLinkClassName="custom-disabled-link-classname"
        />
      );
      const paginationFirst = await screen.findByRole('navigation');
      expect(paginationFirst).toBeDefined();

      const firstLink = within(paginationFirst).getByText('Previous');
      const lastLink = within(paginationFirst).getByText('Next');

      expect(firstLink.className).toBe('custom-previous-link-classname');
      expect(lastLink.className).toBe(
        'custom-next-link-classname custom-disabled-link-classname'
      );
    });
  });

  describe('prevRel/nextRel', () => {
    it('should render default rel if they are not specified', async function () {
      render(<PaginationBoxView pageCount={3} />);
      const linkedPagination = await screen.findByRole('navigation');
      expect(linkedPagination).toBeDefined();

      const listitems = within(linkedPagination).getAllByRole('listitem');
      const lastLink = listitems[listitems.length - 1].querySelector('a');
      const firstLink = listitems[0].querySelector('a');

      expect(getAttribute(lastLink, 'rel')).toBe('next');
      expect(getAttribute(firstLink, 'rel')).toBe('prev');
    });

    it('should render custom rel if they are defined', async function () {
      render(
        <PaginationBoxView
          pageCount={3}
          nextRel={'nofollow noreferrer'}
          prevRel={'nofollow noreferrer'}
        />
      );
      const linkedPagination = await screen.findByRole('navigation');
      expect(linkedPagination).toBeDefined();

      const listitems = within(linkedPagination).getAllByRole('listitem');
      const lastLink = listitems[listitems.length - 1].querySelector('a');
      const firstLink = listitems[0].querySelector('a');

      expect(getAttribute(lastLink, 'rel')).toBe('nofollow noreferrer');
      expect(getAttribute(firstLink, 'rel')).toBe('nofollow noreferrer');
    });
  });

  describe('disabledClassName', () => {
    it('should use the disabledClassName prop when defined', async () => {
      render(
        <PaginationBoxView
          initialPage={0}
          pageCount={1}
          disabledClassName="custom-disabled-classname"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const firstLi = within(pagination).getByText('Previous').closest('li');
      const lastLi = within(pagination).getByText('Next').closest('li');

      expect(hasClass(firstLi, 'previous')).toBe(true);
      expect(hasClass(firstLi, 'custom-disabled-classname')).toBe(true);
      expect(hasClass(lastLi, 'next')).toBe(true);
      expect(hasClass(lastLi, 'custom-disabled-classname')).toBe(true);
    });
  });

  describe('hrefBuilder', () => {
    it('should use the hrefBuilder prop when defined', async function () {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={1}
          hrefBuilder={(page) => '/page/' + page}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const listitems = within(pagination).getAllByRole('listitem');
      const lastLink = listitems[listitems.length - 1].querySelector('a');
      const firstLink = listitems[0].querySelector('a');
      const selectedLink = within(pagination).getByText('2').closest('a');

      expect(getAttribute(lastLink, 'href')).toBe('/page/3');
      expect(getAttribute(firstLink, 'href')).toBe('/page/1');
      expect(getAttribute(selectedLink, 'href')).toBe('/page/2');
    });

    it('should not add href to disabled next / previous buttons', async function () {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={0}
          hrefBuilder={(page) => '/page/' + page}
        />
      );
      const paginationFirst = await screen.findByRole('navigation');
      expect(paginationFirst).toBeDefined();

      const listitems = within(paginationFirst).getAllByRole('listitem');
      const lastLink = listitems[listitems.length - 1].querySelector('a');
      const firstLink = listitems[0].querySelector('a');
      const selectedLink = within(paginationFirst).getByText('1').closest('a');

      expect(getAttribute(lastLink, 'href')).toBe('/page/2');
      expect(getAttribute(firstLink, 'href')).toBe(null);
      expect(getAttribute(selectedLink, 'href')).toBe('/page/1');

      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={DEFAULT_PAGE_COUNT - 1}
          hrefBuilder={(page) => '/page/' + page}
        />
      );
      const paginationLast = (await screen.findAllByRole('navigation'))[1];
      expect(paginationLast).toBeDefined();

      const listitemsLast = within(paginationLast).getAllByRole('listitem');
      const lastLinkLast =
        listitemsLast[listitemsLast.length - 1].querySelector('a');
      const firstLinkLast = listitemsLast[0].querySelector('a');
      const selectedLinkLast = within(paginationLast)
        .getByText('10')
        .closest('a');

      expect(getAttribute(lastLinkLast, 'href')).toBe(null);
      expect(getAttribute(firstLinkLast, 'href')).toBe('/page/9');
      expect(getAttribute(selectedLinkLast, 'href')).toBe('/page/10');
    });

    it('should add href to all controls when hrefAllControls is set to true', async function () {
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={0}
          hrefBuilder={(page, pageCount) =>
            page >= 1 && page <= pageCount ? `/page/${page}` : '#'
          }
          hrefAllControls
        />
      );
      const paginationFirst = await screen.findByRole('navigation');
      expect(paginationFirst).toBeDefined();

      const listitems = within(paginationFirst).getAllByRole('listitem');
      const lastLink = listitems[listitems.length - 1].querySelector('a');
      const firstLink = listitems[0].querySelector('a');
      const selectedLink = within(paginationFirst).getByText('1').closest('a');

      expect(getAttribute(lastLink, 'href')).toBe('/page/2');
      expect(getAttribute(firstLink, 'href')).toBe('#');
      expect(getAttribute(selectedLink, 'href')).toBe('/page/1');

      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          initialPage={DEFAULT_PAGE_COUNT - 1}
          hrefBuilder={(page) => '/page/' + page}
        />
      );
      const paginationLast = (await screen.findAllByRole('navigation'))[1];
      expect(paginationLast).toBeDefined();

      const listitemsLast = within(paginationLast).getAllByRole('listitem');
      const lastLinkLast =
        listitemsLast[listitemsLast.length - 1].querySelector('a');
      const firstLinkLast = listitemsLast[0].querySelector('a');
      const selectedLinkLast = within(paginationLast)
        .getByText('10')
        .closest('a');

      expect(getAttribute(lastLinkLast, 'href')).toBe(null);
      expect(getAttribute(firstLinkLast, 'href')).toBe('/page/9');
      expect(getAttribute(selectedLinkLast, 'href')).toBe('/page/10');
    });
  });

  describe('extraAriaContext', () => {
    it('should use the extraAriaContext prop when defined', async () => {
      const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation();
      render(
        <PaginationBoxView
          pageCount={DEFAULT_PAGE_COUNT}
          extraAriaContext="can be clicked"
          previousClassName="prev"
          nextClassName="next"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const nonSelectedItems = within(pagination)
        .getAllByRole('listitem')
        .filter(
          (li) =>
            !hasClass(li, 'selected') &&
            !hasClass(li, 'prev') &&
            !hasClass(li, 'next')
        );
      expect(
        getAttribute(nonSelectedItems[0].querySelector('a'), 'aria-label')
      ).toBe('Page 2 can be clicked');
      expect(
        getAttribute(
          within(pagination).getByText('1').closest('a'),
          'aria-label'
        )
      ).toBe('Page 1 is your current page');
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenLastCalledWith(
        'DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead.'
      );
      consoleWarnMock.mockRestore();
    });
  });

  describe('aria-disabled', () => {
    it('should be true for previous link when link is disabled', async () => {
      render(<PaginationBoxView initialPage={0} pageCount={5} />);
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const firstLink = within(pagination).getByText('Previous');
      const lastLink = within(pagination).getByText('Next');

      expect(getAttribute(firstLink, 'aria-disabled')).toBe('true');
      expect(getAttribute(lastLink, 'aria-disabled')).toBe('false');
    });

    it('should be true for next link when link is disabled', async () => {
      render(<PaginationBoxView initialPage={4} pageCount={5} />);
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const firstLink = within(pagination).getByText('Previous');
      const lastLink = within(pagination).getByText('Next');

      expect(getAttribute(firstLink, 'aria-disabled')).toBe('false');
      expect(getAttribute(lastLink, 'aria-disabled')).toBe('true');
    });
  });

  it('should be true for both previous and next links when only one page', async () => {
    render(<PaginationBoxView initialPage={0} pageCount={1} />);
    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeDefined();

    const firstLink = within(pagination).getByText('Previous');
    const lastLink = within(pagination).getByText('Next');

    expect(getAttribute(firstLink, 'aria-disabled')).toBe('true');
    expect(getAttribute(lastLink, 'aria-disabled')).toBe('true');
  });

  it('should render default aria labels if they are not specified', async function () {
    render(<PaginationBoxView pageCount={3} />);
    const linkedPagination = await screen.findByRole('navigation');
    expect(linkedPagination).toBeDefined();

    const firstLink = within(linkedPagination).getByText('Previous');
    const lastLink = within(linkedPagination).getByText('Next');

    expect(getAttribute(lastLink, 'aria-label')).toBe('Next page');
    expect(getAttribute(firstLink, 'aria-label')).toBe('Previous page');
  });

  it('should render custom aria labels if they are defined', async function () {
    render(
      <PaginationBoxView
        pageCount={3}
        nextAriaLabel={'Go to the next page'}
        previousAriaLabel={'Go to the previous page'}
      />
    );
    const linkedPagination = await screen.findByRole('navigation');
    expect(linkedPagination).toBeDefined();

    const allLinks = within(linkedPagination).getAllByRole('button');
    const firstLink = allLinks[0];
    const lastLink = allLinks[allLinks.length - 1];

    expect(getAttribute(lastLink, 'aria-label')).toBe('Go to the next page');
    expect(getAttribute(firstLink, 'aria-label')).toBe(
      'Go to the previous page'
    );
  });

  describe('render custom page labels if defined', () => {
    it('should use custom page labels', async () => {
      const data = [
        { name: 'Item 1' },
        { name: 'Item 2' },
        { name: 'Item 3' },
        { name: 'Item 4' },
        { name: 'Item 5' },
      ];

      render(
        <PaginationBoxView
          pageCount={data.length}
          pageLabelBuilder={(page) => {
            const pageIndex = page - 1;
            return data[pageIndex]?.name;
          }}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      expect(
        hasClass(
          within(pagination).getByText('Item 1').closest('li'),
          'selected'
        )
      ).toBe(true);
    });
  });
  describe('prevPageRel/nextPageRel/selectedPageRel', () => {
    it('should render default rel if not defined', async function () {
      render(<PaginationBoxView pageCount={4} />);
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const listitems = within(pagination).getAllByRole('listitem');
      const thirdLink = listitems[2].querySelector('a');
      fireEvent.click(thirdLink);

      const thirdLinkAfterClick = listitems[2].querySelector('a');
      const secondLink = listitems[1].querySelector('a');
      const fourthLink = listitems[3].querySelector('a');

      expect(getAttribute(thirdLinkAfterClick, 'rel')).toBe('canonical');
      expect(getAttribute(secondLink, 'rel')).toBe('prev');
      expect(getAttribute(fourthLink, 'rel')).toBe('next');
    });
    it('should render custom rel if defined', async function () {
      render(
        <PaginationBoxView
          pageCount={4}
          prevPageRel="custom-prev-rel"
          nextPageRel="custom-next-rel"
          selectedPageRel="custom-selected-rel"
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const listitems = within(pagination).getAllByRole('listitem');
      const thirdLink = listitems[2].querySelector('a');
      fireEvent.click(thirdLink);

      const thirdLinkAfterClick = listitems[2].querySelector('a');
      const secondLink = listitems[1].querySelector('a');
      const fourthLink = listitems[3].querySelector('a');

      expect(getAttribute(thirdLinkAfterClick, 'rel')).toBe(
        'custom-selected-rel'
      );
      expect(getAttribute(secondLink, 'rel')).toBe('custom-prev-rel');
      expect(getAttribute(fourthLink, 'rel')).toBe('custom-next-rel');
    });
    it('should not render rel if prePageRel, selectedPageRel and nextPageRel are null', async function () {
      render(
        <PaginationBoxView
          pageCount={4}
          prevPageRel={null}
          nextPageRel={null}
          selectedPageRel={null}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const listitems = within(pagination).getAllByRole('listitem');
      const thirdLink = listitems[2].querySelector('a');
      fireEvent.click(thirdLink);

      const secondLink = listitems[1].querySelector('a');
      const thirdLinkAfterClick = listitems[2].querySelector('a');
      const fourthLink = listitems[3].querySelector('a');

      expect(getAttribute(secondLink, 'rel')).toBe(null);
      expect(getAttribute(thirdLinkAfterClick, 'rel')).toBe(null);
      expect(
        getAttribute(within(pagination).getByText('1').closest('a'), 'rel')
      ).toBe(null);
      expect(getAttribute(fourthLink, 'rel')).toBe(null);
    });
    it('should not render prevPageRel and nextPageRel if pageCount is 1', async function () {
      render(<PaginationBoxView pageCount={1} />);
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const firstLink = within(pagination).getByText('Previous');
      const listitems = within(pagination).getAllByRole('listitem');
      const secondLink = listitems[1].querySelector('a');
      const selectedLink = within(pagination).getByText('1').closest('a');
      const thirdLink = listitems[2].querySelector('a');
      const lastLink = within(pagination).getByText('Next');

      expect(getAttribute(firstLink, 'aria-label')).toBe('Previous page');
      expect(getAttribute(secondLink, 'rel')).toBe('canonical');
      expect(getAttribute(selectedLink, 'rel')).toBe('canonical');
      expect(getAttribute(thirdLink, 'rel')).toBe('next');
      expect(getAttribute(lastLink, 'aria-label')).toBe('Next page');
    });
    it('should not render prevPageRel if selected page is first', async function () {
      render(<PaginationBoxView pageCount={4} />);
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const firstLink = within(pagination).getByText('Previous');
      const listitems = within(pagination).getAllByRole('listitem');
      const secondLink = listitems[1].querySelector('a');
      const thirdLink = listitems[2].querySelector('a');

      expect(getAttribute(firstLink, 'aria-label')).toBe('Previous page');
      expect(getAttribute(secondLink, 'rel')).toBe('canonical');
      expect(getAttribute(thirdLink, 'rel')).toBe('next');
    });
    it('should not render nextPageRel if selected page is last', async function () {
      render(<PaginationBoxView pageCount={4} />);
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const listitems = within(pagination).getAllByRole('listitem');
      const secondLastLink = listitems[listitems.length - 2].querySelector('a');
      fireEvent.click(secondLastLink);

      const lastLink = within(pagination).getByText('Next');
      const secondLastLinkAfterClick =
        listitems[listitems.length - 2].querySelector('a');
      const thirdLastLink = listitems[listitems.length - 3].querySelector('a');

      expect(getAttribute(lastLink, 'aria-label')).toBe('Next page');
      expect(getAttribute(secondLastLinkAfterClick, 'rel')).toBe('canonical');
      expect(getAttribute(thirdLastLink, 'rel')).toBe('prev');
    });
    it('should not render nextPageRel if the break page is present just after the selected page', async function () {
      render(
        <PaginationBoxView
          pageCount={20}
          marginPagesDisplayed={2}
          pageRangeDisplayed={0}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const listitems = within(pagination).getAllByRole('listitem');
      const thirdLink = listitems[2].querySelector('a');
      fireEvent.click(thirdLink);

      const secondLink = listitems[1].querySelector('a');
      const thirdLinkAfterClick = listitems[2].querySelector('a');
      const fourthLi = listitems[3];

      expect(getAttribute(secondLink, 'rel')).toBe('prev');
      expect(getAttribute(thirdLinkAfterClick, 'rel')).toBe('canonical');
      expect(hasClass(fourthLi, 'break')).toBe(true);
    });
    it('should not render prevPageRel if the break page is present just before the selected page', async function () {
      render(
        <PaginationBoxView
          pageCount={20}
          marginPagesDisplayed={2}
          pageRangeDisplayed={0}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const listitems = within(pagination).getAllByRole('listitem');
      const thirdLastLink = listitems[listitems.length - 3].querySelector('a');

      fireEvent.click(thirdLastLink);

      const secondLastLi = listitems[listitems.length - 2];
      const secondLastLinkAfterClick = secondLastLi.querySelector('a');
      const thirdLastLinkAfterClick =
        listitems[listitems.length - 3].querySelector('a');
      const fourthLastLi = listitems[listitems.length - 4];

      expect(getAttribute(secondLastLinkAfterClick, 'rel')).toBe('next');
      expect(getAttribute(thirdLastLinkAfterClick, 'rel')).toBe('canonical');
      expect(hasClass(fourthLastLi, 'break')).toBe(true);
    });
  });

  describe('Prevent breaks for one page', () => {
    it('test clicks on previous and next buttons', async () => {
      render(
        <PaginationBoxView
          pageRangeDisplayed={5}
          pageCount={12}
          renderOnZeroPageCount={null}
          marginPagesDisplayed={1}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const buttons = within(pagination).getAllByRole('button');
      const previous = buttons[0];
      const next = buttons[buttons.length - 1];

      fireEvent.click(next);

      const selectedLinks = within(pagination)
        .getAllByRole('button')
        .filter((button) => hasClass(button.closest('li'), 'selected'));
      expect(selectedLinks.length).toBe(1);
      expect(
        hasClass(within(pagination).getByText('2').closest('li'), 'selected')
      ).toBe(true);

      // Click to go to page 8.
      for (let i = 1; i < 7; i++) {
        const nextButton = within(pagination).getByText('Next').closest('a');
        fireEvent.click(nextButton);

        const selectedLinksAfterClick = within(pagination)
          .getAllByRole('button')
          .filter((button) => hasClass(button.closest('li'), 'selected'));
        expect(selectedLinksAfterClick.length).toBe(1);
        expect(
          hasClass(
            within(pagination)
              .getByText(`${2 + i}`)
              .closest('li'),
            'selected'
          )
        ).toBe(true);
      }
      expect(
        hasClass(within(pagination).getByText('8').closest('li'), 'selected')
      ).toBe(true);

      fireEvent.click(previous);

      const selectedLinksAfterPrev = within(pagination)
        .getAllByRole('button')
        .filter((button) => hasClass(button.closest('li'), 'selected'));
      expect(selectedLinksAfterPrev.length).toBe(1);
      expect(
        hasClass(within(pagination).getByText('7').closest('li'), 'selected')
      ).toBe(true);
    });
  });

  describe('Prevent breaks when only one active page', () => {
    it('does not show break', async () => {
      render(
        <PaginationBoxView
          pageRangeDisplayed={0}
          pageCount={12}
          marginPagesDisplayed={0}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const breakLinks = within(pagination).queryAllByText('...', {
        exact: false,
      });
      expect(breakLinks.length).toBe(0);

      const selectedLinks = within(pagination)
        .getAllByRole('button')
        .filter((button) => hasClass(button.closest('li'), 'selected'));
      expect(selectedLinks.length).toBe(1);
      expect(
        hasClass(within(pagination).getByText('1').closest('li'), 'selected')
      ).toBe(true);

      const nextLink = within(pagination).getByText('Next').closest('a');
      fireEvent.click(nextLink);

      const breakLinksAfterClick = within(pagination).queryAllByText('...', {
        exact: false,
      });
      expect(breakLinksAfterClick.length).toBe(0);

      const selectedLinksAfterClick = within(pagination)
        .getAllByRole('button')
        .filter((button) => hasClass(button.closest('li'), 'selected'));
      expect(selectedLinksAfterClick.length).toBe(1);
      expect(
        hasClass(within(pagination).getByText('2').closest('li'), 'selected')
      ).toBe(true);
    });
  });

  describe('onClick', () => {
    it('should use the onClick prop when defined', async () => {
      const myOnClick = vi.fn(() => false);
      render(
        <PaginationBoxView
          onClick={myOnClick}
          initialPage={10}
          pageCount={20}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();

      const breakItems = within(pagination)
        .getAllByText('...', { exact: false })
        .filter((el) => el.closest('a'));
      const breakItem = breakItems[0].closest('a');
      fireEvent.click(breakItem);

      expect(myOnClick).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 2,
          selected: 10,
          event: expect.objectContaining({ target: expect.any(Element) }),
          isPrevious: false,
          isNext: false,
          isBreak: true,
          isActive: false,
        })
      );

      // page should not change because onClick returned false
      expect(
        hasClass(within(pagination).getByText('11').closest('li'), 'selected')
      ).toBe(true);
    });

    it('should use the return value from onClick to change page', async () => {
      const myOnClick = () => 5;
      render(
        <PaginationBoxView
          onClick={myOnClick}
          initialPage={10}
          pageCount={20}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
        />
      );
      const pagination = await screen.findByRole('navigation');
      expect(pagination).toBeDefined();
      expect(
        hasClass(within(pagination).getByText('11').closest('li'), 'selected')
      ).toBe(true);

      const breakItems = within(pagination)
        .getAllByText('...', { exact: false })
        .filter((el) => el.closest('a'));
      const breakItem = breakItems[0].closest('a');
      fireEvent.click(breakItem);

      expect(
        hasClass(within(pagination).getByText('6').closest('li'), 'selected')
      ).toBe(true);
    });
  });
});
