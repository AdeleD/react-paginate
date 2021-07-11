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
