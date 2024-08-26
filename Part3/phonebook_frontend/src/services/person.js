import axios from "axios";

const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl); 
    return request.then(response => response.data); 
}

const createRecord = (newPerson) => {
    const request = axios.post(baseUrl,newPerson);
    return request.then(response => response.data);
}

const deleteRecord = (record) => {
    const request = axios.delete(`${baseUrl}/${record.id}`);
    return request.then(response => response.data);
} 

const updateRecord = (person) => {
    const request = axios.put(`${baseUrl}/${person.id}`,person);
    return request.then(response => response.data);
}

export default { getAll,createRecord,deleteRecord,updateRecord }