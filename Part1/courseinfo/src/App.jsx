import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const App = () => {

  const course =  { name : 'Half Stack application development',
    parts : [
      { 
        name :'Fundamentals of React',
        exercises : 10 },
      { 
       name : 'Using props to pass data',
       exercises : 7 }, 
      { 
      name : 'State of a component',
      exercises : 14 }
    ]
  };

  return (

    <div>
    <Header course={course.name} />
    <Content courseInfo= {course.parts}/>
    <Total courseInfo= {course.parts}/>
    </div>
  )
}
//Header, Content, Total are components
const Header = (props) => { 
  console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
//Refactoring the Content component
const Content = (props) => {
  console.log(props);
  const parts = props.courseInfo;
  return (
    <div>
          {
            parts.map((part,index) => (
              <Part key={index} partName={part.name} exercisesNumber={part.exercises} />
            ))
          }
    </div>
  )
}

const Total = (props) => {
  console.log(props);
  const parts = props.courseInfo;
  const totalExercises = parts.reduce((total, part) => total + part.exercises,0); 
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  )
}

const Part = (props) => {
  console.log(props);
  return (
    <div>
      <p>{props.partName} {props.exercisesNumber}</p>
    </div>
  )
}

export default App; 
