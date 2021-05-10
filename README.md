# react-paginate

[![NPM](https://nodei.co/npm/react-paginate.png?downloads=true)](https://nodei.co/npm/react-paginate/)
[![Build Status](https://travis-ci.org/AdeleD/react-paginate.svg?branch=master)](https://travis-ci.org/AdeleD/react-paginate)

**A ReactJS component to render a pagination.**

By installing this component and writing only a little bit of CSS you can obtain this:
Note: You should write your own css to obtain this UI. This package do not provide any css.

<img src="https://cloud.githubusercontent.com/assets/2084833/24840237/7accb75a-1d1e-11e7-9abb-818431398b91.png" alt="Pagination demo 2" />

or

<img src="https://cloud.githubusercontent.com/assets/2084833/24840230/594e4ea4-1d1e-11e7-8b34-bde943b4793d.png" alt="Pagination demo 1" />

## Installation

Install `react-paginate` with [npm](https://www.npmjs.com/):

```
npm install react-paginate --save
```

Then, read the code of [demo/js/demo.js][1]. You will quickly understand
how to make `react-paginate` work with a list of objects or you can see example below using functional component.

## Usage


```javascript
import ReactPaginate from "react-paginate";

// Example items from another resources
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Example() {
	// Use to store array of items 
	const [products, setProducts] = useState(null);
	// Set how many number of page you want to display on your pagination bar
	const [pageCount, setPageCount] = useState(4); 
	// Set the items on current page, will change everytime we click to another page 
	const [tmpItems, setTmpItems] = useState(null);

	useEffect(() => {
		// Fetch items from another resources
		setProducts(items);
		// Fetch first 6 items in the array
		setTmpItems(productResult.slice(0, 6));
		// Length of product divide by item in each page
		setPageCount(productResult.length / 6);
	}, []);

	// Inovoke when user click to another page
	const handlePageClick = (data) => {
		let num = data.selected;
		// change the next 6 or prev 6 items when the btn clicked
		setTmpItems(products.slice(num * 6, num * 6 + 6));
	};

	return (
			<ReactPaginate
				breakLabel={"..."}
				nextLabel={"next >"}
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel={"< previous"}
			/>
	)
}

export default Example;
```


## Demo

Clone the repository and move into:

```console
git clone git@github.com:AdeleD/react-paginate.git
cd react-paginate
```

Install dependencies:

```console
make install
```

Prepare the demo:

```console
make demo
```

Run the server:

```console
make serve
```

Open your browser and go to [http://localhost:3000/](http://localhost:3000/)

<img src="https://cloud.githubusercontent.com/assets/2084833/24840241/7c95b7b2-1d1e-11e7-97e3-83b9c7a1f832.gif" alt="Pagination demo" />

## Props

| Name                     | Type       | Description                                                                                  |
| ------------------------ | ---------- | -------------------------------------------------------------------------------------------- |
| `pageCount`              | `Number`   | **Required.** The total number of pages.                                                     |
| `pageRangeDisplayed`     | `Number`   | **Required.** The range of pages displayed.                                                  |
| `marginPagesDisplayed`   | `Number`   | **Required.** The number of pages to display for margins.                                    |
| `previousLabel`          | `Node`     | Label for the `previous` button.                                                             |
| `nextLabel`              | `Node`     | Label for the `next` button.                                                                 |
| `breakLabel`             | `Node`     | Label for ellipsis.                                                                          |
| `breakClassName`         | `String`   | The classname on tag `li` of the ellipsis element.                                           |
| `breakLinkClassName`     | `String`   | The classname on tag `a` of the ellipsis element.                                            |
| `onPageChange`           | `Function` | The method to call when a page is clicked. Exposes the current page object as an argument.   |
| `onPageActive`           | `Function` | The method to call when an active page is clicked. Exposes the active page object as an argument.   |
| `initialPage`            | `Number`   | The initial page selected.                                                                   |
| `forcePage`              | `Number`   | To override selected page with parent prop.                                                  |
| `disableInitialCallback` | `boolean`  | Disable `onPageChange` callback with initial page. Default: `false`                          |
| `containerClassName`     | `String`   | The classname of the pagination container.                                                   |
| `pageClassName`          | `String`   | The classname on tag `li` of each page element.                                              |
| `pageLinkClassName`      | `String`   | The classname on tag `a` of each page element.                                               |
| `pageLabelBuilder`        | `Function` | Function to set the text on page links. Defaults to `(page) => page`                   |
| `activeClassName`        | `String`   | The classname for the active page.                                                           |
| `activeLinkClassName`    | `String`   | The classname on the active tag `a`.                                                         |
| `previousClassName`      | `String`   | The classname on tag `li` of the `previous` button.                                          |
| `nextClassName`          | `String`   | The classname on tag `li` of the `next` button.                                              |
| `previousLinkClassName`  | `String`   | The classname on tag `a` of the `previous` button.                                           |
| `nextLinkClassName`      | `String`   | The classname on tag `a` of the `next` button.                                               |
| `disabledClassName`      | `String`   | The classname for disabled `previous` and `next` buttons.                                    |
| `hrefBuilder`            | `Function` | The method is called to generate the `href` attribute value on tag `a` of each page element. |
| `extraAriaContext`       | `String`   | DEPRECATED: Extra context to add to the `aria-label` HTML attribute.                         |
| `ariaLabelBuilder`       | `Function` | The method is called to generate the `aria-label` attribute value on each page link          |
| `eventListener`          | `String`   | The event to listen onto before changing the selected page. Default is: "onClick".           |

## Contribute

1. [Submit an issue](https://github.com/AdeleD/react-paginate/issues)
2. Fork the repository
3. Create a dedicated branch (never ever work in `master`)
4. The first time, run command: `webpack` into the directory
5. Run `npm start`
6. Fix bugs or implement features
7. Always write tests

Run tests:

```console
make test
```

[1]: https://github.com/AdeleD/react-paginate/blob/master/demo/js/demo.js
