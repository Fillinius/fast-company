import React from 'react';

import { orderBy } from 'lodash';
import { useComments } from '../../../hooks/useComments';
import CommentsList, { AddCommentForm } from '../../common/comments';

const CommementsListComponent = () => {

  const { createComment, comments, removeComment } = useComments()

  const handleDeleteComment = (id) => {
    removeComment(id);
  }
  const handleSubmit = (data) => {
    createComment(data)
  }
  const sortedCommentsPage = orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className="card mb-2">
        {" "}
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          <CommentsList
            comments={sortedCommentsPage}
            onDelete={handleDeleteComment} />
        </div>
      </div>
    </>
  );
}

export default CommementsListComponent;
