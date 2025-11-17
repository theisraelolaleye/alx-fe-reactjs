import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import AdvancedFilter from './components/AdvancedFilter';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

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
              {/* Navigation */}
              <nav style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                marginBottom: '30px',
                padding: '10px',
                borderBottom: '2px solid #eee'
              }}>
                <a
                  href="/"
                  style={{
                    textDecoration: 'none',
                    color: '#007bff',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  🏠 All Recipes
                </a>
                <a
                  href="/favorites"
                  style={{
                    textDecoration: 'none',
                    color: '#dc3545',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  ❤️ My Favorites
                </a>
              </nav>

              <AddRecipeForm />
              <SearchBar />
              <AdvancedFilter />
              <RecipeList />
            </div>
          } />
          <Route path="/favorites" element={
            <div>
              {/* Navigation */}
              <nav style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                marginBottom: '30px',
                padding: '10px',
                borderBottom: '2px solid #eee'
              }}>
                <a
                  href="/"
                  style={{
                    textDecoration: 'none',
                    color: '#007bff',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  🏠 All Recipes
                </a>
                <a
                  href="/favorites"
                  style={{
                    textDecoration: 'none',
                    color: '#dc3545',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    backgroundColor: '#ffe6e6'
                  }}
                >
                  ❤️ My Favorites
                </a>
              </nav>

              <RecommendationsList />
              <FavoritesList />
            </div>
          } />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
