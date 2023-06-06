import React, { useState, useEffect } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator'
import SelectedField from '../common/form/selectedField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getQualities } from '../../store/qualities';
import { getProfessions } from '../../store/professions';


const RegisterForm = () => {
  const history = useHistory()
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    name: "",
    qualities: [],
    licence: false
  })
  // получение данных через хук
  const { singUp } = useAuth()

  const qualities = useSelector(getQualities())
  const qualityList = qualities.map((q) => ({
    label: q.name,
    value: q._id
  }))
  const professions = useSelector(getProfessions())
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }))
  const [errors, setErrors] = useState({}) // к блоку ошибка

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  // Блок событие отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const newData = { ...data, qualities: data.qualities.map((q) => q.value) }
    try {
      await singUp(newData)
      history.push('/')
    } catch (error) {
      setErrors(error)
    }

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
    name: {
      isRequired: {
        message: "имя обязательно  для заполнения"
      },
      isMinWord: {
        message: "Имя должено содержать минимум 3 символов",
        value: 3
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
        message: "Пароль должен содержать минимум 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите Вашу профессию"
      }
    },
    licence: {
      isRequired: {
        message: "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
      }
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        value={data.email}
        name="email"
        onChange={handleChange}
        error={errors.email} />
      <TextField
        label="Имя"
        value={data.name}
        name="name"
        onChange={handleChange}
        error={errors.name} />
      <TextField
        label="Пароль"
        type="password"
        value={data.password}
        name="password"
        onChange={handleChange}
        error={errors.password}
      />
      <SelectedField
        label="Выберите Вашу профессию"
        name="profession"
        value={data.profession}
        onChange={handleChange}
        options={professionsList}
        defaultOption="Choose..."
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" }
        ]}
        name="sex"
        onChange={handleChange}
        value={data.sex}
        label="Выберите Ваш пол"
      />
      <MultiSelectField
        name="qualities"
        options={qualityList}
        defaultValue={data.qualities}
        onChange={handleChange}
        label="Выберите Ваши качества" />
      <CheckBoxField
        name="licence"
        value={data.licence}
        onChange={handleChange}
        error={errors.licence}>
        Подтвердите лицензионное соглашение
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

export default RegisterForm;