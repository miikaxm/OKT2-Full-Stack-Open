import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

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

const { setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const { newAnecdote, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer