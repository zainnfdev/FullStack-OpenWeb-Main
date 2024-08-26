import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Course from './component/Course'


const App = ()  => {
  
  const course = [
    {
    id : 1,
    name : 'Half Stack application development',
    parts : [
      {
        name : 'Fundamentals of react', 
        exercises : 10, 
        id : 1
      },
      {
        name : 'Using props to pass data',
        exercises : 7,
        id : 2
      },
      {
        name : 'State of a component',
        exercises : 14,
        id : 3
      },
      {
        name : 'Redux',
        exercises : 11,
        id : 4
      }
    ]
  },
  {
    name : 'Node.js',
    id : 2, 
    parts : [
      {
        name : 'Routing',
        exercises : 3,
        id :1
      },
      {
        name : 'Middlewares',
        exercises : 7,
        id : 2
      }
    ]
  }
 ]

  return <Course course={course} /> 
}


export default App;