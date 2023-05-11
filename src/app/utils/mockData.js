import professions from '../mockData/professions.json'
import users from '../mockData/users.json'
import qualities from '../mockData/qualities.json'
import { useEffect, useState } from 'react'
import httpService from '../services/http.service'

const useMockData = () => {
  const statusConst = {
    idle: 'Not started',
    pending: 'In process',
    successed: 'Ready',
    error: 'Error',
  }
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(statusConst.idle)
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)
  const symmeryCount = professions.length + qualities.length + users.length
  const incremenCount = () => {
    setCount((prev) => prev + 1)
  }
  const updateProgress = () => {
    if (count !== 0 && status === statusConst.idle) {
      setStatus(statusConst.pending)
    }
    const newProgress = Math.floor((count / symmeryCount) * 100)
    if (progress < newProgress) {
      setProgress(() => newProgress)
    }
    if (newProgress === 100) {
      setStatus(statusConst.successed)
    }
  }
  useEffect(() => {
    updateProgress()
  }, [count])
  async function initialize() {
    try {
      for (const prof of professions) {
        await httpService.put('profession/' + prof._id, prof)
        incremenCount()
      }
      for (const user of users) {
        await httpService.put('user/' + user._id, user)
        incremenCount()
      }
      for (const quality of qualities) {
        await httpService.put('quality/' + quality._id, quality)
        incremenCount()
      }
    } catch (error) {
      setError(error)
      setStatus(statusConst.error)
    }
  }
  return { error, initialize, progress, status }
}

export default useMockData
