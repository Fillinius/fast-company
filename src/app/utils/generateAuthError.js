export function generateAuthError(message) {
  switch (message) {
    case 'INVALID_PASSWORD':
      return 'Не верный пароль'
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      return 'Слишком много попыток ввода, попробуйте позже'
    case 'EMAIL_EXISTS':
      return 'Пользователь с такой почтой уже зарегистрирован или не зарегистрирован'
    case 'INVALID_EMAIL':
      return 'Не верная почта'
    default:
  }
}

//     if (message === 'INVALID_PASSWORD') {
//       const errorObject = { email: 'Не верный пароль' }
//       throw errorObject
//     }
//     if (message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
//       const errorObject = {
//         email: 'Слишком много попыток ввода, попробуйте позже',
//       }
//       throw errorObject
//     }
//     if (message === 'EMAIL_EXISTS') {
//       const errorObject = {
//         email:
//           'Пользователь с такой почтой уже зарегистрирован или не зарегистрирован',
//       }
//       throw errorObject
//     }
//   }
// }
