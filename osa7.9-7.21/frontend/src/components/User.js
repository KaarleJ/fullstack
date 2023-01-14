import userService from '../services/userService'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Users = () => {
  const [user, setUser] = useState(null)
  const id = useParams().id

  useEffect(() => {
    userService.getAll().then((response) => setUser(response.find(user => user.id === id)))
  }, [])

  if (!user) {
    return
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default Users