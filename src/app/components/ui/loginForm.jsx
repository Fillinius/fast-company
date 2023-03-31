import React, { useState, useEffect } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import CheckBoxField from '../common/form/checkBoxField';
//import * as yup from 'yup'

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false })
  const [errors, setErrors] = useState({}) // к блоку ошибка
  // блок событие ввода данных в форму
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  //модуль yup
  /*
  const validateSchema = yup.object().shape({
    password: yup
      .string()
      .required("Пароль обязателен  к заполнению")
      .matches(/^(?=.*[A-Z])/, "Пароль должен содержать минимум одну заглавную букву")
      .matches(/(?=.*[0-9])/, "Пароль должен содержать минимум одну цифру")
      .matches(/(?=.*[!@#$%^&*])/, "Пароль должен содержать один из специальных символов (!@#$%^&*)")
      .matches(/(?=.{8,})/, "Пароль должен содержать не менее 8 символов"),
    email: yup
      .string()
      .required("Электронная почта обязательна  к заполнению")
      .email("Email введен некорректно")
  })
  */
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
    /*
    validateSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }))
    */
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


    <form onSubmit={handleSubmit}>
      <TextField
        label="Почта"
        value={data.email}
        name="email"
        onChange={handleChange}
        error={errors.email} />
      <TextField
        label="Пароль"
        type="password"
        value={data.password}
        name="password"
        onChange={handleChange}
        error={errors.password} />
      <CheckBoxField
        name="stayOn"
        value={data.stayOn}
        onChange={handleChange}>
        Оставаться в системе
      </CheckBoxField>
      <button
        className="btn btn-primary w-100 mx-auto"
        type='submit'
        disabled={!isValid}
      >
        Submit</button>
    </form>

  );
}

export default LoginForm;