import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad, total, average, positivePercent }) => {
  if (total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <div>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {total}</div>
      <div>average {average}</div>
      <div>positive {positivePercent}</div>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseByOne = () => {
    console.log('+1')
    setGood(good +1)
  }

  const stayStill = () => {
    console.log('+-0')
    setNeutral(neutral +1)
  }

  const decreaseByOne = () => {
    console.log('-1')
    setBad(bad +1)
  }

  const total = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / total
  const  positivePercent = total == 0 ? 0 : (good / total) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseByOne} text='good' />
      <Button handleClick={stayStill} text='neutral' />
      <Button handleClick={decreaseByOne} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positivePercent={positivePercent} />
    </div>
  )
}

export default App