import { useImperativeHandle, useState, forwardRef } from 'react'

const CreateForm = forwardRef(({ handleNew }, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useImperativeHandle(ref, () => {
    return {
      setTitle,
      setAuthor,
      setUrl
    }
  })

  const addBlog = (event) => {
    event.preventDefault()
    handleNew({
      title,
      author,
      url
    })
  }

  return (
    <form onSubmit={addBlog} className='createForm'>
      <div>
        title:
        <input
          id='title'
          placeholder='title...'
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id='author'
          placeholder='author...'
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
      url:
        <input
          id='url'
          placeholder='url...'
          type='text'
          value={url}
          name='URL'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id='create-button' type='submit'>create</button>
    </form>
  )
})

CreateForm.displayName = 'CreateForm'

export default CreateForm