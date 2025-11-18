import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { User } from '../type'
import { api } from '../api'

export default function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let mounted = true
    setLoading(true)
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      })
      .then(data => mounted && setUser(data))
      .catch(err => mounted && setError(String(err)))
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [id])

  return (
    <div>
      <button onClick={() => navigate(-1)} className="link">← Back</button>

      {loading && <div className="spinner">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}

      {user && (
        <div className="card detail">
          <h2>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      )}
    </div>
  )
}