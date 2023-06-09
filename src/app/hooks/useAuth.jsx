import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import userService from '../services/userService';
import { toast } from 'react-toastify';
import localstorageService, { setTokens } from '../services/localstorage.service';
import { useHistory } from 'react-router-dom';
import randomInt from '../utils/getRandomInt';

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})
const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  // console.log(currentUser);
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const history = useHistory()

  function logOut() {
    localstorageService.removeAuthData()
    setCurrentUser(null)
    history.push('/')
  }
  // ф-я проверки пользователя
  async function login({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword?`, {
        email,
        password,
        returnSecureToken: true
      })
      // console.log(data);
      setTokens(data)
      await getUserData()

    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      console.log(code, message);
      if (code === 400) {
        if (message === 'EMAIL_NOT_FOUND') {
          const errorObject = { email: "Пользователь с такой почтой не зарегистрирован" }
          throw errorObject
        }
        if (message === 'INVALID_PASSWORD') {
          const errorObject = { email: "Не верный пароль" }
          throw errorObject
        }
        if (message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
          const errorObject = { email: "Слишком много попыток ввода, попробуйте позже" }
          throw errorObject
        }

      }
    }
  }
  // ф-я регистрации пользователя
  async function singUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true
      })

      setTokens(data)

      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(
          Math.random() + 1
        )
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      })
      // console.log(data)
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
      const { content } = await userService.create(data)
      // console.log(content);
      setCurrentUser(content)
    } catch (error) {
      console.log(error);
    }
  }
  function errorCatcher(error) {
    console.log(error.response);
    const { message } = error.response.data
    setError(message)
  }
  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser()
      // console.log(content);
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }
  async function getUpdateUserData(data) {
    try {
      const { content } = await userService.getUpdateCurrentUser(data)
      // console.log(content);
      setCurrentUser(content)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (localstorageService.getAccessToken()) {
      getUserData()
    } else {
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  return (
    <AuthContext.Provider value={{ currentUser, singUp, login, logOut, getUpdateUserData }}>
      {!isLoading ? children : "Loading..."}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
export default AuthProvider
