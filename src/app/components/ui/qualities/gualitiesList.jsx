import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import Qualitie from './qualitie'
import { useDispatch, useSelector } from 'react-redux';
import { getQualitiesById, getQualitiesLoadingStatus, loadQualitiesList } from '../../../store/qualities';

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getQualitiesLoadingStatus())
  const QualitiesList = useSelector(getQualitiesById(qualities))
  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])
  if (isLoading) return 'Loading...'

  return <>
    {QualitiesList.map((qual) => (
      <Qualitie key={qual._id} {...qual} />
    ))}
  </>
}
QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList;

