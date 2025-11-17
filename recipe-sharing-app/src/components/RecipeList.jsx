// RecipeList component
import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const navigate = useNavigate();

  if (recipes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
        <h3>No recipes yet!</h3>
        <p>Add your first recipe above to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Recipe Collection</h2>
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {recipes.map(recipe => (
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
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{recipe.title}</h3>
            <p style={{
              margin: '0',
              color: '#666',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}>
              {recipe.description}
            </p>
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#007bff' }}>
              Click to view details →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;