/* eslint-disable react/prop-types */
const PersonFrom = (props) => {
    const { newName,newNumber,handelNameChange,handelNumberChange,addPerson } = props; 
    return(
      <form onSubmit={addPerson}>
          <div> name : <input id ="name" value={newName} onChange={handelNameChange}/> </div>
          <div> number : <input id="number" value={newNumber} onChange={handelNumberChange}/> </div>
          <div><button type="submit">add</button></div>
      </form>
    )
  }

  export default PersonFrom; 