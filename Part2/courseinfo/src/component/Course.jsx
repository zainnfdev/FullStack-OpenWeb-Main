const Course = ({course}) => {
    return (
      <div>
        <h1>Web development curriculum</h1>
        <Header course={course[0].name} />
        <Content parts={course[0].parts}/>
        <Total parts={course[0].parts} />
        <Header course={course[1].name} />
        <Content parts={course[1].parts}/>
        <Total parts={course[1].parts} />
      </div>
    )
  }
  
  const Header = ({course}) => <p style={{fontSize: '22px'}} ><strong>{course}</strong></p>
  
  const Content = (props) => {  
    const {parts} = props; 
    return (
      <div>
      {
        parts.map(part =><Part key={part.id} name={part.name} exercises={part.exercises}/>)
      }
      </div>
    )
  }
  
  const Part = ({name,exercises}) => <p>{name} {exercises}</p> 
  
  const Total = (prop) => {
    const {parts} = prop; 
    const totalExcercise = parts.reduce((sum,part)=> sum + part.exercises,0);  
    return(
      <p style={{fontSize: '18px'}}><strong>total of {totalExcercise} excercises</strong></p>
    )
  }

export default Course; 