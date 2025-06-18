import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.onClick}>{props.text}</button>
  )

const StatisticLine = (props) => ( <p>{props.text} {props.value}</p> )

const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral===0){
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={props.good + props.neutral + props.bad} />
      <StatisticLine text="average" value ={((props.good + props.neutral + props.bad) / 3).toFixed(1)} />
      <StatisticLine text="positive" value ={(((props.good + props.neutral)/(props.good + props.neutral + props.bad))*100).toFixed(1) + ' %'} />
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
        <Button onClick={() => setGood(good + 1)} text="good"/>
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/> 
        <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <table>
        <tbody>
        <tr>
          <td>
        <Statistics good={good} bad={bad} neutral={neutral}/>
        </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App