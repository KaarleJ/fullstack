import { useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/loginForm'
import CreateForm from './components/createForm'
import Notice from './components/Notice'
import Menu from './components/Menu'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const notice = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      )
  }, [])

  useEffect(() => {
    const loggedBlogist = window.localStorage.getItem('blogist')
    if (loggedBlogist) {
      const user = JSON.parse(loggedBlogist)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const createForm = () => <CreateForm handleNew={handleNew} />

  const handleNew = async (blog) => {
    try {
      const id = user.userId
      const { title, author, url } = blog
      const newBlog = await blogService.postNew({
        author,
        title,
        url,
        id,
      })
      dispatch(
        setNotification(
          { state: `A new blog ${title} by ${author} added`, color: 'green' },
          5
        )
      )
      dispatch(setBlogs(blogs.concat(newBlog)))
    } catch (exception) {
      dispatch(
        setNotification(
          {
            state: 'somethign went wrong creating a new blog',
            color: 'red',
          },
          3
        )
      )
    }
  }

  return (
    <div className='container'>
      <Router>
        <Menu />
        <h1>BlogApp</h1>
        <Notice message={notice} />
        <Routes>
          <Route
            path="/"
            element={
              <>{user === null ? <LoginForm /> : <Blogs />}</>
            }
          />
          <Route
            path="/blogs/:id"
            element={<div>{user === null ? <LoginForm /> : <Blog />}</div>}
          />
          <Route
            path="/create"
            element={<div>{user === null ? <LoginForm /> : createForm()}</div>}
          />
          <Route
            path="/users"
            element={<div>{user === null ? <LoginForm /> : <Users />}</div>}
          />
          <Route
            path="/users/:id"
            element={<div>{user === null ? <LoginForm /> : <User />}</div>}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
