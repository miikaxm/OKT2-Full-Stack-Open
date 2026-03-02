import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],

  reducers: {
    newAnecdote(state, action) {
      const content = action.payload
      state.push(action.payload)
    },

    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)
      console.log(anecdoteToVote)
      if ( anecdoteToVote) {
        anecdoteToVote.votes++
      }
    },
    
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { newAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer