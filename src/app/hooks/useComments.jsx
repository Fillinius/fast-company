import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import commentService from '../services/comment.sevice';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/users';

const CommentsContext = React.createContext()

export const useComments = () => {
  return useContext(CommentsContext)
}
export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { userId } = useParams()
  const currentUserId = useSelector(getCurrentUserId())
  useEffect(() => {
    getComments()
  }, [userId])
  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      userId: currentUserId,
      created_at: Date.now()
    }
    try {
      const { content } = await commentService.createComment(comment)
      setComments((prev) => [...prev, content]);
    } catch (error) {
      errorCatcher(error)
    }
    // console.log(comment);
  }
  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId)
      setComments(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }
  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id)
      if (content === null) {
        setComments((prev) => prev.filter((c) => c._id !== id))
      }
      // console.log(content);
    } catch (error) {
      errorCatcher(error)
    }
  }
  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  return (<CommentsContext.Provider
    value={{ comments, createComment, isLoading, removeComment }}>
    {children}
  </CommentsContext.Provider>)
}
CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
