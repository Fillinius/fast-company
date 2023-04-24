import React from 'react';
import PropTypes from 'prop-types'

const SelectedField = ({ label, value, onChange, defaultOption, options, error, name }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  }// состояние класса, цвет формы
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">{defaultOption}</option>
        {optionsArray.length > 0 && optionsArray.map((option) => (
          <option
            value={option.value}
            key={option.value}>
            {option.name}
          </option>))}


      </select>
      {error && <div className="invalid-feedback">
        {error}
      </div>}
    </div>
  );
}
SelectedField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  error: PropTypes.string
}
export default SelectedField;

/*
*/