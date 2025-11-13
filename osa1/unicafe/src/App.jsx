import { useState } from 'react'

const Header = (props) => <h1>{props.name}</h1>

const Button = (props) => {
  return (
    <button onClick={props.action}>{props.text}</button>
  )
}

const Statistics = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
} 

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header name="give feedback"/>
      <Button action={() => setGood(good + 1)} text="Good"/>
      <Button action={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button action={() => setBad(bad + 1)} text="Bad"/>
      <Header name="statistics"/>
      <Statistics text="Good" value={good}/>
      <Statistics text="Neutral" value={neutral}/>
      <Statistics text="Bad" value={bad}/>
    </div>
  )
}

export default App