import React from 'react';
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';
import CommementsListComponent from './commmentsListComponent';
import QualitiesCard from '../../ui/qualitiesCard';
import CompletedMeetingsCard from '../../ui/complietedMeettingsCard';
import UserCard from '../../ui/userCard';
import { useUser } from '../../../hooks/useUsers';
import { CommentsProvider } from '../../../hooks/useComments';

const User = () => {
  const params = useParams()
  const { userId } = params
  const { getUserById } = useUser()
  const user = getUserById(userId)
  // const [user, setUser] = useState()
  // useEffect(() => {
  //   api.users.getById(userId).then((data) => setUser(data))
  // }, [])
  return (
    user
      ? <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} userId={userId} />
            <QualitiesCard data={user.qualities} />
            <CompletedMeetingsCard data={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <CommentsProvider>
              <CommementsListComponent />
            </CommentsProvider>
          </div>
        </div>
      </div>

      : <> <p>Loading...</p>

      </>
  );
}
User.propTypes = {
  match: PropTypes.object.isRequired,
}
export default User;
/*
<div className='m-5'>
        <h1> {user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button onClick={handleClick}> Edit</button>
      </div>
*/
