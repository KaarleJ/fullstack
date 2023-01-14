import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Menu = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const logOut = async () => {
    window.localStorage.removeItem('blogist')
    dispatch(setUser(null))
    dispatch(setNotification({ state: 'logged out', color: 'green' }, 5))
  }

  return (
    <div className='container'>
      {user === null ? null : (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link to="/">blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/create">
                  create blog
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/users">
                  users
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                Logged in as {user.name}.
                <button onClick={logOut}>logout</button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </div>
  )
}

export default Menu
