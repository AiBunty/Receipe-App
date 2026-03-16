import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function RecipeCard({ meal }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(meal.idMeal)

  return (
    <Link
      to={`/recipe/${meal.idMeal}`}
      className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault()
          toggleFavorite({
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            strCategory: meal.strCategory ?? 'Unknown',
          })
        }}
        className={`absolute right-3 top-3 rounded-full px-3 py-1 text-sm font-semibold shadow-sm transition ${
          favorite
            ? 'bg-amber-500 text-white'
            : 'bg-white/95 text-slate-700 hover:bg-slate-100'
        }`}
      >
        {favorite ? 'Saved' : 'Save'}
      </button>

      <div className="p-4">
        <h3 className="line-clamp-2 text-lg font-bold text-slate-900">{meal.strMeal}</h3>
        <p className="mt-2 text-sm text-slate-600">
          {meal.strCategory || 'Category unavailable'}
        </p>
      </div>
    </Link>
  )
}
