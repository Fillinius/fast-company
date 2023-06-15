import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.sevice'
import { nanoid } from 'nanoid'
import { getCurrentUserId } from './users'

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
    commentRemove: (state, action) => {
      state.entities = state.entities.filter(
        (state) => state._id !== action.payload
      )
    },
  },
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
  commentsRequested,
  commentsReceved,
  commentsReguestField,
  commentCreated,
  commentRemove,
} = actions

const commentCreateRequested = createAction('comments/commentCreareRequested')
const commentCreateFailed = createAction('comments/createCommentFailed')
const commentRemoveRequested = createAction('comments/commentRemoveRequested')
const commentRemoveFailed = createAction('comments/commentRemoveFailed')

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

export const createComment = (payload) => async (dispatch, getState) => {
  console.log(getState())
  dispatch(commentCreateRequested())
  try {
    const comment = {
      ...payload,
      _id: nanoid(),
      // pageId: userId,
      userId: getCurrentUserId()(getState()),
      created_at: Date.now(),
    }
    const { content } = await commentService.createComment(comment)
    // console.log(content)
    dispatch(commentCreated(content))
  } catch (error) {
    dispatch(commentCreateFailed(error.message))
  }
}

export const removeComment = (id) => async (dispatch) => {
  dispatch(commentRemoveRequested())
  try {
    const { content } = await commentService.removeComment(id)
    if (content === null) {
      console.log(content)
      console.log(dispatch(commentRemove(id)))
      dispatch(commentRemove(id))
    }
  } catch (error) {
    dispatch(commentRemoveFailed(error.message))
  }
}

export default commentsReducer
