import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { setNotification } from '../reducers/notificationReducer'
import { VoteAnec } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
  const filter = state.filter.toLowerCase()

  return [...state.anecdotes]
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter)
    )
    .sort((a, b) => b.votes - a.votes)
})

  const vote = async (id) => {
    dispatch(VoteAnec(id))

    dispatch(setNotification(`You voted '${anecdotes.find(a => a.id === id).content}'`))
    setTimeout(() => {
      dispatch(setNotification(""))
    }, 5000);
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList