import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import AdvancedFilter from './components/AdvancedFilter';

function App() {
  return (
    <Router>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
          Recipe Sharing App
        </h1>

        <Routes>
          <Route path="/" element={
            <div>
              <AddRecipeForm />
              <SearchBar />
              <AdvancedFilter />
              <RecipeList />
            </div>
          } />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
