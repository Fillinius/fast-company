import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
//import { Link } from 'react-router-dom';
import api from '../../../api';
import { useParams } from 'react-router-dom';
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";


const User = () => {
  const params = useParams()
  const history = useHistory()
  const { userId } = params
  const [user, setUser] = useState()
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])
  const handleClick = () => {
    history.push(`${userId}/edit`)
  }
  return (
    user
      ? <div className='m-5'>
        <h1> {user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button onClick={handleClick}> Edit</button>
      </div>
      : <>
        <p>Loading...</p>

      </>
  );
}

User.propTypes = {
  match: PropTypes.object.isRequired,

}
export default User;

/*
<>
        <p>{`Имя: ${user.name}`}</p>
        <p>{`Профессия: ${user.profession.name}`}</p>
        <p>{user.qualities.map((qualitie) => <p key={qualitie.id} className={`badge text-wrap bg-${qualitie.color}`}>{qualitie.name}</p>)}</p>
        <p>{`Встретился раз: ${user.completedMeetings}`}</p>
        <p>{`Оценка: ${user.rate}`}</p>

        <Link to={`${userId}/edit`} type="button" className="btn btn-info">Edit</Link>
      </>
*/
