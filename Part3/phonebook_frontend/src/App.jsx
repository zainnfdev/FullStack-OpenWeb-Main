import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonFrom from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/person';


const App = () => {

  const defaultMessage = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  //State declarionts 
  const [ person,setPerson ] = useState([]); 
  const [ newName,setNewName ] = useState(''); 
  const [ newNumber,setNewNumber ] = useState('');
  const [ search,setSearch ] = useState(''); 
  const [ showAll,setShowAll ] = useState(true);  
  const [ filteredList,setFilteredList ] = useState([]); 
  const [ message,setMessage ] = useState(null);
  const [ messageStyle,setMessageStyle ] = useState(defaultMessage);

  //Importing data from the JSON server 
  useEffect(() => {
    personService.getAll().then(initialRecords => setPerson(initialRecords));
  },[]);
  
  //Event Handlers
  const handelNameChange = (event) => {
    setNewName(event.target.value); 
  }
  const handelNumberChange = (event) => {
    setNewNumber(event.target.value); 
  }
  const handelSearch = (event) => {
    if(event.target.value === ' '){
      setShowAll(true);
    } else {
      setSearch(event.target.value); 
      setShowAll(false); 
      const newPersonArray = person.slice();
      setFilteredList(newPersonArray.filter((p) => p.name.includes(search)));
    }
  }

  const displayNotification = (color,message) => {
    const updatedStyle = {...messageStyle,color: color ,borderColor: color} 
      setMessageStyle(updatedStyle); 
      setMessage(message)
      setTimeout(()=> {
            setMessage(null)
      },5000)
  }

  const addPerson = (event) => {
    event.preventDefault(); 
    const nameAlreadyExist = (person.some(p => p.name === newName)); 
    const numberAlreadyExist = (person.some(p => p.number === newNumber));

    if(nameAlreadyExist){
      const existingPerson = person.find(p => p.name === newName);
      const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one ?`);
      if(confirmation){
        if(numberAlreadyExist){
          alert(`${newNumber} is also same as the old one !`); 
        } else {
          const upDatedPerson = {
            ...existingPerson, number : newNumber
          }
          personService.updateRecord(upDatedPerson).then(() => {
            setPerson(previousPerson => previousPerson.map(p => p.id === upDatedPerson.id ? upDatedPerson : p))
          }).then(() => {
            const color = 'green';
            const message = `Number updated ${newNumber}`;
            displayNotification(color,message);
          }).catch(error => {
            const color = 'red';
            const message = error.response.data.error; 
            displayNotification(color,message);
          });
        }
      }
      setNewName('');
      setNewNumber('');
    } else {
      const newPerson = {
        name: newName,
        number : newNumber,
        id : person.length + 1
      }
      
      personService.createRecord(newPerson).then(record => {
        setPerson(person.concat(record)); 
        setNewName(''); 
        setNewNumber('');
      }).then(() => {
        const color = 'green';
        const message = `Added ${newName}`;
        displayNotification(color,message);
      }).catch(error => {
        const color = 'red';
        const message = error.response.data.error; 
        displayNotification(color,message);
      })
    }
  }

  const deleteRecordOf = (record) => {
    let confirmation = window.confirm(`Delete ${record.name} ?`); 
    if(confirmation){
      personService.deleteRecord(record).then(setPerson(person.filter(p => p.id !== record.id))).then(() => {
        const sucessfulStyle = {...messageStyle,color: 'green',borderColor: 'green'} 
        setMessageStyle(sucessfulStyle);
        setMessage(`${record.name} sucessfully delete from the server`)
        setTimeout(()=> {
          setMessage(null)
        },5000)
        }
      ).catch(error => {
        console.log('Inside : personService : deleteRecord',error.message);
        console.log('-------------------------');
          const unsucessfulStyle = {...messageStyle,color: 'red',borderColor: 'red'} 
          setMessageStyle(unsucessfulStyle); 
          setMessage(`${record.name} already delete from the server`); 
          setTimeout(()=> {
          setMessage(null)
          },5000)
        }
      );
    }
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <Notification message={message} messageStyle={messageStyle}/>
      <br/>
      <Filter search={search} handelSearch={handelSearch}/>
      <h3>add a new</h3>
      <PersonFrom newName={newName} newNumber={newNumber} handelNameChange={handelNameChange} handelNumberChange={handelNumberChange} addPerson={addPerson}/>
      <h3>Numbers</h3>
      <Persons person={person} filteredList={filteredList} showAll={showAll} deleteRecord={deleteRecordOf}/>    
    </div>  
  )
}

export default App;