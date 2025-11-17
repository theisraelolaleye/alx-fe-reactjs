// RecipeList component
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const filterRecipe = useRecipeStore(state => state.filterRecipe);
  const navigate = useNavigate();

  // Calculate filtered recipes based on current search term
  const displayedRecipes = searchTerm
    ? recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : recipes;

  // Trigger filtering when search term changes
  useEffect(() => {
    filterRecipe();
  }, [searchTerm, filterRecipe]);

  if (recipes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
        <h3>No recipes yet!</h3>
        <p>Add your first recipe above to get started.</p>
      </div>
    );
  }

  if (searchTerm && displayedRecipes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
        <h3>No recipes found</h3>
        <p>No recipes match your search for "{searchTerm}"</p>
        <p>Try searching with different keywords or add a new recipe!</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Recipe Collection</h2>
        {searchTerm && (
          <div style={{ fontSize: '14px', color: '#666' }}>
            Showing {displayedRecipes.length} of {recipes.length} recipes
          </div>
        )}
      </div>
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {displayedRecipes.map(recipe => {
          // Helper function to highlight search terms
          const highlightSearchTerm = (text, searchTerm) => {
            if (!searchTerm) return text;
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            const parts = text.split(regex);
            return parts.map((part, index) =>
              regex.test(part) ? (
                <span key={index} style={{ backgroundColor: '#ffeb3b', fontWeight: 'bold' }}>
                  {part}
                </span>
              ) : (
                part
              )
            );
          };

          return (
            <div
              key={recipe.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#f9f9f9',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
              }}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
            >
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                {highlightSearchTerm(recipe.title, searchTerm)}
              </h3>
              <p style={{
                margin: '0',
                color: '#666',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical'
              }}>
                {highlightSearchTerm(recipe.description, searchTerm)}
              </p>
              <div style={{ marginTop: '10px', fontSize: '14px', color: '#007bff' }}>
                Click to view details →
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeList;