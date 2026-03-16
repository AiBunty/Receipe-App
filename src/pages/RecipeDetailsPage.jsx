import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchRecipeById } from '../api/meals'
import { useFavorites } from '../context/FavoritesContext'

const ingredientKeys = Array.from({ length: 20 }, (_, index) => index + 1)

export default function RecipeDetailsPage() {
  const { id } = useParams()
  const { toggleFavorite, isFavorite } = useFavorites()

  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadMeal = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await fetchRecipeById(id)
        setMeal(data)
      } catch {
        setError('Unable to load this recipe right now.')
      } finally {
        setLoading(false)
      }
    }

    loadMeal()
  }, [id])

  const ingredients = useMemo(() => {
    if (!meal) {
      return []
    }

    return ingredientKeys
      .map((key) => {
        const ingredient = meal[`strIngredient${key}`]?.trim()
        const measure = meal[`strMeasure${key}`]?.trim()

        if (!ingredient) {
          return null
        }

        return `${measure ? `${measure} ` : ''}${ingredient}`
      })
      .filter(Boolean)
  }, [meal])

  if (loading) {
    return <p className="text-slate-600">Loading recipe details...</p>
  }

  if (error || !meal) {
    return (
      <div className="space-y-4">
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error || 'Recipe not found.'}
        </p>
        <Link
          to="/"
          className="inline-flex rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700"
        >
          Back to recipes
        </Link>
      </div>
    )
  }

  const favorite = isFavorite(meal.idMeal)

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex text-sm font-semibold text-orange-700 hover:underline">
        ← Back to recipe list
      </Link>

      <article className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="h-80 w-full object-cover" />

        <div className="space-y-6 p-6">
          <header className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900 md:text-4xl">{meal.strMeal}</h1>
            <div className="flex flex-wrap gap-2 text-sm font-semibold">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-800">
                {meal.strCategory}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">
                {meal.strArea}
              </span>
            </div>
          </header>

          <button
            type="button"
            onClick={() =>
              toggleFavorite({
                idMeal: meal.idMeal,
                strMeal: meal.strMeal,
                strMealThumb: meal.strMealThumb,
                strCategory: meal.strCategory,
              })
            }
            className={`rounded-lg px-4 py-2 font-semibold transition ${
              favorite
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-slate-900 text-white hover:bg-slate-700'
            }`}
          >
            {favorite ? 'Remove from favorites' : 'Save to favorites'}
          </button>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Ingredients</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {ingredients.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Instructions</h2>
            <p className="mt-3 whitespace-pre-line leading-7 text-slate-700">
              {meal.strInstructions}
            </p>
          </section>

          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              Watch video tutorial
            </a>
          )}
        </div>
      </article>
    </div>
  )
}
