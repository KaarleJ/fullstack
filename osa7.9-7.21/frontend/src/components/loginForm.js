import { useDispatch } from 'react-redux'
import loginService from '../services/loginService'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.Username.value
    const password = event.target.password.value
    try {
      const user = await loginService({
        username,
        password,
      })
      dispatch(setUser(user))
      blogService.setToken(user.token)
      window.localStorage.setItem('blogist', JSON.stringify(user))
      dispatch(setNotification({ state: 'logged in', color: 'green' }, 5))
    } catch (exception) {
      console.log('error stack:', exception.stack)
      console.log('error name:', exception.name)
      console.log('error name:', exception.message)
      dispatch(setNotification({ state: 'wrong credentials', color: 'red' }, 3))
    }
    event.target.Username.value = null
    event.target.password.value = null
  }
  return (
    <div>
      <h1>login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control id="username" type="text" name="Username" />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control id="password" type="password" name="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
