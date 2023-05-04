import React from "react";
import PropTypes from 'prop-types';
import { useQuality } from '../../../hooks/useQuality'

const Qualitie = ({ id }) => {
    const { getQuality } = useQuality()
    const q = getQuality(id)
    return (
        <span className={"badge m-1 bg-" + q.color}>
            {q.name}
        </span>
    );
};
Qualitie.propTypes = {
    id: PropTypes.string.isRequired,

}
export default Qualitie;
