import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const removeButton = { display: user === blog.user.id ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog' style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button>
        <p>
          {blog.url} <br/>
        likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button><br/>
          {blog.author}
        </p>
        <div style={removeButton}>
          <button id='delete' onClick={() => handleRemove(blog)}>delete</button>
        </div>
      </div>
    </div>
  )}

export default Blog