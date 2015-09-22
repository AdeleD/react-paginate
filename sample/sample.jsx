'use strict';

import React, { Component } from 'react';
import ReactPaginate from './../react_components/react-paginate';
import $ from 'jquery';

window.React = React;


export class CommentList extends Component {
  render() {
    let commentNodes = this.props.data.map(function(comment, index) {
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
};

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0
    }
  }

  loadCommentsFromServer() {
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
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({offset: offset}, function() {
      this.loadCommentsFromServer();
    }.bind(this));

    this.loadCommentsFromServer();
  }

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  render() {
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
                       activeClassName={"active"} />
      </div>
    );
  }
};

React.render(
  <App url={'http://localhost:3000/comments'}
       author={'adele'}
       perPage={10} />,
  document.getElementById('react-paginate')
);
