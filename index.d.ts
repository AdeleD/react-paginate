// Type definitions for react-paginate 8.0.1

import * as React from 'react';

export interface ReactPaginateProps {
  /**
   * The total number of pages.
   */
  pageCount: number;

  /**
   * The range of pages displayed.
   * Default to 2.
   */
  pageRangeDisplayed?: number | undefined;

  /**
   * The number of pages to display for margins.
   * Default to 3.
   */
  marginPagesDisplayed?: number | undefined;

  /**
   * Label for the `previous` button.
   */
  previousLabel?: string | React.ReactNode | undefined;

  /**
   * Aria label for the `previous` button.
   */
  previousAriaLabel?: string | undefined;

  /**
   * The `rel` property on the `a` tag just before the selected page.
   * Default value `prev`.  Set to `null` to disable.
   */
  prevPageRel?: string | null | undefined;

  /**
   * The `rel` property on the `a` tag for the prev page control.
   * Default value `prev`. Set to `null` to disable.
   */
  prevRel?: string | null | undefined;

  /**
   * Label for the `next` button.
   */
  nextLabel?: string | React.ReactNode | undefined;

  /**
   * Aria label for the `next` button.
   */
  nextAriaLabel?: string | undefined;

  /**
   * The `rel` property on the `a` tag just after the selected page.
   * Default value `next`.  Set to `null` to disable.
   */
  nextPageRel?: string | null | undefined;

  /**
   * The `rel` property on the `a` tag for the next page control.
   * Default value `next`. Set to `null` to disable.
   */
  nextRel?: string | null | undefined;

  /**
   * Label for ellipsis.
   */
  breakLabel?: string | React.ReactNode | undefined;

  /**
   * The classname on tag `li` of the ellipsis element.
   */
  breakClassName?: string | undefined;

  /**
   * The classname on tag `a` of the ellipsis element.
   */
  breakLinkClassName?: string | undefined;

  /**
   * The method to call when a page is clicked. Exposes the current page object as an argument.
   */
  onPageChange?(selectedItem: { selected: number }): void;

  /**
   * The method to call when an active page is clicked. Exposes the active page object as an argument.
   */
  onPageActive?(selectedItem: { selected: number }): void;

  /**
   * The method to call when an active page is clicked. Exposes the active page object as an argument.
   */
  onClick?(clickEvent: {
    index: number | null;
    selected: number;
    nextSelectedPage: number | undefined;
    event: object;
    isPrevious: boolean;
    isNext: boolean;
    isBreak: boolean;
    isActive: boolean;
  }): boolean | number | void;

  /**
   * The initial page selected.
   */
  initialPage?: number | undefined;

  /**
   * To override selected page with parent prop.
   *
   * Use this if you want to [control](https://reactjs.org/docs/forms.html#controlled-components) the page from your app state.
   */
  forcePage?: number | undefined;

  /**
   * Disable onPageChange callback with initial page.
   * Default: false
   */
  disableInitialCallback?: boolean | undefined;

  /**
   * Same as `containerClassName`.
   * For use with [styled-components](https://styled-components.com/) & other CSS-in-JS.
   */
  className?: string | undefined;

  /**
   * The classname of the pagination container.
   */
  containerClassName?: string | undefined;

  /**
   * The classname on tag `li` of each page element.
   */
  pageClassName?: string | undefined;

  /**
   * The classname on tag `a` of each page element.
   */
  pageLinkClassName?: string | undefined;

  /**
   * Function to set the text on page links. Defaults to `(page) => page`
   */
  pageLabelBuilder?(page: number): string | React.ReactNode;

  /**
   * The classname for the active page.
   */
  activeClassName?: string | undefined;

  /**
   * The classname for the active link.
   */
  activeLinkClassName?: string | undefined;

  /**
   * The classname on tag `li` of the `previous` button.
   */
  previousClassName?: string | undefined;

  /**
   * The classname on tag `li` of the `next` button.
   */
  nextClassName?: string | undefined;

  /**
   * The classname on tag `a` of the `previous` button.
   */
  previousLinkClassName?: string | undefined;

  /**
   * The classname on tag `a` of the `next` button.
   */
  nextLinkClassName?: string | undefined;

  /**
   * The classname for disabled `previous` and `next` buttons.
   */
  disabledClassName?: string | undefined;

  /**
   * The classname on tag `a` for disabled `previous` and `next` buttons.
   */
  disabledLinkClassName?: string | undefined;

  /**
   * The method is called to generate the href attribute value on tag a of each page element.
   */
  hrefBuilder?(
    pageIndex: number,
    pageCount: number,
    selectedPage: number
  ): void;

  /**
   * By default the `hrefBuilder` add `href` only to active controls.
   * Set this prop to `true` so `href` are generated on all controls
   * ([see](https://github.com/AdeleD/react-paginate/issues/242))
   * Default to `false`
   */
  hrefAllControls?: boolean | undefined;

  /**
   * Extra context to add to the aria-label HTML attribute.
   */
  extraAriaContext?: string | undefined;

  /**
   * The method is called to generate the `aria-label` attribute value on each page link
   */
  ariaLabelBuilder?(pageIndex: number, selectedPage: number): void;

  /**
   * The event to listen onto before changing the selected page. Default is: `onClick`.
   */
  eventListener?: string | undefined;

  /**
   * A render function called when `pageCount` is zero. Let the Previous / Next buttons displayed by default (`undefined`).
   * Display nothing when `null` is provided.
   */
  renderOnZeroPageCount?: (props: ReactPaginateProps) => void | null;

  /**
   * The `rel` propery on the `a` tag for the selected page.
   * Default value `canonical`. Set to `null` to disable.
   */
  selectedPageRel?: string | null | undefined;
}

declare const ReactPaginate: React.ComponentClass<ReactPaginateProps>;
export default ReactPaginate;
