// RecipeList component
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const filterRecipe = useRecipeStore(state => state.filterRecipe);
  const favorites = useRecipeStore(state => state.favorites); // Array of favorited recipe IDs
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
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

          // Check if this recipe is currently in user's favorites
          const isFavorite = favorites.includes(recipe.id);

          // Toggle favorite status without navigating to recipe details
          const toggleFavorite = (e) => {
            e.stopPropagation(); // Prevent navigation when clicking favorite button
            if (isFavorite) {
              removeFavorite(recipe.id);
            } else {
              addFavorite(recipe.id);
            }
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
                position: 'relative',
              }}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
            >
              {/* Favorite button */}
              <button
                onClick={toggleFavorite}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                  transition: 'all 0.2s ease',
                  transform: isFavorite ? 'scale(1.1)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  e.target.style.transform = 'scale(1.2)';
                  e.target.style.backgroundColor = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = isFavorite ? 'scale(1.1)' : 'scale(1)';
                  e.target.style.backgroundColor = 'transparent';
                }}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>

              <div style={{ paddingRight: '40px' }}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeList;