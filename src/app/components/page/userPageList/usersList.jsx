import React from 'react';
import PropTypes from 'prop-types'

const UsersList = ({ users }) => {
  console.log(users);
  return (<>
    {users.map((user) => (<h3 key={user.id}>{user.label}</h3>))}
  </>)
}
UsersList.propTypes = {
  users: PropTypes.array
}

export default UsersList;
