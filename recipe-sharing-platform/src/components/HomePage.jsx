import { useEffect, useState } from 'react'
import data from '../data.json'

export default function HomePage() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    // Simulate async loading; in real app this could be fetch
    setRecipes(data)
  }, [])

  return (
    <div className="min-h-screen max-w-7xl w-full mx-auto bg-red-500">
      <header className="px-6 py-8 md:px-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Recipe Sharing Platform</h1>
        <p className="mt-2 text-gray-600 text-red-700">Discover and share delicious recipes.</p>
      </header>

      <main className="px-6 md:px-10 pb-16  ">
        <section>
          <h2 className="sr-only">Featured Recipes</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
            {recipes.map((recipe) => (
              <article
                key={recipe.id}
                className="group bg-white rounded-xl shadow-sm max-w-sm border border-gray-100 overflow-hidden transition-transform  duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{recipe.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">{recipe.summary}</p>

                  <a
                    href={`#/recipe/${recipe.id}`}
                    className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    View details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="ml-1 h-4 w-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
