import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div>

      <h1>User Profile</h1>

      <Outlet />
    </div>
  )
}

export default Profile