import axios from 'axios'

const mealsApi = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
})

const normalizeMeals = (payload) => payload?.meals ?? []

const dedupeMeals = (meals) => {
  const ids = new Set()
  return meals.filter((meal) => {
    if (ids.has(meal.idMeal)) {
      return false
    }

    ids.add(meal.idMeal)
    return true
  })
}

export const getInitialMeals = async () => {
  const response = await mealsApi.get('/search.php?s=')
  const meals = normalizeMeals(response.data)

  if (meals.length > 0) {
    return meals
  }

  const fallbackLetters = ['a', 'b', 'c']
  const fallbackResponses = await Promise.all(
    fallbackLetters.map((letter) => mealsApi.get(`/search.php?f=${letter}`)),
  )

  return dedupeMeals(
    fallbackResponses.flatMap((result) => normalizeMeals(result.data)),
  )
}

export const searchMealsByName = async (query) => {
  const response = await mealsApi.get(`/search.php?s=${encodeURIComponent(query)}`)
  return normalizeMeals(response.data)
}

export const filterMealsByCategory = async (category) => {
  const response = await mealsApi.get(
    `/filter.php?c=${encodeURIComponent(category)}`,
  )
  return normalizeMeals(response.data)
}

export const filterMealsByIngredient = async (ingredient) => {
  const response = await mealsApi.get(
    `/filter.php?i=${encodeURIComponent(ingredient)}`,
  )
  return normalizeMeals(response.data)
}

export const filterMealsByArea = async (area) => {
  const response = await mealsApi.get(`/filter.php?a=${encodeURIComponent(area)}`)
  return normalizeMeals(response.data)
}

export const fetchRecipeById = async (id) => {
  const response = await mealsApi.get(`/lookup.php?i=${id}`)
  return normalizeMeals(response.data)[0] ?? null
}

export const fetchCategories = async () => {
  const response = await mealsApi.get('/categories.php')
  return response.data?.categories?.map((category) => category.strCategory) ?? []
}

export const fetchIngredients = async () => {
  const response = await mealsApi.get('/list.php?i=list')
  return (
    response.data?.meals
      ?.map((ingredient) => ingredient.strIngredient)
      .filter(Boolean)
      .slice(0, 80) ?? []
  )
}

export const fetchAreas = async () => {
  const response = await mealsApi.get('/list.php?a=list')
  return response.data?.meals?.map((area) => area.strArea).filter(Boolean) ?? []
}
