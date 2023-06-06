import React from 'react';
import { useSelector } from "react-redux";
// import React, { useProfession } from "../../hooks/useProfession";
import PropTypes from 'prop-types';
import { getProfessionById, getProfessionsLoadingStatus, } from "../../store/professions";

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoadingStatus())
  const getProfession = useSelector(getProfessionById(id))
  const prof = getProfession
  if (isLoading) return "Loading..."
  return <p>{prof.name}</p>

}
Profession.propTypes = {
  id: PropTypes.string
}

export default Profession;