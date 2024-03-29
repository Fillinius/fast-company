import React, { useState } from 'react';
import PropTypes from 'prop-types'


const TextField = ({ label, type, value, name, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })

  }

  const logoShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  }// состояние класса, цвет формы

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group">
        <input
          type={showPassword ? "text" : type}
          id={name}
          value={value}
          name={name}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {type === 'password' &&
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={logoShowPassword}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash-fill" : "")}></i>
          </button>
        }
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}

TextField.defaultProps = {
  type: "text"
}
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func
}
export default TextField;