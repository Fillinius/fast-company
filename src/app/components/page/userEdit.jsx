import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
//import api from '../../api'
//import CheckBoxField from '../common/form/checkBoxField';
import MultiSelectField from '../common/form/multiSelectField';
import RadioField from '../common/form/radioField';
import SelectedField from '../common/form/selectedField';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator'
import API from '../../api';


const UserEdit = () => {
  const { userId } = useParams()
  const history = useHistory()
  const [user, setUser] = useState({
    email: "",
    name: "",
    profession: "",
    sex: "male",
    qualities: []
  })
  console.log(user);
  const [qualities, setQualities] = useState([])
  const [professions, setProfession] = useState([])
  const [errors, setErrors] = useState({}) // к блоку ошибка
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser((prevState) => ({
      ...prevState,
      ...data,
      profession: data.profession._id,
      qualities: data.qualities.map((qualitie) => ({
        label: qualitie.name,
        value: qualitie._id
      })),
    })))
    API.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfession(professionsList);
    });
    API.qualities.fetchAll().then((data) => {
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
    setUser((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  // Блок событие отправка формы
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = user;
    API.users.update(userId, {
      ...user,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    }).then(() => { history.push(`/users/${userId}`) })


  }
  // блок валидации по полю
  useEffect(() => {
    validate()
  }, [user])
  const validate = () => {
    const errors = validator(user, validatorConfig)
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
    <div className='m-5'>
      {user._id && professions && qualities && (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Почта"
            value={user.email}
            name="email"
            onChange={handleChange}
            error={errors.email} />
          <TextField
            label="Name"
            type="text"
            value={user.name}
            name="name"
            onChange={handleChange}
            error={errors.name}
          />
          <SelectedField
            label="Выберите Вашу профессию"
            name="profession"
            value={user.profession._id}
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
            value={user.sex}
            label="Выберите Ваш пол"
          />
          <MultiSelectField
            name="qualities"
            options={qualities}
            defaultValue={user.qualities}
            onChange={handleChange}
            label="Выберите Ваши качества" />

          <button
            className="btn btn-primary w-100 mx-auto"
            type='submit'
            disabled={!isValid}
          >
            Submit</button>
        </form>
      )

      }

    </div>
  );
}

export default UserEdit;

