import React, { useEffect } from 'react';

import { orderBy } from 'lodash';

import CommentsList, { AddCommentForm } from '../../common/comments';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComments, getCommentsLoadingStatus, loadcommentsList, removeComment } from '../../../store/comments';
import { useParams } from 'react-router-dom';


const CommementsListComponent = () => {
  const { userId } = useParams()
  const isLoading = useSelector(getCommentsLoadingStatus())
  // const { name } = useSelector(getUsersById(userId))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadcommentsList(userId))
  }, [userId])
  const comments = useSelector(getComments())

  const handleDeleteComment = (id) => {
    dispatch(removeComment(id));
  }
  const handleSubmit = (data) => {
    (dispatch(createComment({ ...data, userId })))
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
