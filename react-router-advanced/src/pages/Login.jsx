import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isAuthenticated, login, logout } from '../utils/auth'

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  const handleLogin = () => {
    login()
    navigate(from, { replace: true })
  }

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  if (isAuthenticated()) {
    return (
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <h1>You are logged in</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
      <h1>Login Required</h1>
      <p>You must log in to view this page.</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
