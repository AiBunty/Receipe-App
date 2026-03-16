import { createContext, useContext, useMemo, useState } from 'react'

const FavoritesContext = createContext(null)

const FAVORITES_STORAGE_KEY = 'recipe-app-favorites'

const getInitialFavorites = () => {
  const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)

  if (!storedFavorites) {
    return []
  }

  try {
    return JSON.parse(storedFavorites)
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(getInitialFavorites)

  const toggleFavorite = (meal) => {
    setFavorites((current) => {
      const isAlreadyFavorite = current.some(
        (favoriteMeal) => favoriteMeal.idMeal === meal.idMeal,
      )

      const nextFavorites = isAlreadyFavorite
        ? current.filter((favoriteMeal) => favoriteMeal.idMeal !== meal.idMeal)
        : [...current, meal]

      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(nextFavorites))
      return nextFavorites
    })
  }

  const isFavorite = (mealId) => {
    return favorites.some((favoriteMeal) => favoriteMeal.idMeal === mealId)
  }

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites],
  )

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider')
  }

  return context
}
