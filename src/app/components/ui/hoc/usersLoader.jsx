//В данном проекте  ИСПОЛЬЗУЕТСЯ НЕ КАК ПО УРОКУ т.к. нет компонента UserList

import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsersList } from "../../../store/users";
import { useEffect } from "react";
import { loadQualitiesList } from "../../../store/qualities";
import PropTypes from 'prop-types';
import { loadProfessionsList } from "../../../store/professions";

const UsersLoader = ({ children }) => {
  const dataStatus = useSelector(getDataStatus())
  const dispatch = useDispatch()
  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadQualitiesList())
    }
    dispatch(loadProfessionsList())
    dispatch(loadUsersList())
  }, [dataStatus])
  if (!dataStatus) return 'Loading...'
  return children
}
UsersLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default UsersLoader;