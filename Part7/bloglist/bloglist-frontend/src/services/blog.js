import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createRecord = async (newObject) => {
  const config = {
    headers : { Authorization : token }
  }
  const response = await axios.post(baseUrl,newObject,config)
  return response.data
}

const updateRecord = async (updateObject) => {
  const config = {
    headers : { Authorization : token }
  }
  const response = await axios.put(`${baseUrl}/${updateObject.id}`,updateObject,config)
  return response.data
}

const deleteRecord = async (recordToDelete) => {
  const config = {
    headers : { Authorization : token }
  }
  const response = await axios.delete(`${baseUrl}/${recordToDelete.id}`,config)
  return response.data
}

export default { getAll,createRecord,setToken,updateRecord,deleteRecord }