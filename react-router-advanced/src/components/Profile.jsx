import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProfileDetails from '../pages/profile/ProfileDetails'
import ProfileSettings from '../pages/profile/ProfileSettings'

const Profile = () => {
  return (
    <div>
      <h1>User Profile</h1>

      <nav style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
        <Link to="">Details</Link>
        <Link to="settings">Settings</Link>
      </nav>

      <Routes>
        <Route index element={<ProfileDetails />} />

        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  )
}

export default Profile