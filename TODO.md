# v9

## Controlled mode (`page`)

Add documentation with controlled mode

- show both controlled and uncontrolled in doc ?
- https://www.npmjs.com/package/react-clock

### `forcePage` prop

Deprecate it and **refer to a documentation to implement a controlled component**.

## Dependencies

Bump all dev dependencies

## Test framework

Migrate to React Testing Library.

- https://testing-library.com/docs/react-testing-library/intro
  with jest-dom
- https://github.com/testing-library/jest-dom

## Examples

Create a example directory with several cases:

- uncontrolled simple with stub data;
- controlled with async API;
- synched multiple pagination controls;
- integration with react-router;
  - change on history previous / next
- theming and integration with styled-components.

## Theming

Add a `theme` object to pass all theming classes, so we can clean up the props and doc?

Look at other packages and support existing props (at least for two versions or forever; just remove them from README).

https://github.com/markdalgleish/react-themeable
https://github.com/moroshko/react-autosuggest

See also https://github.com/AdeleD/react-paginate/issues/80

## Hooks

Add a hook `usePage`?
https://remix.run/blog/react-router-v6

## Misc

- Removed support for depecrated `extraAriaContext` (please use `ariaLabelBuilder` instead)
- Create branches for old versions (from release tags): `v7`, `v8`, `v9` (for easy reference to old doc)
