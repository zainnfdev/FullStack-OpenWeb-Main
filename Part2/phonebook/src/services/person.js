import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

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


/*
Initial data base data to test delete functionality - to copy paste to re initiate 
{
  "persons": [
    { 
      "name"  : "Arto Hellas", 
      "number": "040-123456", 
      "id"    : 1 
    },    
    { 
      "name"  : "Ada Lovelace", 
      "number": "39-44-5323523",
      "id"    : 2
    },
    { 
      "name"  : "Dan Abramov", 
      "number": "12-43-234345", 
      "id"    : 3 
    },
    { 
      "name"  : "Mary Poppendieck", 
      "number": "39-23-6423122", 
      "id"    : 4 
    }
  ]
}
*/