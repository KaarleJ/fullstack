import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      return state.map(anecdoteObject => anecdoteObject.id === id ? { ...anecdoteObject, votes: anecdoteObject.votes+1 } : anecdoteObject ).sort((a, b) => b.votes-a.votes)
    },
    newAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, newAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const neAnecdote = await anecdoteService.createNew(content)
    dispatch(newAnecdote(neAnecdote))
  }
}

export default anecdoteSlice.reducer