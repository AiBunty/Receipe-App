import RecipeCard from './RecipeCard'

export default function RecipeGrid({ meals }) {
  if (meals.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <p className="text-lg font-semibold text-slate-700">No recipes match your criteria.</p>
        <p className="mt-2 text-slate-500">Try another keyword or clear one of the filters.</p>
      </div>
    )
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {meals.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </section>
  )
}
