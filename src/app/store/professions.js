import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/professtion.service'

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true
    },
    professionsReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    professionsReguestField: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

const { reducer: professionsReducer, actions } = professionsSlice
const { professionsRequested, professionsReceved, professionsReguestField } =
  actions
export const loadProfessionsList = () => async (dispatch) => {
  dispatch(professionsRequested())
  try {
    const { content } = await professionService.get()
    dispatch(professionsReceved(content))
  } catch (error) {
    dispatch(professionsReguestField(error.message))
  }
}
export const getProfessions = () => (state) => state.professions.entities

export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading
export const getProfessionById = (professionIds) => (state) => {
  if (state.professions.entities) {
    for (const profession of state.professions.entities) {
      if (profession._id === professionIds) {
        return profession
      }
    }
  }
  return {}
}

export default professionsReducer
