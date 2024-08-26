import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const creatRecord = (newRecord) => {
    const request = axios.post(baseUrl,newRecord)
    return request.then(response => response.data)
}

const deleteRecord = (record) => {
    const request = axios.delete(`${baseUrl}/${record.id}`)
    return request.then(response => response.data)
}

const updateRecord = (id,updatedRecord) => {
    const request = axios.put(`${baseUrl}/${id}`,updatedRecord)
    return request.then(response => response.data)
}

export default { getAll,creatRecord,deleteRecord,updateRecord }