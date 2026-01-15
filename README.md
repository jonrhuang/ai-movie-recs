# AI Movie Recommendation App
An AI-powered movie recommendation web application built with React and TypeScript. Up to 6 different people can answer a questionaire and a RAG agent will recommend 3 movies that best fit the group's preferences.

---
## Features
- Retrieval Augmented Generation (RAG) Agent
- Openai, Supabase Postgres Database, TheMovieDataBase API

## How it works
1. Start the quiz by answering two questions, how many people, and how much time
2. Each person answers a quick questionaire about their movie preference
3. The app then combines all the answers and creates an embedding using and api call to OpenAI's embedding model, "text-embedding-3-small"
4. The app then makes an api call to the Supabase database, which has a small list of movies and the embeddings of the plot, and performs a similarity check and returns a list of the top 3 most similar movies
5. The app then recommends each movie with a description its movie poster, through a call to the TMDB api

---
## Tech Stack
- **Vite**
- **TypeScript**
- **Library**: React
- **Package Manager**: npm

---
## Project Structure
```
ai-movie-recs/
├── public/
├── src/
│ ├── api/
│ ├── assets/
│ ├── components/
│ ├── db/
│ ├── utils/
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── README.md
├── index.html
├── package.json
└── vite.config.js
```

---
## Dependencies

### Main Dependencies
- **@supabase/supabase-js** - 2.90.1
- **dedent** - 1.7.1
- **openai** - 6.16.0
- **react** - 19.2.0
- **react-dom** - 19.2.0
- **react-router-dom** - 7.12.0

### Dev Dependencies
- **@eslint/js** - 9.39.1
- **@types/node** - 24.10.1
- **@types/react** - 19.2.5
- **@types/react-dom** - 19.2.3
- **@vitejs/plugin-react** - 5.1.1
- **eslint** - 9.39.1
- **eslint-plugin-react-hooks** - 7.0.1
- **eslint-plugin-react-refresh** - 0.4.24
- **globals** - 16.5.0
- **typescript** - 5.9.3
- **typescript-eslint** - 8.46.4
- **vite** - 7.2.4

---
## Running & Building

### Prerequisites
- Node.js
- npm

## Set up & Development

Clone the repo
```
git clone https://github.com/jonrhuang/ai-movie-recs.git
cd ai-movie-recs
```

Install the dependencies
```
npm install
```

Add your API keys in a .env file
```
VITE_SUPABASE_URL=
VITE_SUPABASE_API_KEY=
VITE_OPENAI_API_KEY=
VITE_TMDB_API_KEY=
```

In Supabase, run the commands in "supabase.sql"

## Running Development Server
From the project root, run
`npm run dev`

Connect to the app in your browser on the port it is running on
Example: localhost:8000/
