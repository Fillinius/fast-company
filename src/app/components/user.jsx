import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import api from '../api'


const User = ({ match }) => {
  const userId = match.params.userId
  const [user, setUser] = useState()
  useEffect(() => {
    api.users.getUsersById(userId).then((data) => setUser(data))
  }, [])

  return (
    user
      ? <>
        <p>{`Имя: ${user.name}`}</p>
        <p>{`Профессия: ${user.profession.name}`}</p>
        <p>{user.qualities.map((qualitie) => <p key={qualitie.id} className={`badge text-wrap bg-${qualitie.color}`}>{qualitie.name}</p>)}</p>
        <p>{`Встретился раз: ${user.completedMeetings}`}</p>
        <p>{`Оценка: ${user.rate}`}</p>

        <Link to="/users" type="button" className="btn btn-info">Список пользователей</Link>
      </>
      : <>
        <p>Loading...</p>

      </>
  );
}

User.propTypes = {
  match: PropTypes.object.isRequired,

}
export default User;
