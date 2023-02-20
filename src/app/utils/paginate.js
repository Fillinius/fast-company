export function paginate(item, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize
  return [...item].splice(startIndex, pageSize)
} // метод разбиения на стр
