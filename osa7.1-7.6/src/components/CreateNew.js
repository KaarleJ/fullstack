import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const navigate = useNavigate()
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.content.value)
    props.addNew({
      content: e.target.content.value,
      author: e.target.author.value,
      info: e.target.info.value,
      votes: 0
    })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
            content
          <input {...content} reset={null}/>
        </div>
        <div>
            author
          <input {...author} reset={null}/>
        </div>
        <div>
            url for more info
          <input {...info} reset={null}/>
        </div>
        <button type='submit'>create</button>
        <button type='' onClick={() => {
          event.preventDefault()
          content.reset()
          author.reset()
          info.reset()
        }}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew