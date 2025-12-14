import React, { useState } from 'react'

const RegistrationForm = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.username.trim()) newErrors.username = 'Username is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    if (!form.password.trim()) newErrors.password = 'Password is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    // For demo purposes; replace with API call as needed
    console.log('Registration data:', form)
    alert('Registration successful!')

    // Reset form on success
    setForm({ username: '', email: '', password: '' })
    setErrors({})
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 420, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Register</h2>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: 6 }}>Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter your username"
            style={{ width: '100%', padding: 8 }}
          />
          {errors.username && (
            <small style={{ color: 'red' }}>{errors.username}</small>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 6 }}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={{ width: '100%', padding: 8 }}
          />
          {errors.email && (
            <small style={{ color: 'red' }}>{errors.email}</small>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 6 }}>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            style={{ width: '100%', padding: 8 }}
          />
          {errors.password && (
            <small style={{ color: 'red' }}>{errors.password}</small>
          )}
        </div>

        <button type="submit" style={{ width: '100%', padding: 10 }}>Register</button>
      </form>
    </div>
  )
}

export default RegistrationForm