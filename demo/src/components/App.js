import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import $ from 'jquery';

import { DEMO_TYPES } from './../constants';
import { CommentList } from './CommentList';

export class App extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    perPage: PropTypes.number.isRequired,
    demoType: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0,
    };
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      data: { limit: this.props.perPage, offset: this.state.offset },
      dataType: 'json',
      type: 'GET',

      success: (data) => {
        this.setState({
          data: data.comments,
          pageCount: Math.ceil(data.meta.total_count / data.meta.limit),
        });
      },

      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString()); // eslint-disable-line
      },
    });
  }

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset }, () => {
      this.loadCommentsFromServer();
    });
  };

  render() {
    return (
      <div className="commentBox">
        <CommentList data={this.state.data} />
        {this.props.demoType === DEMO_TYPES.BASIC && (
          <ReactPaginate
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName='pagination'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            activeClassName='active'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            previousLabel='previous'
            nextLabel='next'
            breakLabel='...'
          />
        )}
      </div>
    );
  }
}
