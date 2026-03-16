import { NavLink, Route, Routes } from 'react-router-dom'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import RecipeDetailsPage from './pages/RecipeDetailsPage'

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.25),_transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.2),_transparent_45%),linear-gradient(160deg,#fff7ed_0%,#fff_50%,#f8fafc_100%)]">
      <header className="border-b border-orange-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-black tracking-tight text-slate-900">Recipe App</h1>
          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              Browse
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              Favorites
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
