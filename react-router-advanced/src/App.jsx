import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Profile from './components/Profile'
import ProfileDetails from './pages/profile/ProfileDetails'
import ProfileSettings from './pages/profile/ProfileSettings'
import BlogList from './pages/blog/BlogList'
import BlogPost from './pages/blog/BlogDetails'
import './App.css'

function App() {


  return (
    <>

      <Router>
        {/* <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        </nav> */}

        <Routes>
          {/* Home Route */}
          <Route path="/" element={<div>Home</div>} />

          
          {/* Nested Profile Routes */}
          <Route path="/profile" element={<Profile />}>
            <Route index element={<ProfileDetails />} />
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>

          {/* Dynamic Blog Routes */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>

      </Router>

    </>


  )
}

export default App
