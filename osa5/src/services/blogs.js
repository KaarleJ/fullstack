import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNew = async ({ title, author, url, id }) => {
  const response = await axios.post(baseUrl, { title, author, url, userId: id }, { headers: { 'Authorization': token } })
  return response.data
}

const update = async ({ title, author, url, likes, id }) => {
  const targetUrl = `${baseUrl}/${String(id)}`
  const response = await axios.put(targetUrl, { title, author, url, likes, userId: id }, { headers: { 'Authorization': token } })
  return response.data
}

const remove = async ({ id }) => {
  const targetUrl = `${baseUrl}/${String(id)}`
  const response = await axios.delete(targetUrl, { headers: { 'Authorization': token } })
  return response.data
}


export default { getAll, setToken, postNew, update, remove }