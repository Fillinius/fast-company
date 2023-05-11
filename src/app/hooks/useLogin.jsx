import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { setTokens } from '../services/localstorage.service';
import { toast } from 'react-toastify';
import axios from 'axios';

const httpAuth = axios.create()
const LoginContext = createContext()

export const useLogin = () => {
  return useContext(LoginContext)
}

const LoginProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const keyFireBasePvivate = 'AIzaSyCnZHvEM4ehUF5fJgct0GgWULnHMLLLADk'
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${keyFireBasePvivate}`

  async function login({ email, password }) {
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })
      console.log(data);
      setTokens(data)
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      console.log(code, message);
      if (code === 400) {
        if (message === 'EMAIL_NOT_FOUND') {
          const errorObject = { email: "Пользователь с такой почтой не зарегистрирован" }
          throw errorObject
        }

      }
    }
  }
  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  return (
    <LoginContext.Provider value={{ login }}>
      {children}
    </LoginContext.Provider>
  )
}
LoginProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default LoginProvider