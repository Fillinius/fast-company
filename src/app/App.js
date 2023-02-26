import React, { useState, useEffect } from 'react'
import Users from './components/users'
import api from './api'

function App() {
  const [users, setUsers] = useState()
  // При использовании асинхронного запроса
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])
  useEffect(() => {
    console.log(users)
  }, [users])
  //
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark }
        }
        return user
      })
    )
  }
  return (
    <div>
      {users && (
        <Users
          onDelete={handleDelete}
          onToggleBookMark={handleToggleBookMark}
          users={users}
        />
      )}
    </div>
  )
}

export default App
