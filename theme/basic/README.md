# Basic CSS theme

## How to use it

Add the `theme/basic/react-paginatte.css` file to your HTML page. For eg., after downloading it and making it available on your server as `/assets/css/react-paginate.css`:

```html
<link href="/assets/css/react-paginate.css" rel="stylesheet" />
```

Then load the `ReactPaginate` component by specifying the `className` prop to `react-paginate`. This will add the class to the `<ul>` container:

```javascript
import ReactPaginate from 'react-paginate';


function MyExampleApp() {
  // Manage offsets, page clicks, etc. ... (See main README.md)

  return (
    <>
      <h2>Paginated page</h2>
      <ReactPaginate
        className="react-paginate"
        //  ...
      />
    </>
  );
}
```
