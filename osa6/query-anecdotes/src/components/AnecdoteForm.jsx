import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../../requests"

import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { messageDispatch } = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()

    if (!content) {
      alert("anecdote content missing")
      return
    }

    event.target.anecdote.value = ''
    console.log('sending:', { content, votes: 0 })
    newAnecdoteMutation.mutate({ content, votes: 0})
    
    messageDispatch({
      type: "SET",
      payload: `anecdote "${content}" was created`
    })

    setTimeout(() => {
      messageDispatch({ type: "SET", payload: "" });
    }, 5000);
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
