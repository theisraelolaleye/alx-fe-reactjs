import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Profile from './components/Profile'
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

          {/* Profile Route (nested handled inside Profile) */}
          <Route path="/profile/*" element={<Profile />} />

          {/* Dynamic Blog Routes */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>

      </Router>

    </>


  )
}

export default App
