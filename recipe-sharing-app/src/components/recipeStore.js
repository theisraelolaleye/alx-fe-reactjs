import { create } from 'zustand'

const useRecipeStore = create(set => ({
  recipes: [],

  favorites: [], // Array storing IDs of recipes user has favorited
  addFavorite: (recipeId) => set(state => ({ favorites: [...state.favorites, recipeId] })),
  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  recommendations: [], // Array storing recommended recipes based on favorites

  // Generate recipe recommendations based on user's favorites
  // Simple algorithm: recommend recipes similar to favorites with some randomness
  generateRecommendations: () => set(state => {
    // Mock implementation based on favorites
    const recommended = state.recipes.filter(recipe =>
      state.favorites.includes(recipe.id) && Math.random() > 0.5 // 50% chance for favorited recipes
    );
    return { recommendations: recommended };
  }),

  searchTerm: '', // Current search query string
  setSearchTerm: (term) => set({
    searchTerm: term
  }),
  filteredRecipes: [], // Cached filtered results (not actively used in current implementation)
  filterRecipe: () => set(state => ({
    filteredRecipes: state.recipes.filter(recipe => recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()))
  })),
  addRecipe: (newRecipe) => set(state => ({
    recipes: [...state.recipes, { ...newRecipe, id: Date.now() }]
  })),
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),
  deleteRecipe: (id) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  setRecipes: (recipes) => set({ recipes })
}));

export default useRecipeStore;