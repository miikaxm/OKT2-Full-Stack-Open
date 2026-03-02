import { useDispatch } from "react-redux";
import { setNotification } from '../reducers/notificationReducer'
import { appendAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

    const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(appendAnecdote(content))

      // Notification of creation of new anecdote with 5 sec cooldown
      dispatch(setNotification(`you created '${content}'`, 10))
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

