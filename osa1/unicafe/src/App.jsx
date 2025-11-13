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
        <p>{props.textGood} {props.valueGood}</p>
        <p>{props.textNeutral} {props.valueNeutral}</p>
        <p>{props.textBad} {props.valueBad}</p>
        <p>{props.textAll} {props.valueAll}</p>
        <p>{props.textAverage} {props.valueAverage}</p>
        <p>{props.textPositive} {props.valuePositive}</p>
      </div>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
  
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
      <Statistics 
      textGood="Good" valueGood={good}
      textNeutral="Neutral" valueNeutral={neutral}
      textBad="Bad" valueBad={bad}
      textAll="All" valueAll={total}
      textAverage="Average" valueAverage={average}
      textPositive="Positive" valuePositive={positive}
      />
    </div>
  )
}

export default App