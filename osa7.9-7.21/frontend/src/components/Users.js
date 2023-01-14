import userService from '../services/userService'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((response) => setUsers(response))
  }, [])

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>users</th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link style={{ paddingRight: 5 }} to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
