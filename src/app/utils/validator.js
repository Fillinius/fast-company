export function validator(data, config) {
  const errors = {}
  function validate(validateMethod, data, config) {
    let statusValidate
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean') {
          statusValidate = !data
        } else {
          statusValidate = data.trim() === ''
        }
        break
      }
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g
        statusValidate = !emailRegExp.test(data)
        break
      }
      case 'isUpperCase': {
        const upperCase = /[A-Z]+/g
        statusValidate = !upperCase.test(data)
        break
      }
      case 'isNumber': {
        const number = /\d+/g
        statusValidate = !number.test(data)
        break
      }
      case 'isMinWord': {
        const word = data.length
        statusValidate = word <= data.value
        break
      }
      default:
        break
    }
    if (statusValidate) return config.message
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      )
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }
  return errors
}
