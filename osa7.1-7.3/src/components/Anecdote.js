import {
  useParams
} from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(anecdote => anecdote.id === Number(id))
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      has {anecdote.votes} votes
    </div>
  )
}
export default Anecdote