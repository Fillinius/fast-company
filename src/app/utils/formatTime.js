function formatTime(data) {
  const date = new Date(parseInt(data))
  const dateNow = new Date()
  const yearDif = dateNow.getFullYear() - date.getFullYear()
  const dayDif = dateNow.getDay() - date.getDay()
  const hoursDif = dateNow.getHours() - date.getHours()
  const minDif = dateNow.getMinutes() - date.getMinutes()

  if (yearDif === 0) {
    if (dayDif === 0) {
      if (hoursDif === 0) {
        if (minDif >= 0 && minDif < 5) return '1 минуту назад'
        if (minDif >= 5 && minDif < 10) return '5'
        if (minDif > 10 && minDif < 30) return '10'

        return '30'
      }
      return `${date.getHours()}:${date.getMinutes()}`
    }
    return `${date.getMonth() + 1} ${date.getFullYear()}`
  }
  return `${date.getDay()} ${date.getMonth() + 1} ${date.getFullYear()}`
}
export default formatTime
