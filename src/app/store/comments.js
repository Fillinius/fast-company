import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.sevice'

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
  },
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsReceved, commentsReguestField } = actions
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

export default commentsReducer
