import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.action}>{props.text}</button>
  )
}

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const getRandomInteger = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
  }

  console.log(votes)

  const vote = (index) => {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)
  }

  function indexOfMax(arr) {
      if (arr.length === 0) {
          return -1;
      }

      var max = arr[0];
      var maxIndex = 0;

      for (var i = 1; i < arr.length; i++) {
          if (arr[i] > max) {
              maxIndex = i;
              max = arr[i];
          }
      }

      return maxIndex;
  }


  return (
    <div>
      <Header text="Anecdote of the day"/>
      {anecdotes[selected]} <br />
      <Button text="vote" action={() => vote(selected)}/>
      <Button text="next anecdote" action={() => setSelected(getRandomInteger(0, anecdotes.length))}/>
      <Header text="Anecdote with most votes"/>
      {anecdotes[indexOfMax(votes)]}
    </div>
  )
}

export default App