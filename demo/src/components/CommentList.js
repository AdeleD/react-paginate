import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class CommentList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  render() {
    let commentNodes = this.props.data.map(function (comment, index) {
      return <div key={index}>{comment.comment}</div>;
    });

    return (
      <div id="project-comments" className="commentList">
        <ul>{commentNodes}</ul>
      </div>
    );
  }
}
