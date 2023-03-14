import React from 'react';
import PropTypes from 'prop-types'

const UsersList = ({ users }) => {
  console.log(users);
  return (<>
    {users.map((user) => (<h3 key={user.id}>{user.label}</h3>))}
  </>)
}

export default UsersList;
UsersList.propTypes = {
  users: PropTypes.array

}
