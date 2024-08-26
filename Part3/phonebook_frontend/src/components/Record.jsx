/* eslint-disable react/prop-types */
const Record = ({person,deleteRecord}) => {
  const label = 'delete'; 
    return (
      <div>{person.map((record) => <p key={record.id}>{record.name} : {record.number} <button onClick={() => deleteRecord(record)}>{label}</button></p>)}</div>
    )
  } 

  export default Record; 