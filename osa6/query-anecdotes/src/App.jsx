import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from '../requests'

import { useContext } from "react";
import NotificationContext from "./NotificationContext";

// App
const App = () => {
  const { messageDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote)

    messageDispatch({
      type: "SET",
      payload: `anecdote "${anecdote.content}" voted`
    })

    setTimeout(() => {
      messageDispatch({ type: "SET", payload: ""})
    }, 5000);
  }

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    retry: 1,
    queryFn: getAnecdotes
  })

  console.log(JSON.parse(JSON.stringify(result)))


  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }


  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
