import React, { useState } from 'react';
import { validator } from '../../../utils/validator'
import PropTypes from 'prop-types';
import TextAriaField from '../form/textAriaField'

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({})
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

  const clearForm = () => {
    setData({})
    setErrors({})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit(data)
    clearForm()
  }
  return (
    <>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <TextAriaField
          onChange={handleChangeComment}
          name='content'
          value={data.content || ''}
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