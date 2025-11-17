// AddRecipeForm component
import { useState } from 'react';
import useRecipeStore from './recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    addRecipe({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
    setErrors({});
  };

  return (
    <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe Title"
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${errors.title ? '#ff0000' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
          {errors.title && <div style={{ color: '#ff0000', fontSize: '14px', marginTop: '5px' }}>{errors.title}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Recipe Description"
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${errors.description ? '#ff0000' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical'
            }}
          />
          {errors.description && <div style={{ color: '#ff0000', fontSize: '14px', marginTop: '5px' }}>{errors.description}</div>}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;