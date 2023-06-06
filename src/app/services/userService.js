import httpService from './http.service'
import localstorageService from './localstorage.service'

const userEndPoint = 'user/'

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndPoint)
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndPoint + payload._id, payload)
    return data
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndPoint + localstorageService.getUserId()
    )
    return data
  },
  getUpdateCurrentUser: async (params) => {
    const { data } = await httpService.patch(
      userEndPoint + localstorageService.getUserId(),
      params
    )
    return data
  },
}

export default userService
