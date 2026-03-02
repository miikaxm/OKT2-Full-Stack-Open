import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

    const addAnecdote = event => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(newAnecdote(content))
      dispatch(setNotification(`You added new anecdote '${content}'`))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name='anecdote' />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm

