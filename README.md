react-paginate
==============

A ReactJS component to render a pagination.


Getting started:
---------------------

#### Install:

`npm install react-paginate`

#### To load the component:

`var ReactPaginate = require("react-paginate");`

#### To run tests:

`npm test`


How to use it into your own project:
---------------------

```javascript
var React         = require("react");
var ReactPaginate = require("react-paginate");


var MyComponent = React.createClass({
  loadObjectsFromServer: function() {
    $.ajax({
      url: {this.props.url},
      dataType: 'json',
      data: {limit: this.props.perPage, offset: this.state.offset},
      success: function(data) {
        this.setState({data: data, pageNum: (data.total_count / data.limit)});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handlePageClick: function(data) {
    var selected = data.selected;
    this.setState({offset: Math.ceil((selected) * this.props.perPage)});
    this.loadObjectsFromServer();
  },
  getInitialState: function() {
    return {data: [], offset: 0};
  },
  componentDidMount: function() {
    this.loadObjectsFromServer();
  },
  render: function() {
    return (
      <div className="my-component">
        <MyComponentList data={this.state.data} />

        <nav id="project-pagination">
            <ReactPaginate clickCallback={this.handlePageClick}
                           previousLabel={<span class="prev">Previous</span>}
                           nextLabel={<span class="prev">Next</span>}
                           breakLabel={<span class="ellipsis">...</span>}
                           pageNum={this.state.pageNum}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={2} />
        </nav>
      </div>
    );
  }
});


var MyComponentList = React.createClass({
  render: function() {
    var items = this.props.data.map(function(item, index) {
      return (
        <li>{item.property}</li>
      );
    });
    return (
      <div className="my-list">
        <ul>
          {items}
        </ul>
      </div>
    );
  }
});


React.renderComponent(
    <MyCustomComponent
        url={'http://my-api-url/objects'}
        perPage={10} />,
    container
);

module.exports = MyComponentList;
module.exports = MyComponent;
```
