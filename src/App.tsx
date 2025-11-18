import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'


export default function App() {
return (
<div className="app-root">
<header className="header">
<h1>User Management</h1>
<nav>
<Link to="/">Home</Link>
</nav>
</header>


<main className="container">
<Routes>
<Route path="/" element={<UserList />} />
<Route path="/users/:id" element={<UserDetail />} />
</Routes>
</main>
</div>
)
}