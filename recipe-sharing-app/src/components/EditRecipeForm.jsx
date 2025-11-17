import { useState } from 'react';
import useRecipeStore from '../../store/useRecipeStore';

const EditRecipeForm = ({ recipe, onSuccess, onCancel }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
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

    updateRecipe({
      ...recipe,
      title: title.trim(),
      description: description.trim()
    });

    onSuccess();
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
            style={{
              width: '100%',
              padding: '8px',
              border: `1px solid ${errors.title ? '#ff0000' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
          {errors.title && <span style={{ color: '#ff0000', fontSize: '14px' }}>{errors.title}</span>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter recipe description"
            rows="6"
            style={{
              width: '100%',
              padding: '8px',
              border: `1px solid ${errors.description ? '#ff0000' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical'
            }}
          />
          {errors.description && <span style={{ color: '#ff0000', fontSize: '14px' }}>{errors.description}</span>}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Update Recipe
          </button>

          <button
            type="button"
            onClick={onCancel}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;