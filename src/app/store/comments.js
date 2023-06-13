import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.sevice'
import { nanoid } from 'nanoid'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsReguestField: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [...state.entities, state.entities]
      }
      state.entities.push(action.payload)
    },
  },
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
  commentsRequested,
  commentsReceved,
  commentsReguestField,
  commentCreated,
} = actions

const commentCreareRequested = createAction('comments/commentCreareRequested')
const createCommentFailed = createAction('comments/createCommentFailed')
const commentRequested = createAction('comments/commentRequested')
const commentRequestedFailed = createAction('comments/commentRequestedFailed')

export const loadcommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComments(userId)
    dispatch(commentsReceved(content))
  } catch (error) {
    dispatch(commentsReguestField(error.message))
  }
}
export const getComments = () => (state) => state.comments.entities

export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

function createCommentData(payload) {
  return async function (dispatch) {
    dispatch(commentCreareRequested())
    try {
      const { content } = await commentService.createComment(payload)
      dispatch(commentCreated(content))
    } catch (error) {
      dispatch(createCommentFailed(error.message))
    }
  }
}
export const createComment =
  (data, userId, currentUserId) => async (dispatch) => {
    dispatch(commentRequested())
    try {
      dispatch(
        createCommentData({
          ...data,
          _id: nanoid(),
          pageId: userId,
          userId: currentUserId,
          created_at: Date.now(),
        })
      )
    } catch (error) {
      dispatch(commentRequestedFailed(error.message))
    }
  }

export const removeComment = (id) => async (state, dispatch) => {
  try {
    const { content } = await commentService.removeComment(id)
    if (content === null) {
      state.comments.entities.filter((c) => c._id !== id)
    }
  } catch (error) {
    dispatch(commentRequestedFailed(error.message))
  }
}

export default commentsReducer
