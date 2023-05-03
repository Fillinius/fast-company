import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import qualityService from '../services/qualityService';
import { toast } from 'react-toastify';

const QualityContext = React.createContext()

export const useQuality = () => {
  return useContext(QualityContext)
}

export const QualityProvider = ({ children }) => {
  const [quality, setQuality] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getQualityList()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  function getQuality(id) {
    return quality.find((q) => q._id === id)
  }

  async function getQualityList() {
    try {
      const { content } = await qualityService.get()
      setQuality(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }
  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }
  return (
    <QualityContext.Provider value={{ quality, isLoading, getQuality }}>
      {children}
    </QualityContext.Provider>
  )
}
QualityProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}