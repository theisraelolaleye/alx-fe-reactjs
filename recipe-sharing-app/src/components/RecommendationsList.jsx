import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const favorites = useRecipeStore(state => state.favorites);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const navigate = useNavigate();

  // Regenerate recommendations whenever user's favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites, generateRecommendations]);

  // Toggle favorite status and prevent card navigation
  const toggleFavorite = (recipeId, e) => {
    e.stopPropagation(); // Prevent navigating to recipe details when clicking heart
    if (favorites.includes(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  // Show empty state if user has no favorites (recommendations need favorites as input)
  if (favorites.length === 0) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        marginBottom: '20px'
      }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎯</div>
        <h3 style={{ margin: '0 0 8px 0', color: '#6c757d' }}>No Recommendations Yet</h3>
        <p style={{ margin: 0, color: '#6c757d' }}>
          Add some recipes to your favorites to get personalized recommendations!
        </p>
      </div>
    );
  }

  // Show loading state if recommendations haven't been generated yet
  if (recommendations.length === 0) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        marginBottom: '20px'
      }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔄</div>
        <h3 style={{ margin: '0 0 8px 0', color: '#6c757d' }}>Generating Recommendations...</h3>
        <p style={{ margin: 0, color: '#6c757d' }}>
          Check back later for recipe suggestions based on your favorites!
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '30px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <span style={{ fontSize: '24px' }}>🎯</span>
        <h2 style={{ margin: 0 }}>Recommended for You</h2>
        <div style={{
          fontSize: '12px',
          color: '#666',
          backgroundColor: '#e9ecef',
          padding: '2px 8px',
          borderRadius: '8px'
        }}>
          Based on your favorites
        </div>
      </div>

      <div style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
      }}>
        {recommendations.map(recipe => (
          <div
            key={recipe.id}
            style={{
              border: '2px solid #17a2b8',
              borderRadius: '12px',
              padding: '16px',
              backgroundColor: '#fff',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
              boxShadow: '0 2px 4px rgba(23,162,184,0.1)'
            }}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(23,162,184,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(23,162,184,0.1)';
            }}
          >
            {/* Recommendation badge */}
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              backgroundColor: '#17a2b8',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: 'bold'
            }}>
              RECOMMENDED
            </div>

            {/* Favorite button */}
            <button
              onClick={(e) => toggleFavorite(recipe.id, e)}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '50%',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f8d7da'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {favorites.includes(recipe.id) ? '❤️' : '🤍'}
            </button>

            <div style={{ paddingTop: '20px', paddingRight: '24px' }}>
              <h3 style={{
                margin: '0 0 8px 0',
                color: '#17a2b8',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                {recipe.title}
              </h3>

              <p style={{
                margin: '0',
                color: '#666',
                fontSize: '14px',
                lineHeight: '1.4',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {recipe.description}
              </p>

              <div style={{
                marginTop: '12px',
                fontSize: '12px',
                color: '#17a2b8',
                fontWeight: '500'
              }}>
                Click to view details →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;