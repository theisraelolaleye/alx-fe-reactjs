import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddRecipeForm from '../components/AddRecipeForm.jsx'
import RecipeList from '../components/RecipeList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>

        <h1>Recipe Sharing App</h1>
        <AddRecipeForm />
        <RecipeList />
      </div>


    </>
  )
}

export default App
