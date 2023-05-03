import React from 'react';
import PropTypes from 'prop-types'
import Qualitie from './qualitie'
import { useQuality } from '../../../hooks/useQuality';

const QualitiesList = ({ qualities }) => {

  const { isLoading, getQuality, quality } = useQuality()

  console.log(qualities.join(''), 'qualities');

  console.log(quality, 'quality');
  if (!isLoading) {
    const q = [getQuality(qualities.join())]
    console.log(q);
    return <>
      {quality.map((qual) => (
        <Qualitie key={qual._id} {...qual} />
      ))}
    </>
  }
  else { return 'Loading...' }

}
QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList;

