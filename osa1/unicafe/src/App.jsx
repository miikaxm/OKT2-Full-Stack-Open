import { useState } from 'react'

const Header = (props) => <h1>{props.name}</h1>

const Button = (props) => {
  return (
    <button onClick={props.action}>{props.text}</button>
  )
}

const Statistics = (props) => {
  if (props.valueAll > 0) {
    return (
      <div>
        <StatisticLine text="Good" value={props.valueGood}/>
        <StatisticLine text="Neutral" value={props.valueNeutral}/>
        <StatisticLine text="Bad" value={props.valueBad}/>
        <StatisticLine text="All" value={props.valueAll}/>
        <StatisticLine text="Average" value={props.valueAverage}/>
        <StatisticLine text="Positive" value={props.valuePositive}/>
      </div>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
}

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total
  const positive = total === 0 ? 0 : (good / total) * 100 + "%";

  return (
    <div>
      <Header name="give feedback"/>
      <Button action={() => setGood(good + 1)} text="Good"/>
      <Button action={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button action={() => setBad(bad + 1)} text="Bad"/>
      <Header name="statistics"/>
      <Statistics valueGood={good} valueNeutral={neutral} valueBad={bad} 
      valueAll={total} valueAverage={average} valuePositive={positive}
      /> 
    </div>
  )
}

export default App