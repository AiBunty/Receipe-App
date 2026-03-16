# Recipe App

A responsive React recipe browser using [TheMealDB](https://www.themealdb.com/api.php).

## Features

- Browse recipe listings with image, name, and category
- Search recipes by name/keyword
- Filter by category, ingredient, and meal type (area)
- Combine search + filters for refined results
- Open full recipe details page with:
  - Instructions
  - Ingredients + measurements
  - Category and meal type
  - YouTube tutorial link (if available)
- Save favorites and persist them with localStorage

## Tech Stack

- React (Vite)
- Tailwind CSS
- Axios
- React Router

## Local Setup

1. Install dependencies:

	```bash
	npm install
	```

2. Start development server:

	```bash
	npm run dev
	```

3. Build for production:

	```bash
	npm run build
	```

## Deploy to Netlify

1. Push project to GitHub.
2. In Netlify, click "Add new site" -> "Import an existing project".
3. Connect your GitHub repository.
4. Use build settings:
	- Build command: `npm run build`
	- Publish directory: `dist`
5. Deploy site.

## Submission Checklist

- GitHub repository URL
- Netlify deployed app URL
