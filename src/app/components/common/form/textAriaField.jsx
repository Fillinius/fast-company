import React from 'react';
import PropTypes from 'prop-types'


const TextArisField = ({ label, type, value, name, onChange, error }) => {

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  }

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group">
        <input
          type={type}
          id={name}
          value={value}
          name={name}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}

TextArisField.defaultProps = {
  type: "text"
}
TextArisField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func
}
export default TextArisField;
