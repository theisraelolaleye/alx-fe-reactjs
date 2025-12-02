import { Link, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import data from '../data.json'

export default function RecipeDetail() {
  const { id } = useParams()
  const recipeId = Number(id)

  const recipe = useMemo(() => data.find((r) => r.id === recipeId), [recipeId])

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center">
        <div className="max-w-2xl mx-auto px-6 md:px-10 py-12">
          <h1 className="text-2xl font-semibold text-gray-900">Recipe not found</h1>
          <p className="mt-2 text-gray-600">We couldn't find the recipe you're looking for.</p>
          <Link to="/" className="mt-6 inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 md:py-12">
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
          ← Back to Home
        </Link>

        <header className="mt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{recipe.title}</h1>
          {recipe.summary && (
            <p className="mt-2 text-gray-600 max-w-3xl">{recipe.summary}</p>
          )}
        </header>

        <section className="mt-6">
          <div className="w-full overflow-hidden rounded-xl shadow-sm border border-gray-200 bg-white">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900">Ingredients</h2>
            <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
              {recipe.ingredients?.map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>)
              )}
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900">Steps</h2>
            <ol className="mt-4 space-y-3 list-decimal list-inside text-gray-700">
              {recipe.steps?.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>)
              )}
            </ol>
          </div>
        </section>
      </div>
    </div>
  )
}