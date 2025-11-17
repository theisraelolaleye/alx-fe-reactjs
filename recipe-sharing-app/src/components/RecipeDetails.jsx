import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import { useState } from 'react';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(id))
  );
  const favorites = useRecipeStore(state => state.favorites); // Array of favorited recipe IDs
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  // Check if current recipe is in user's favorites
  const isFavorite = favorites.includes(parseInt(id));

  // Toggle favorite status for current recipe
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(parseInt(id));
    } else {
      addFavorite(parseInt(id));
    }
  };

  if (!recipe) {
    return (
      <div>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate('/')}>Back to Recipes</button>
      </div>
    );
  }

  const handleEditSuccess = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '20px' }}>
        ← Back to Recipes
      </button>

      {isEditing ? (
        <EditRecipeForm
          recipe={recipe}
          onSuccess={handleEditSuccess}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <h1 style={{ margin: 0 }}>{recipe.title}</h1>
            <button
              onClick={toggleFavorite}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '32px',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                transition: 'all 0.2s ease',
                transform: isFavorite ? 'scale(1.1)' : 'scale(1)',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.target.style.transform = isFavorite ? 'scale(1.1)' : 'scale(1)'}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>

          <p style={{ fontSize: '18px', lineHeight: '1.6', margin: '20px 0' }}>
            {recipe.description}
          </p>

          <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Edit Recipe
            </button>

            <DeleteRecipeButton
              recipeId={recipe.id}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;