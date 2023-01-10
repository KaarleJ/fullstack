import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const initialState = [
  {
    content: anecdotesAtStart[0],
    id: 3515315135,
    votes: 0
  },
  {
    content: anecdotesAtStart[1],
    id: 1421324135,
    votes: 0
  },
  {
    content: anecdotesAtStart[2],
    id: 135135315,
    votes: 0
  },
  {
    content: anecdotesAtStart[3],
    id: 135135135,
    votes: 0
  }
]

describe('anecdoteReducer', () => {
  test('an anecdote can be voted', () => {
    const state = initialState
    const action = {
      type: 'anecdotes/voteAnecdote',
      payload: 3515315135
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState[0]).toEqual({ ...state[0], votes: 1 })
  })

  test('an anecdote can be created', () => {
    const state = initialState
    const action = {
      type: 'anecdotes/newAnecdote',
      payload: 'This is a test anecdote'
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(initialState.length+1)
    expect(newState[4].content).toBe('This is a test anecdote')
  })
})