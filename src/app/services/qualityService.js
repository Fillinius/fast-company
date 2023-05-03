import httpService from './http.service'

const qualityEndPoind = 'quality'
const qualityService = {
  get: async () => {
    const { data } = await httpService.get(qualityEndPoind)
    return data
  },
}
export default qualityService
