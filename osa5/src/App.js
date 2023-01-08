import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/loginForm'
import CreateForm from './components/createForm'
import loginService from './services/loginService'
import Notice from './components/Notice'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notice, setNotice] = useState({ state: null, color: 'green' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a,b) => b.likes-a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedBlogist = window.localStorage.getItem('blogist')
    if (loggedBlogist) {
      const user = JSON.parse(loggedBlogist)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <div>
        <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password}/>
      </div>
    )
  }

  const createFormRef = useRef()
  const togglableRef = useRef()


  const createForm = () => (
    <Togglable buttonLabel='create new blog' ref={togglableRef}>
      <CreateForm handleNew={handleNew} ref={createFormRef}/>
    </Togglable>
  )

  const blogsDisplay = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user.userId}/>
        )}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService({
        username, password
      })
      setUser(user)
      setUsername(user.username)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'blogist', JSON.stringify(user)
      )
      setNotice({ state: 'logged in', color: 'green' })
      setTimeout(() => {
        setNotice({ state: null, color: 'green' })
      }, 5000)
    } catch (exception) {
      setNotice({ state: 'wrong credentials', color: 'red' })
      setTimeout(() => {
        setNotice({ state: null, color: 'green' })
      }, 5000)
    }
  }

  const handleNew = async (blog) => {
    try {
      const id = user.userId
      const { title, author, url } = blog
      const newBlog = await blogService.postNew({
        author, title, url, id
      })
      setNotice({ state: `A new blog ${title} by ${author} added`, color: 'green' })
      setTimeout(() => {
        setNotice({ state: null, color: 'green' })
      }, 5000)
      createFormRef.current.setTitle('')
      createFormRef.current.setAuthor('')
      createFormRef.current.setUrl('')
      setBlogs(blogs.concat(newBlog))
    } catch (exception) {
      console.log('error stack:', exception.stack)
      console.log('error name:', exception.name)
      console.log('error name:', exception.message)
      setNotice({ state: 'somethign went wrong creating a new blog', color: 'red' })
      setTimeout(() => {
        setNotice({ state: null, color: 'green' })
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    let { author, title, url, likes, id } = blog
    likes=likes+1
    const newBlog = await blogService.update({ title, author, url, likes, id })
    setBlogs(blogs.map(b => b.id === blog.id ? newBlog : b))
  }

  const handleRemove = async (blog) => {
    const { id } = blog
    await blogService.remove({ id })
    setBlogs(blogs.filter(b => b.id !== id))

    setNotice({ state: `Removed blog ${blog.title} by ${blog.author} from the collection`, color: 'green' })
    setTimeout(() => {
      setNotice({ state: null, color: 'green' })
    }, 5000)
  }

  const logOut = async () => {
    window.localStorage.removeItem('blogist')
    setUsername('')
    setPassword('')
    setUser(null)
    setNotice({ state: 'logged out', color: 'green' })
    setTimeout(() => {
      setNotice({ state: null, color: 'green' })
    }, 5000)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notice message={notice}/>
      {user === null ?
        loginForm() :
        <div>
          <p>Logged in as {user.name}.</p>
          <button onClick={logOut}>logout</button>
          {createForm()}
          {blogsDisplay()}
        </div>
      }
    </div>
  )
}

export default App
