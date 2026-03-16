export default function SearchAndFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  ingredient,
  onIngredientChange,
  area,
  onAreaChange,
  categories,
  ingredients,
  areas,
  onReset,
}) {
  return (
    <section className="rounded-2xl border border-orange-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
      <div className="grid gap-4 lg:grid-cols-4">
        <label className="flex flex-col gap-2 lg:col-span-4">
          <span className="text-sm font-semibold text-slate-700">Search Recipes</span>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Try pasta, chicken, curry..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-700">Category</span>
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-700">Ingredient</span>
          <select
            value={ingredient}
            onChange={(event) => onIngredientChange(event.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          >
            <option value="">All ingredients</option>
            {ingredients.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-700">Meal Type (Area)</span>
          <select
            value={area}
            onChange={(event) => onAreaChange(event.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          >
            <option value="">All meal types</option>
            {areas.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={onReset}
          className="self-end rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700"
        >
          Reset filters
        </button>
      </div>
    </section>
  )
}
