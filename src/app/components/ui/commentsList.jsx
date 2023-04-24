import React from 'react';
import Comment from '../page/comment';
import PropTypes from 'prop-types';
const CommentsList = ({ comments, onDelete }) => {
  return (comments.map((comment) => (
    <Comment
      key={comment._id}
      onDelete={onDelete}
      {...comment} />
  )
  )
  );
}
CommentsList.propTypes = {
  comments: PropTypes.array,
  onDelete: PropTypes.func
}

export default CommentsList;
