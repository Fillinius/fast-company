import React, { useState, useEffect } from 'react';
import API from '../../../api';
import { useParams } from 'react-router-dom';
import AddCommentForm from '../../ui/addCommentForm';
import CommentsList from '../../ui/commentsList';
import { orderBy } from 'lodash';

const CommementsListComponent = () => {
  const [commentsPage, setCommenstPage] = useState([])
  const params = useParams()
  const { userId } = params

  useEffect(() => {
    API.comments.fetchCommentsForUser(userId).then((data) => setCommenstPage(data))
  }, [])

  // const getformatTime = (time, separate = ' ') => {
  //   let formatTime = new Data()
  //   formatTime.setMonth(time) + separate
  //   formatTime.setNumber(time) + separate
  //   return formatTime
  // }
  const handleDeleteComment = (id) => {
    API.comments.remove(id).then((id) => {
      setCommenstPage(commentsPage.filter((x) => x._id !== id))
    })
  }
  const handleSubmit = (data) => {
    API.comments
      .add({ ...data, pageId: userId })
      .then((data) => setCommenstPage([...commentsPage, data]))
  }
  const sortedCommentsPage = orderBy(commentsPage, ['created_at'], ['desc'])

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

// {comments.map((comment) => (
//   <p key={comment._id}>{comment.content}</p>
// ))}
