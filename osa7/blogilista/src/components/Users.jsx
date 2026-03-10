import { useState, useEffect } from "react"
import userService from "../services/users"
import { Table } from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  return (
    <div>
      <h1>Users</h1>

      <Table striped>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>

      </Table>
    </div>
  )
}

export default Users