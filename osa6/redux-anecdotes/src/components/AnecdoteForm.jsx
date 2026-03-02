import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

    const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      const newA = await anecdoteService.createNew(content)
      dispatch(newAnecdote(newA))

      // Notification of creation of new anecdote with 5 sec cooldown
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

