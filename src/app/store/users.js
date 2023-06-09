import { createAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/userService'
import authService from '../services/auth.service'
import localstorageService from '../services/localstorage.service'
import randomInt from '../utils/getRandomInt'
import history from '../utils/histori'

const initialState = localstorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localstorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    }
const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceved: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    usersReguestField: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFaild: (state, action) => {
      state.error = action.payload
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = []
      }
      state.entities.push(action.payload)
    },
    userLoggedOut: (state) => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
    },
    userUpdate: (state, action) => {
      state.entities.find((user) => user._id === action.payload._id)
    },
  },
})

const { reducer: usersReducer, actions } = usersSlice
const {
  usersRequested,
  usersReceved,
  usersReguestField,
  authRequestSuccess,
  authRequestFaild,
  userCreated,
  userLoggedOut,
  userUpdate,
} = actions
const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/usercreateRequested')
const createUserFailed = createAction('users/createUserFailed')
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')

export const login =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
      const data = await authService.login({ email, password })
      dispatch(authRequestSuccess({ userId: data.localId }))
      localstorageService.setTokens(data)
      history.push(redirect)
    } catch (error) {
      dispatch(authRequestFaild(error.message))
    }
  }

export const singUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.register({ email, password })
      localstorageService.setTokens(data)
      dispatch(authRequestSuccess({ userId: data.localId }))
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: randomInt(1, 5),
          completedMeetings: randomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest,
        })
      )
    } catch (error) {
      dispatch(authRequestFaild(error.message))
    }
  }

export const getUpdateUserData = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested())
  try {
    const { content } = await userService.getUpdateCurrentUser(payload)
    dispatch(userUpdate(content))
    history.push(`/users/${content._id}`)
  } catch (error) {
    dispatch(userUpdateFailed(error.message))
  }
}

export const logOut = () => (dispatch) => {
  localstorageService.removeAuthData()
  dispatch(userLoggedOut())
  history.push('/')
}
function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested())
    try {
      const { content } = await userService.create(payload)
      console.log(content)
      dispatch(userCreated(content))
      history.push('/users')
    } catch (error) {
      dispatch(createUserFailed(error.message))
    }
  }
}

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const { content } = await userService.get()
    dispatch(usersReceved(content))
  } catch (error) {
    dispatch(usersReguestField(error.message))
  }
}
export const getUsers = () => (state) => state.users.entities

export const getUsersLoadingStatus = () => (state) => state.users.isLoading

export const getUsersById = (userIds) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userIds)
  }
}
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn

export const getDataStatus = () => (state) => state.users.dataLoaded

export const getCurrentUserId = () => (state) => state.users.auth.userId

export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null
}

export default usersReducer
