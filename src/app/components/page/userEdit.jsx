import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MultiSelectField from '../common/form/multiSelectField';
import RadioField from '../common/form/radioField';
import SelectedField from '../common/form/selectedField';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator'
import { useQuality } from '../../hooks/useQuality';
import { useProfession } from '../../hooks/useProfession';
import { useAuth } from '../../hooks/useAuth';


const UserEdit = () => {
  const { userId } = useParams()
  const history = useHistory()
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser, getUpdateUserData } = useAuth()
  const [data, setData] = useState()
  const { qualities, isLoading: qualityIsLoading } = useQuality()
  const { professions, isLoading: professionIsLoading } = useProfession()
  // console.log(professions, 'profession');
  // console.log(qualities, 'qualities')
  console.log(data, 'data');
  // console.log(currentUser);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false)
    }
  }, [data])
  const transformData = () => getQualities(currentUser.qualities).map((q) => ({ label: q.name, value: q._id }))
  useEffect(() => {
    if (!qualityIsLoading && !professionIsLoading && !data && currentUser) {
      setData({
        ...currentUser
        , qualities: transformData(currentUser.qualities)
      })
      console.log(data);
    }
  }, [qualityIsLoading, professionIsLoading, data, currentUser,])

  // блок событие ввода данных в форму
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  function getQualities(elements) {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        // console.log(elem);
        // console.log(qualities._id);
        if (elem === qualities._id) {
          qualitiesArray.push(quality)
        }
      }
    }
    return qualitiesArray;

  }
  const qualitiesList = qualities.map((qualitie) => ({
    label: qualitie.name,
    value: qualitie._id
  }))
  const professionList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id
  }))

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value)
    };
    try {
      console.log(newData);
      await getUpdateUserData(newData);
      history.push(`/users/${userId}`);
    } catch (error) {
      setErrors(error);
    }
  };
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

    <div className='m-5'>
      {!isLoading && professions && qualities ? (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Почта"
            value={data.email}
            name="email"
            onChange={handleChange}
            error={errors.email} />
          <TextField
            label="Name"
            type="text"
            value={data.name}
            name="name"
            onChange={handleChange}
            error={errors.name}
          />
          <SelectedField
            label="Выберите Вашу профессию"
            name="profession"
            value={data.profession._id}
            onChange={handleChange}
            options={professionList}
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
            options={qualitiesList}
            defaultValue={data.qualities}
            onChange={handleChange}
            label="Выберите Ваши качества" />

          <button
            className="btn btn-primary w-100 mx-auto"
            type='submit'
            disabled={!isValid}
          >
            Submit</button>
        </form>
      ) : 'Loading...'
      }
    </div>
  );
}

export default UserEdit;