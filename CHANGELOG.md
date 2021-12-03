## >= 9.0.0 (WIP)

- Removed support for depecrated `extraAriaContext` (please use `ariaLabelBuilder` instead)

## >= 8.1.0

- A new prop `onClick` has been added. It is a callback for any click on the component. It exposes information on the part clicked (for eg. `isNext` for when next control is clicked or `isBreak` for a break clicked), the next expected page `nextSelectedPage` & others. Can return `false` to prevent any page change or a number to override the page to jump to. Just return nothing (or `undefined`) to let default behavior take place. (see: https://github.com/AdeleD/react-paginate/issues/263)
- Prevent breaks to be displayed when both `pageRangeDisplayed` and `marginPagesDisplayed` are 0

## >= 8.0.3

- Fix bug on `marginPagesDisplayed={0}` (see: https://github.com/AdeleD/react-paginate/pull/396)

## >= 8.0.2

- Add TypeScript definitions directly [in the repository](https://github.com/AdeleD/react-paginate/blob/master/dist/index.d.ts) (instead of community definitions from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-paginate)) (see: https://github.com/AdeleD/react-paginate/issues/394)

## >= 8.0.1

- Fix the indexed passed when replacing a break (containing only one page) with the actual page (see: https://github.com/AdeleD/react-paginate/pull/395)

## >= 8.0.0

- Remove button role for links with an href (see: https://github.com/AdeleD/react-paginate/pull/390)
- Add a rel attribute on previous page, current page and next page controls. They are respectivement customizable thanks to props `prevPageRel`, `selectedPageRel` and `nextPageRel`. To disable the rel attribute, set them to `null`. (see: https://github.com/AdeleD/react-paginate/pull/391)
- A new prop `disabledLinkClassName` has been added. It allows to add a custom class on disabled `previous` and `next` controls. Default to `undefined` (no class added).
- `tabindex` is now set to `-1` on disabled controls (disable previous/next buttons; active page button). (see: https://github.com/AdeleD/react-paginate/issues/219)
- Add a warning when providing an `initialPage` prop value that is greater than the maximum page index from `pageCount` prop.
- Add a warning when providing a `forcePage` prop value that is greater than the maximum page index from `pageCount` prop.
- The `href` generated from `hrefBuilder` prop is now also set on active page control `<a>` tag. (see #242)
- A new prop `hrefAllControls` has been added. It allows to enable `hrefBuilder` for all controls.
- Fix page range of 2 when first page is selected. (see https://github.com/AdeleD/react-paginate/issues/307)
- Fix the breaking algorithm to not create breaks for only one page (see: https://github.com/AdeleD/react-paginate/issues/270)

## >= 7.1.5

- Fix the Webpack build to work for both browser and Node (see: https://github.com/AdeleD/react-paginate/issues/389)
- Add a warning when providing both `initialPage` and `forcePage` props. You should only provides `forcePage` when the component is [controlled](https://reactjs.org/docs/forms.html#controlled-components). (see: https://github.com/AdeleD/react-paginate/pull/290)

## >= 7.1.4

- A new prop `renderOnZeroPageCount` has been added. It allows to define what to display when `pageCount` is zero. By default, it lets the main pagination boxes be displayed (Previous / Next). To display nothing, just provides `renderOnZeroPageCount={null}`. (see: https://github.com/AdeleD/react-paginate/pull/377)
- A new prop `className` has been added, which is an alias to `containerClassName` and is usefull for integration with CSS-in-JS frameworks like styled-components. (see: https://github.com/AdeleD/react-paginate/issues/321)
- Fix the Webpack build by providing a `web` target (see: https://github.com/AdeleD/react-paginate/issues/317)
- Add a warning when a non integer is provided for `pageCount`

## >= 7.1.3

- Remove react-hot-loader from production build.

## >= 7.1.2

- A new prop `pageLabelBuilder` has been added. It allows to customize pages labels of the component. By default, the page number is displayed (see: https://github.com/AdeleD/react-paginate/pull/334).

## >= 7.1.1

- Add an onPageActive callback (see: https://github.com/AdeleD/react-paginate/pull/349).

## >= 7.1.0

- Compatibility with React v17.0

## >= 7.0.0

- Add a rel attribute on previous/next buttons. Rel attributes are customizable thanks to props 'prevRel' and 'nextRel' (see: https://github.com/AdeleD/react-paginate/pull/326).
- Upgrade devDependencies packages jest-cli and webpack-cli.

## >= 6.5.0

- Add a prop 'eventListener' to let users use a custom event listener on prev/next buttons, pages and break views.

## >= 6.4.0

- Two properties have been added to extend accessibility support (see https://github.com/AdeleD/react-paginate/pull/164).
  - nextAriaLabel: defines the aria-label html property for the 'Next page' button (default: 'Next page').
  - previousAriaLabel: defines the aria-label html property for the 'Previous page' button (default: 'Previous page').
- Upgrade devDependencies packages (see: https://github.com/AdeleD/react-paginate/pull/314).

## >= 6.3.2

- Bump dependency 'mixin-deep' from 1.3.1 to 1.3.2 (see: https://github.com/AdeleD/react-paginate/pull/283).

## >= 6.3.1

- Handle 'forcePage' value if set from outside (see: https://github.com/AdeleD/react-paginate/pull/272).

## >= 6.3.0

- Add the ariaLabelBuilder feature to customize aria-label attributes (see: https://github.com/AdeleD/react-paginate/pull/260).

## >= 6.2.1

- Fix the breakLabel prop type in the BreakView component (see: https://github.com/AdeleD/react-paginate/pull/257).

## >= 6.2.0

- Add the breakLinkClassName prop.

## >= 6.1.0

- Add aria-disabled prop to anchors for accessibility (https://github.com/AdeleD/react-paginate/pull/254)
- Setup eslint and prettier for dev

## >= 6.0.0

- Implement forward/backward jump when clicking on a breakview (ellipsis).
- The 'breakLabel' prop should not receive an `<a>` tag anymore. Otherwise, a warning will appear in the JS console: `validateDOMNesting(...): <a> cannot appear as a descendant of <a>.`

## >= 5.3.1

- Tests improvements + fix package release (https://github.com/AdeleD/react-paginate/issues/245).

## >= 5.3.0

- Add the activeLinkClassName property.

## >= 5.2.5

- Upgrade webpack dev dependencies (Fix "Cannot read property 'properties' of undefined" from webpack-cli).

## >= 5.2.4

- Use ES6 export in react_components/index.js (https://github.com/AdeleD/react-paginate/pull/203).

## >= 5.2.3

- Add a role="button" on `<a>` tags to let screen readers know explicitly that links (without href) are intended to be interactive elements (https://github.com/AdeleD/react-paginate/issues/212).

## >= 5.2.2

- Remove the useless node_modules folder from the previous release (https://github.com/AdeleD/react-paginate/issues/208).

## >= 5.2.1

- Fix `disabledClassName` not used in previous and next classnames (https://github.com/AdeleD/react-paginate/issues/204).

## >= 5.2.0

- Delete the dependency on `react-addons-create-fragment`.
- Delete the dependency on `classnames`.

## >= 5.1.0

- Refactor using destructuring.
- Upgrade react-hot-loader to version 3.0.0 (dev dependency).

## >= 5.0.0

- Compatibility with React v16.0

## >= 4.3.0

- The HTML attribute `aria-label` has been added.
- A new prop `extraAriaContext` allows to add some extra text to the end of the `aria-label` to provide additional context to the users.

## >= 4.2.0

- A new prop `hrefBuilder` has been added. It allows to add custom `href` attributes on `<a>` tags of the component.
- Packages `react` and `react-addons-create-fragment` are now dependencies (see package.json).

## >= 4.0.0

- Some variable have been renamed:

  - `clickCallback` -> `onPageChange`
  - `initialSelected` -> `initialPage`
  - `forceSelected` -> `forcePage`
  - `pageNum` -> `pageCount`

- `onClick` events have been moved on `<a>` tags (previously on `<li>`s).

## >= 3.0.0

`clickCallback` (`onPageChange`) isn't called during initialization anymore.

## >= 1.0.0

HTML Structure:

```html
<ul class="pagination">
  <li class="disabled">
    <a href="#"><span>«</span></a>
  </li>
  <li class="active"><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
  <li><a href="#">5</a></li>
  <li>
    <a href="#"><span>»</span></a>
  </li>
</ul>
```

## <= 0.5.7

HTML Structure:

```html
<ul>
  <li class="disabled">
    <a href="#"><span>«</span></a>
  </li>
  <li>
    <ul>
      <li class="active"><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#">3</a></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>
    </ul>
  </li>
  <li>
    <a href="#"><span>»</span></a>
  </li>
</ul>
```
