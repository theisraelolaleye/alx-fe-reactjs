import { useState } from 'react';
import useRecipeStore from './recipeStore';

const AdvancedFilter = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const recipes = useRecipeStore(state => state.recipes);
  const setRecipes = useRecipeStore(state => state.setRecipes);

  const sortRecipes = (sortType) => {
    const sortedRecipes = [...recipes].sort((a, b) => {
      switch (sortType) {
        case 'newest':
          return b.id - a.id;
        case 'oldest':
          return a.id - b.id;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'reverse-alphabetical':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
    setRecipes(sortedRecipes);
    setSortBy(sortType);
  };

  const clearAllFilters = () => {
    // This would reset to original order - for now just reset to newest
    sortRecipes('newest');
  };

  if (!showAdvanced) {
    return (
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowAdvanced(true)}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #007bff',
            color: '#007bff',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Show Advanced Filters
        </button>
      </div>
    );
  }

  return (
    <div style={{
      marginBottom: '20px',
      padding: '16px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>Advanced Filters</h3>
        <button
          onClick={() => setShowAdvanced(false)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => sortRecipes(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">A-Z</option>
            <option value="reverse-alphabetical">Z-A</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>
            Actions:
          </label>
          <button
            onClick={clearAllFilters}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
        <p style={{ margin: 0 }}>
          💡 Tip: Use the search bar above to filter by recipe title or description
        </p>
      </div>
    </div>
  );
};

export default AdvancedFilter;