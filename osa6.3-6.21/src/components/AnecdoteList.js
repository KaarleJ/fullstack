import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = filter === null ? useSelector(state => state.anecdotes) : useSelector(state => state.anecdotes).filter(anecdote => (anecdote.content.includes(filter)))
  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes+1 }
    const updatedAnecdote = await anecdoteService.update(newAnecdote)
    dispatch(voteAnecdote(updatedAnecdote.id))
    dispatch(setNotification(`You voted ${updatedAnecdote.content}`,5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList