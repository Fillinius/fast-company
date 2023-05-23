import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userService from '../services/userService';
import { toast } from 'react-toastify';

const UserContext = React.createContext()

export const useUser = () => {
  return useContext(UserContext)
}

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  //console.log(users);
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function getUsers() {
    try {
      const { content } = await userService.get()
      //console.log(content);
      setUsers(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }
  function getUserById(userId) {
    return users.find((user) => user._id === userId)
  }
  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : "Loading ..."}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
export default UserProvider