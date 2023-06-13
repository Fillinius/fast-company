import React, { useEffect } from 'react';

import { orderBy } from 'lodash';
import { useComments } from '../../../hooks/useComments';
import CommentsList, { AddCommentForm } from '../../common/comments';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, getCommentsLoadingStatus, loadcommentsList } from '../../../store/comments';
import { useParams } from 'react-router-dom';

const CommementsListComponent = () => {
  const { userId } = useParams()
  const isLoading = useSelector(getCommentsLoadingStatus())
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadcommentsList(userId))
  }, [userId])
  const comments = useSelector(getComments())
  const { createComment, removeComment } = useComments()

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
          {!isLoading
            ? <CommentsList
              comments={sortedCommentsPage}
              onDelete={handleDeleteComment}
            />
            : 'Loading...'}

        </div>
      </div>
    </>
  );
}

export default CommementsListComponent;
