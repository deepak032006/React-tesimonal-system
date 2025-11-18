import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../type'
import { api } from '../api'
import UserForm from './UserForm'

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [creating, setCreating] = useState(false)

 
  useEffect(() => {
    let mounted = true
    setLoading(true)
    api.fetchUsers()
      .then(data => {
        if (!mounted) return
        setUsers(data)
        setError(null)
      })
      .catch(err => {
        if (!mounted) return
        setError(String(err))
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [])

  async function handleCreate(user: User) {
    try {
      setLoading(true)
      const created = await api.createUser(user)
     
      setUsers(prev => [created, ...prev])
      setCreating(false)
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate(id: number, user: User) {
    try {
      setLoading(true)
      const updated = await api.updateUser(id, user)
      setUsers(prev => prev.map(u => (u.id === id ? updated : u)))
      setEditingUser(null)
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number | undefined) {
    if (!id) return
    if (!confirm('Delete this user?')) return
    try {
      setLoading(true)
      await api.deleteUser(id)
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="toolbar">
        <button onClick={() => setCreating(c => !c)}>{creating ? 'Close' : 'Create New User'}</button>
      </div>

      {error && <div className="error">Error: {error}</div>}

      {creating && (
        <UserForm
          onCancel={() => setCreating(false)}
          onSubmit={handleCreate}
        />
      )}

      {editingUser && (
        <UserForm
          user={editingUser}
          onCancel={() => setEditingUser(null)}
          onSubmit={(u) => handleUpdate(editingUser.id!, u)}
        />
      )}

      {loading && <div className="spinner">Loading...</div>}

      <div className="table-wrap">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className="actions">
                  <button onClick={() => setEditingUser(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}