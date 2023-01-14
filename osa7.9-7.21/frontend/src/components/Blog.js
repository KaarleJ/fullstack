import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setBlogs } from '../reducers/blogReducer'

const Blog = () => {
  const user = useSelector((state) => state.user.userId)
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  const dispatch = useDispatch()

  const handleLike = async (blog) => {
    let { author, title, url, likes, id } = blog
    likes = likes + 1
    const newBlog = await blogService.update({
      title,
      author,
      url,
      likes,
      id,
    })
    dispatch(setBlogs(blogs.map((b) => (b.id === blog.id ? newBlog : b))))
  }

  const handleRemove = async (blog) => {
    const { id } = blog
    await blogService.remove({ id })
    dispatch(setBlogs(blogs.filter((b) => b.id !== id)))

    dispatch(
      setNotification(
        {
          state: `Removed blog ${blog.title} by ${blog.author} from the collection`,
          color: 'green',
        },
        5
      )
    )
  }

  const addComment = async (event) => {
    event.preventDefault()
    const newComment = { content: event.target.comment.value }
    if (newComment.content.length < 3) {
      dispatch(
        setNotification(
          {
            state: 'Minimum length for a comments is 3 characters',
            color: 'red',
          },
          3
        )
      )
      return
    }
    const updatedBlog = await blogService.updateComments(
      blog.id,
      blog.comments.concat(newComment)
    )
    dispatch(
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    )
    event.target.comment.value = ''
  }
  if (!blog) {
    return
  }

  return (
    <div className="blog">
      <div>
        <h1>{blog.title}</h1>
        <p>
          {' '}
          <a href={blog.url}>{blog.url}</a>
          <br />
          likes {blog.likes}{' '}
          <button onClick={() => handleLike(blog)}>like</button>
          <br />
          added by {blog.author}
        </p>
        <div style={{ display: user === blog.user.id ? '' : 'none' }}>
          <button id="delete" onClick={() => handleRemove(blog)}>
            delete
          </button>
        </div>
        <h2>comments:</h2>
        <form onSubmit={addComment}>
          <input name="comment"></input>
          <button>add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment._id}>{comment.content}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
