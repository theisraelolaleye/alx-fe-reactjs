import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const favorites = useRecipeStore(state => state.favorites); // Array of favorite recipe IDs
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const navigate = useNavigate();

  // Convert favorite IDs to actual recipe objects for display
  const favoriteRecipes = recipes.filter(recipe =>
    favorites.includes(recipe.id)
  );

  // Handle removing from favorites without navigating to recipe details
  const handleRemoveFavorite = (recipeId, e) => {
    e.stopPropagation(); // Prevent navigation when clicking remove button
    removeFavorite(recipeId);
  };

  // Show empty state when no recipes are favorited
  if (favorites.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#666',
        border: '2px dashed #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>💝</div>
        <h3 style={{ margin: '0 0 8px 0', color: '#888' }}>No favorites yet!</h3>
        <p style={{ margin: 0 }}>
          Browse recipes and click the heart icon to add them to your favorites.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>❤️</span>
          My Favorites
        </h2>
        <div style={{
          fontSize: '14px',
          color: '#666',
          backgroundColor: '#e9ecef',
          padding: '4px 12px',
          borderRadius: '12px',
          fontWeight: 'bold'
        }}>
          {favoriteRecipes.length} recipe{favoriteRecipes.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
      }}>
        {favoriteRecipes.map(recipe => (
          <div
            key={recipe.id}
            style={{
              border: '2px solid #ff6b6b',
              borderRadius: '12px',
              padding: '20px',
              backgroundColor: '#fff',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
              boxShadow: '0 2px 4px rgba(255,107,107,0.1)'
            }}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,107,107,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(255,107,107,0.1)';
            }}
          >
            {/* Favorite indicator */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'flex',
              gap: '8px'
            }}>
              <button
                onClick={(e) => handleRemoveFavorite(recipe.id, e)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8d7da'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                title="Remove from favorites"
              >
                ❤️
              </button>
            </div>

            {/* Recipe content */}
            <div style={{ paddingRight: '40px' }}>
              <h3 style={{
                margin: '0 0 12px 0',
                color: '#d63384',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                {recipe.title}
              </h3>

              <p style={{
                margin: '0',
                color: '#666',
                lineHeight: '1.5',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical'
              }}>
                {recipe.description}
              </p>

              <div style={{
                marginTop: '16px',
                fontSize: '14px',
                color: '#d63384',
                fontWeight: '500'
              }}>
                Click to view details →
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick stats */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{ fontSize: '14px', color: '#666' }}>
          <strong>💡 Quick Stats:</strong> You have {favoriteRecipes.length} favorite recipe{favoriteRecipes.length !== 1 ? 's' : ''}
          {favoriteRecipes.length > 0 && (
            <span> · Last added: {favoriteRecipes[favoriteRecipes.length - 1]?.title}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;