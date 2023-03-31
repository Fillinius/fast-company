import React, { useState, useEffect } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator'
import api from '../../api'
import SelectedField from '../common/form/selectedField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';


const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
  })
  const [qualities, setQualities] = useState([])
  const [professions, setProfession] = useState([])
  const [errors, setErrors] = useState({}) // к блоку ошибка
  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfession(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    })
  }, [])
  // useEffect(() => {console.log(professions)}, [professions])
  // блок событие ввода данных в форму
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  // Блок событие отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    })       // относится к блок ошибка
    const getProfessionById = (id) => {
      for (const prof of professions) {
        if (prof.value === id) {
          return { _id: prof.value, name: prof.label };
        }
      }
    };
    const getQualities = (elements) => {
      const qualitiesArray = [];
      for (const elem of elements) {
        for (const quality in qualities) {
          if (elem.value === qualities[quality].value) {
            qualitiesArray.push({
              _id: qualities[quality].value,
              name: qualities[quality].label,
              color: qualities[quality].color
            });
          }
        }
      }
      return qualitiesArray;
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
        error={errors.password}
      />
      <SelectedField
        label="Выберите Вашу профессию"
        name="profession"
        value={data.profession}
        onChange={handleChange}
        options={professions}
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
        options={qualities}
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