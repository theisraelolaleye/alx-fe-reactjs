import { useState } from 'react'

export default function AddRecipeForm() {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!title.trim()) newErrors.title = 'Title is required.'
    if (!ingredients.trim()) newErrors.ingredients = 'Ingredients are required.'
    if (!steps.trim()) newErrors.steps = 'Instructions are required.'

    // Ingredients should contain at least two items (by splitting lines)
    const ingredientItems = ingredients
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
    if (ingredientItems.length < 2) {
      newErrors.ingredients = 'Please list at least two ingredients (one per line).'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length > 0) return

    const payload = {
      title: title.trim(),
      ingredients: ingredients
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean),
      steps: steps
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean),
    }

    // For now, just log; in a real app, post to API.
    console.log('Recipe submitted:', payload)
    setSubmitted(true)
    setTitle('')
    setIngredients('')
    setSteps('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Add a New Recipe</h1>
        <p className="mt-2 text-gray-600">Share your favorite recipe with the community.</p>

        {submitted && (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
            Recipe submitted! (Check the console output.)
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-900">Recipe Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`mt-2 w-full rounded-md border px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.title ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-300'}`}
              placeholder="e.g., Spaghetti Carbonara"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-900">Ingredients</label>
            <p className="mt-1 text-xs text-gray-500">List one ingredient per line.</p>
            <textarea
              id="ingredients"
              rows={6}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className={`mt-2 w-full rounded-md border px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.ingredients ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-300'}`}
              placeholder={"200g spaghetti\n2 large eggs\n100g pancetta"}
            />
            {errors.ingredients && <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>}
          </div>

          <div>
            <label htmlFor="steps" className="block text-sm font-medium text-gray-900">Instructions</label>
            <p className="mt-1 text-xs text-gray-500">Write one step per line.</p>
            <textarea
              id="steps"
              rows={8}
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className={`mt-2 w-full rounded-md border px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.steps ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-300'}`}
              placeholder={"Cook pasta until al dente\nFry pancetta with garlic\nToss pasta with egg mixture"}
            />
            {errors.steps && <p className="mt-1 text-sm text-red-600">{errors.steps}</p>}
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


