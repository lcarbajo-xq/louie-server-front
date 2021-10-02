import { BASE_URLS } from '../constants/endpoints'

export const getItemsFromDB = (name = '', limit = 20, page = 0) => {
  const url = `${BASE_URLS[name]}?limit=${limit}&skip=${page}`
  return fetch(url).then((json) => json.json())
}
