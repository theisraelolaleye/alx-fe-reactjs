import { useState, useEffect } from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  const filterRecipe = useRecipeStore(state => state.filterRecipe);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setSearchTerm(localSearchTerm);
      filterRecipe();
    }, 300); // Debounce search for better performance

    return () => clearTimeout(delayedSearch);
  }, [localSearchTerm, setSearchTerm, filterRecipe]);

  const handleClear = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
    filterRecipe();
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            placeholder="Search recipes by title..."
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          {localSearchTerm && (
            <button
              onClick={handleClear}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                color: '#666',
                cursor: 'pointer',
                padding: '4px'
              }}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>
      {searchTerm && (
        <p style={{
          margin: '8px 0 0 0',
          fontSize: '14px',
          color: '#666',
          fontStyle: 'italic'
        }}>
          {searchTerm ? `Searching for: "${searchTerm}"` : ''}
        </p>
      )}
    </div>
  );
};

export default SearchBar;