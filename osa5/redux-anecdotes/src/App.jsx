import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { voteAnecdote } from './reducers/anecdoteReducer';
import { newAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const vote = id => {
    dispatch(voteAnecdote(id))
  }

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}

      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
