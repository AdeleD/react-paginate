# v8

## Controlled mode (`page`)

When `page` is provided, the component should be absolutely controlled.

It should not be possible to let user clicks change the page (without the controlled state changing from the listening parent component).

See https://github.com/AdeleD/react-paginate/issues/198#issuecomment-941295225

Add documentation with controlled mode

- show both controlled and uncontrolled in doc ?
- https://www.npmjs.com/package/react-clock

### `forcePage` prop

Deprecate it and refer to a documentation to implement a controlled component.

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
- integration with react-router.
  - change on history previous / next
