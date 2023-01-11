import { Link } from 'react-router-dom'
const AnecdoteList = ({ anecdotes }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id}><Link style={padding} to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
      </ul>
    </div>
  )
}

export default AnecdoteList