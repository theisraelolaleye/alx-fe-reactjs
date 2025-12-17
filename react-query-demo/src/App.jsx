import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import PostsComponent from './components/PostsComponent'

const queryClient = new QueryClient()

function App() {
  const [showTodos, setShowTodos] = useState(true)

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h1 style={{ margin: 0 }}>React Query Demo</h1>
          <button onClick={() => setShowTodos((v) => !v)} style={{ marginLeft: 'auto' }}>
            {showTodos ? 'Go to Other Page' : 'Back to Todos'}
          </button>
        </div>

        {showTodos ? (
          <PostsComponent />
        ) : (
          <div style={{ marginTop: 16 }}>This simulates another page/view.</div>
        )}
      </QueryClientProvider>
    </>
  )
}

export default App