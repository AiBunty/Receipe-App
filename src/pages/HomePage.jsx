import { useEffect, useMemo, useState } from 'react'
import {
  fetchAreas,
  fetchCategories,
  fetchIngredients,
  filterMealsByArea,
  filterMealsByCategory,
  filterMealsByIngredient,
  getInitialMeals,
  searchMealsByName,
} from '../api/meals'
import RecipeGrid from '../components/RecipeGrid'
import SearchAndFilters from '../components/SearchAndFilters'

const intersectMealsById = (baseMeals, filterMeals) => {
  const allowedIds = new Set(filterMeals.map((meal) => meal.idMeal))
  return baseMeals.filter((meal) => allowedIds.has(meal.idMeal))
}

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [area, setArea] = useState('')

  const [categories, setCategories] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [areas, setAreas] = useState([])

  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search.trim())
    }, 350)

    return () => clearTimeout(timeoutId)
  }, [search])

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [categoryData, ingredientData, areaData] = await Promise.all([
          fetchCategories(),
          fetchIngredients(),
          fetchAreas(),
        ])

        setCategories(categoryData)
        setIngredients(ingredientData)
        setAreas(areaData)
      } catch {
        setError('Unable to load filter options. Please refresh.')
      }
    }

    loadFilterOptions()
  }, [])

  useEffect(() => {
    const loadMeals = async () => {
      setLoading(true)
      setError('')

      try {
        const baseMeals = debouncedSearch
          ? await searchMealsByName(debouncedSearch)
          : await getInitialMeals()

        const filterRequests = []

        if (category) {
          filterRequests.push(filterMealsByCategory(category))
        }

        if (ingredient) {
          filterRequests.push(filterMealsByIngredient(ingredient))
        }

        if (area) {
          filterRequests.push(filterMealsByArea(area))
        }

        const filterResults = await Promise.all(filterRequests)
        const filteredMeals = filterResults.reduce(intersectMealsById, baseMeals)

        setMeals(filteredMeals)
      } catch {
        setError('Failed to fetch recipes. Please try again in a moment.')
        setMeals([])
      } finally {
        setLoading(false)
      }
    }

    loadMeals()
  }, [debouncedSearch, category, ingredient, area])

  const activeFilters = useMemo(() => {
    return [category, ingredient, area].filter(Boolean).length
  }, [category, ingredient, area])

  const resetFilters = () => {
    setSearch('')
    setCategory('')
    setIngredient('')
    setArea('')
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
          Discover Tasty Recipes
        </h1>
        <p className="max-w-2xl text-slate-600">
          Browse meals from TheMealDB, combine search with filters, and open any card to
          see full recipe details.
        </p>
      </header>

      <SearchAndFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        ingredient={ingredient}
        onIngredientChange={setIngredient}
        area={area}
        onAreaChange={setArea}
        categories={categories}
        ingredients={ingredients}
        areas={areas}
        onReset={resetFilters}
      />

      <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
        <span>{loading ? 'Loading recipes...' : `${meals.length} recipes found`}</span>
        <span>{activeFilters > 0 ? `${activeFilters} filter(s) active` : 'No active filters'}</span>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50"
            ></div>
          ))}
        </div>
      ) : (
        <RecipeGrid meals={meals} />
      )}
    </div>
  )
}
