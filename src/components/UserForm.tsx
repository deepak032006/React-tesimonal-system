import React, { useState } from 'react'
import { User } from '../type'

interface Props {
  user?: User | null
  onSubmit: (user: User) => void
  onCancel?: () => void
}

export default function UserForm({ user, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<User>({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    username: user?.username ?? '',
    website: user?.website ?? ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function update<K extends keyof User>(key: K, value: User[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function submit(e?: React.FormEvent) {
    e?.preventDefault()
   
    if (!form.name || !form.email) {
      setError('Name and email are required.')
      return
    }
    try {
      setSubmitting(true)
      setError(null)
      
      await onSubmit(form)
    } catch (err) {
      setError(String(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="card form" onSubmit={submit}>
      <h3>{user ? 'Edit User' : 'Create User'}</h3>
      {error && <div className="error">{error}</div>}

      <label>
        Name
        <input value={form.name} onChange={e => update('name', e.target.value)} />
      </label>

      <label>
        Email
        <input type="email" value={form.email} onChange={e => update('email', e.target.value)} />
      </label>

      <label>
        Phone
        <input value={form.phone} onChange={e => update('phone', e.target.value)} />
      </label>

      <div className="form-actions">
        <button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save'}</button>
        {onCancel && <button type="button" className="secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}