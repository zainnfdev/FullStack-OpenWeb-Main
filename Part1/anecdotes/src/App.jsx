import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const App = () => {

  const [ selected,setSelcted ] = useState(0); 
  const [ voteCount,setVoteCount ] = useState([0,0,0,0,0,0,0,0]); 

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const handelClick = () => {
    const randomeNumber = Math.floor(Math.random() * anecdotes.length); 
    setSelcted(randomeNumber); 
  }

  const countVotes = () => {
    const newVoteCount = [...voteCount];
    newVoteCount[selected] += 1; 
    setVoteCount(newVoteCount);
  }

  const indexOfMaxValue = (array) => {
      if(array.length === 0){
        return -1; 
      } else {
        let index = 0; 
        let maxValue = array[index]; 
        for(let i = 1; i <= array.length; i++){
          if(array[i] > maxValue){
            maxValue = array[i]; 
            index = i; 
          }
        }
        return index; 
      }
  }

  return (
    <div>
      <h2>Anecdote of the day </h2>
      {anecdotes[selected]}
      <p>has {voteCount[selected]} votes</p>
      <br/>
      <button onClick={countVotes}>vote</button>
      <button onClick={handelClick}>next anecdote</button>
      <br/>
      <h2>Anecdote with most votes </h2>
      <p>{anecdotes[indexOfMaxValue(voteCount)]}</p>
      <p>has {voteCount[indexOfMaxValue(voteCount)]} votes</p>
    </div>
  )
}

export default App; 
