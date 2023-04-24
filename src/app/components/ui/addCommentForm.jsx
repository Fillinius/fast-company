import React, { useEffect, useState } from 'react';
import API from '../../api';
import { validator } from '../../utils/validator'
import PropTypes from 'prop-types';
import SelectedField from '../common/form/selectedField';
import TextAriaField from '../common/form/textAriaField'

const initialData = { userId: ' ', content: ' ' }

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialData)
  const [users, setUsers] = useState({})
  const [errors, setErrors] = useState({})
  const handleChangeComment = (target) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value
    }))
  }
  const validatorConfig = {
    userId: {
      isRequired: {
        message: 'Выберите имя'
      }
    },
    content: {
      isRequired: {
        message: 'Сообщение не может быть пустым'
      }
    }
  }
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  useEffect(() => {
    API.users.fetchAll().then(setUsers)
  }, [])
  const clearForm = () => {
    setData(initialData)
    setErrors({})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit(data)
    clearForm()
  }
  const arrayUsers =
    users &&
    Object.keys(users).map((userId) => ({
      name: users[userId].name,
      value: users[userId]._id
    }))
  return (
    <>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectedField
          onChange={handleChangeComment}
          options={arrayUsers}
          name='userId'
          value={data.userId}
          defaultOption='Выберите пользователя'
          error={errors.userId} />
        <TextAriaField
          onChange={handleChangeComment}
          name='content'
          value={data.content}
          label='Ваше Сообщение'
          error={errors.content}
        />
        <div className='d-flex '>
          <button className='btn btn-primary'>Enter</button>
        </div>
      </form>

    </>
  )
}
AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
}
export default AddCommentForm;