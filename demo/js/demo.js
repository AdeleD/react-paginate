import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import $ from 'jquery';

window.React = React;

export class CommentList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  render() {
    let commentNodes = this.props.data.map(function(comment, index) {
      return <div key={index}>{comment.comment}</div>;
    });

    return (
      <div id="project-comments" className="commentList">
        <ul>{commentNodes}</ul>
      </div>
    );
  }
}

export class App extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    perPage: PropTypes.number.isRequired,
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

      success: data => {
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

  handlePageClick = data => {
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
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App url={'http://localhost:3000/comments'} author={'adele'} perPage={10} />,
  document.getElementById('react-paginate')
);
