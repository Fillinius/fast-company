//По данному проекту  не ИСПОЛЬЗУЕТСЯ , написан для ознакомления

import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from "../../../store/users";
import { useEffect } from "react";
import { loadQualitiesList } from "../../../store/qualities";
import PropTypes from 'prop-types';
import { loadProfessionsList } from "../../../store/professions";

const AppLoader = ({ children }) => {
  const dataStatus = useSelector(getDataStatus())
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const userStatusLoading = useSelector(getUsersLoadingStatus())
  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadQualitiesList())
    }
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
    if (isLoggedIn) {
      dispatch(loadUsersList())
    }
  }, [])
  if (!dataStatus) return 'Loading...'
  if (userStatusLoading) return 'Loading...'
  return children
}
AppLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AppLoader;