import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import userService from '../services/userService';
import { toast } from 'react-toastify';
import { setTokens } from '../services/localstorage.service';

const httpAuth = axios.create()
const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  console.log(currentUser);
  const [error, setError] = useState(null)

  async function singUp({ email, password, ...rest }) {
    const keyFireBasePvivate = 'AIzaSyCnZHvEM4ehUF5fJgct0GgWULnHMLLLADk'
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${keyFireBasePvivate}`
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })

      setTokens(data)

      await createUser({ _id: data.localId, email, ...rest })
      console.log(data)
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      console.log(code, message);
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = { email: "Пользователь с такой почтой уже зарегистрирован" }
          throw errorObject
        }

      }
    }
  }
  async function createUser(data) {
    try {
      const { content } = userService.create(data)
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
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
    <AuthContext.Provider value={{ singUp, createUser }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
export default AuthProvider
