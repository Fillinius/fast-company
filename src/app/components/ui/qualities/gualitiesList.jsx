import React from 'react';
import PropTypes from 'prop-types'
import Qualitie from './qualitie'
import { useQuality } from '../../../hooks/useQuality';

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQuality()
  if (!isLoading) {
    return <>
      {qualities.map((qual) => (
        <Qualitie key={qual} id={qual} />
      ))}
    </>
  }
  else { return 'Loading...' }

}
QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList;

