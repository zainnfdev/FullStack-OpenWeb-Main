import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


const App = () => {

  const [ good , setGood ] =  useState(0); 
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);  
  const [ all, setAll ] = useState(0); 

  const setGoodFeedbackCount = () => {
    const newGoodCount = good + 1 ; 
    setGood(newGoodCount); 
    setAll(newGoodCount + neutral + bad); 
  }

  const setNeutralFeedbackCount = () => {
    const newNeutralCount = neutral + 1 ; 
    setNeutral(newNeutralCount); 
    setAll(good + newNeutralCount + bad); 
  }

  const setBadFeednackCount = () => {
    const newBadCount = bad + 1 ; 
    setBad(newBadCount); 
    setAll(good + neutral + newBadCount); 
  }
  
  return (
    <div>
      <h4>Give Feedback</h4>
      <br/>
      <Button handelClick={setGoodFeedbackCount} text='good' />
      <Button handelClick={setNeutralFeedbackCount} text='neutral' />
      <Button handelClick={setBadFeednackCount} text='bad' />
      <br/>
      <h3>Statistics</h3>
      <br/>
      <table>
        <tbody>
        <StatisticsLine text='good' value={good}/>
        <StatisticsLine text='neutral' value={neutral}/>
        <StatisticsLine text='bad' value={bad}/>
        {
          all === 0 ? (
            <tr>
              <td>No Feedback given!</td>
            </tr>
          ): (
            <>
            <StatisticsLine text='all' value={all} />
            <StatisticsLine text='average' value={Math.floor((((good * 1) + (neutral * 0) + (bad * -1) )/all)*10)/10} />
            <StatisticsLine text='positive' value={ Math.floor(((good/all) * 100)*100)/100 + '%' } />
            </>
          ) 
        }
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  const { text,handelClick } = props; 
  return(
    <button onClick={handelClick}>{text}</button>
  )
}

const StatisticsLine = (props) => {
  const { text,value } = props; 
  return (
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
  )
}

export default App;
