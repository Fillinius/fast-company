import React, { useContext, useEffect, useState } from 'react';
import professionService from '../services/professtion.service';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';


const ProfessionContext = React.createContext()


export const useProfession = () => {
  return useContext(ProfessionContext)
}

export const ProfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProfessionsList()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  function getProfession(id) {
    return professions.find((profession) => profession._id === id)
  }

  async function getProfessionsList() {
    try {
      const { content } = await professionService.get()
      setProfessions(content)
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
    <ProfessionContext.Provider value={{ professions, isLoading, getProfession }}>
      {children}
    </ProfessionContext.Provider>
  )
}
ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
