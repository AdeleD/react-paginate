'use strict';

var React         = require('react');
var ReactPaginate = require('./../react_components/react-paginate');
var $             = require('jquery');

window.React = React;


var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        <div key={index}>{comment.comment}</div>
      );
    });
    return (
      <div id="project-comments" className="commentList">
        <ul>
          {commentNodes}
        </ul>
      </div>
    );
  }
});

var App = React.createClass({

  loadCommentsFromServer: function() {
    $.ajax({
      url      : this.props.url,
      data     : {limit: this.props.perPage, offset: this.state.offset},
      dataType : 'json',
      type     : 'GET',

      success: function(data) {
        this.setState({data: data.comments, pageNum: Math.ceil(data.meta.total_count / data.meta.limit)});
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handlePageClick: function(data) {
    var selected = data.selected;
    var offset = Math.ceil(selected * this.props.perPage);

    this.setState({offset: offset}, function() {
      this.loadCommentsFromServer();
    }.bind(this));

    this.loadCommentsFromServer();
  },

  getInitialState: function() {
    return {data: [], offset: 0};
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
  },

  render: function () {
    return (
      <div className="commentBox">
        <CommentList data={this.state.data} />
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<li className="break"><a href="">...</a></li>}
                       pageNum={this.state.pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClass={"active"} />
      </div>
    );
  }
});

React.render(
  <App url={'http://localhost:3000/comments'}
       author={'adele'}
       perPage={10} />,
  document.getElementById('react-paginate')
);
