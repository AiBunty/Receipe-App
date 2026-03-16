import { Link } from 'react-router-dom'
import RecipeGrid from '../components/RecipeGrid'
import { useFavorites } from '../context/FavoritesContext'

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">Your Favorites</h1>
        <p className="text-slate-600">
          Recipes you saved are stored locally and will still be here next time.
        </p>
      </header>

      {favorites.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <p className="text-lg font-semibold text-slate-700">No saved recipes yet.</p>
          <Link
            to="/"
            className="mt-3 inline-flex rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700"
          >
            Explore recipes
          </Link>
        </div>
      ) : (
        <RecipeGrid meals={favorites} />
      )}
    </div>
  )
}
