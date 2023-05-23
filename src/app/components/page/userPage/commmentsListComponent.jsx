import React from 'react';
// import API from '../../../api';
//import { useParams } from 'react-router-dom';
import AddCommentForm from '../../ui/addCommentForm';
import CommentsList from '../../ui/commentsList';
import { orderBy } from 'lodash';
import { useComments } from '../../../hooks/useComments';


const CommementsListComponent = () => {
  // const { userId } = useParams()
  const { createComment, comments, removeComment } = useComments()

  // useEffect(() => {
  //   API.comments.fetchCommentsForUser(userId).then((data) => setCommenstPage(data))
  // }, [])
  const handleDeleteComment = (id) => {
    removeComment(id);
    // API.comments.remove(id).then((id) => {
    //   setCommenstPage(comments.filter((x) => x._id !== id))
    // })
  }
  const handleSubmit = (data) => {
    createComment(data)
    // API.comments
    //   .add({ ...data, pageId: userId })
    //   .then((data) => setCommenstPage([...comments, data]))
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

// {comments.map((comment) => (
//   <p key={comment._id}>{comment.content}</p>
// ))}
