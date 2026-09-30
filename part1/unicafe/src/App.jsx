import { useState } from 'react'

const Button = ({ handleClick, feedback }) => <button onClick={handleClick}>{feedback}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = ((good - bad) / all).toFixed(1)
  const positive = ((good / all) * 100).toFixed(1)
  
  if (all == 0) {
    return <p>No Feedback Given</p>
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good}/>
          <StatisticLine text="Neutral" value={neutral}/>
          <StatisticLine text="Bad" value={bad}/>
          <StatisticLine text="All" value={all}/>
          <StatisticLine text="Average" value={average}/>
          <StatisticLine text="Positive" value={positive}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addToGood = () => setGood(good + 1)
  const addToNeutral = () => setNeutral(neutral + 1)
  const addToBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={addToGood} feedback="good"/>
      <Button handleClick={addToNeutral} feedback="neutral"/>
      <Button handleClick={addToBad} feedback="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App