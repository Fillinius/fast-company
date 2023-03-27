import React, { useState, useEffect } from 'react';
import TextField from './textField';
import { validator } from '../utils/validator';

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({}) // к блоку ошибка
  // блок событие ввода данных в форму
  const hahdleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  // Блок событие отправка формы
  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()  // относится к блок ошибка
    if (!isValid) return        // относится к блок ошибка
    console.log(data);
  }
  // блок валидации по полю
  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0

  // блок валидатор
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна  к заполнению"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен  к заполнению"
      },
      isUpperCase: {
        message: "Пароль должен содержать минимум одну заглавную букву"
      },
      isNumber: {
        message: "Пароль должен содержать минимум одну цифру"
      },
      isMinWord: {
        message: "Пароль должен содержать минимум 8 символов"
      }
    }

  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Почта"
              value={data.email}
              name="email"
              onChange={hahdleChange}
              error={errors.email} />
            <TextField
              label="Пароль"
              type="password"
              value={data.password}
              name="password"
              onChange={hahdleChange}
              error={errors.password} />
            <button
              className="btn btn-primary w-100 mx-auto"
              type='submit'
              disabled={!isValid}
            >
              Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;