/* eslint-disable react/prop-types */
import Record from "./Record";

const Persons = (props) => {
    const {person,filteredList,showAll,deleteRecord} = props; 
    return (
      <div>{showAll? <Record person={person} deleteRecord={deleteRecord}/> : <Record person={filteredList} deleteRecord={deleteRecord}/>}</div>
    )
  }

  export default Persons; 