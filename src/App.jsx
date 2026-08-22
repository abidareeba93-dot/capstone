import { useState } from 'react'
import Chat from './Chat'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

const movies = [
  { id: 1, title: 'The Dark Knight', year: 2008, type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
  { id: 2, title: 'Inception', year: 2010, type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg' },
  { id: 3, title: 'Interstellar', year: 2014, type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
  { id: 4, title: 'Stranger Things', year: 2016, type: 'Series', poster: 'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg' },
  { id: 5, title: 'Wednesday', year: 2022, type: 'Series', poster: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg' },
  { id: 6, title: 'Avatar', year: 2009, type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg' },
  { id: 7, title: 'The Matrix', year: 1999, type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },
  { id: 8, title: 'Breaking Bad', year: 2008, type: 'Series', poster: 'https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRN.jpg' },
  { id: 9, title: 'Titanic', year: 1997, type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg' },
  { id: 10, title: 'Avengers: Endgame', year: 2019, type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg' },
  { id: 11, title: 'Loki', year: 2021, type: 'Series', poster: 'https://image.tmdb.org/t/p/w500/voHUmluYmKyleFkTu3lOXQG702u.jpg' },
  { id: 12, title: 'Joker', year: 2019, type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg' },
  { id: 13, title: 'Wednesday', year: 2022, type: 'Series', poster: '' },
  { id: 14, title: 'The Batman', year: 2022, type: 'Movie', poster: '' },
  { id: 15, title: 'Peaky Blinders', year: 2013, type: 'Series', poster: '' },
  { id: 16, title: 'Dune', year: 2021, type: 'Movie', poster: '' },
]

function Home({ favourites, toggleFavourite }) {
  const [search, setSearch] = useState('')

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <h2>Discover Movies & Series</h2>

      <div className="search">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>

      <MovieGrid
        movies={filteredMovies}
        favourites={favourites}
        toggleFavourite={toggleFavourite}
      />
<Chat />
    </>
  )
}

function Favourites({ favourites, toggleFavourite }) {
  const favouriteMovies = movies.filter((movie) =>
    favourites.includes(movie.id)
  )

  return (
    <>
      <h2>My Favourites</h2>

      {favouriteMovies.length === 0 ? (
        <div className="empty">
          <h3>No favourites yet ❤️</h3>
          <p>Add some movies to your favourites!</p>
        </div>
      ) : (
        <MovieGrid
          movies={favouriteMovies}
          favourites={favourites}
          toggleFavourite={toggleFavourite}
        />
      )}
    </>
  )
}

function Health() {
  return (
    <div className="empty">
      <h2>Health Check</h2>
      <p>MovieHub is running successfully.</p>
      <p>Data fetched: {movies.length} movies and series</p>
    </div>
  )
}

function MovieGrid({ movies, favourites, toggleFavourite }) {
  if (movies.length === 0) {
    return (
      <div className="empty">
        <h3>No movies found</h3>
        <p>Try searching for another title.</p>
      </div>
    )
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div className="movie-card" key={movie.id}>
          <div className="poster">
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={movie.title}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement.classList.add('fallback')
                }}
              />
            ) : (
              <div className="fallback">🎬</div>
            )}
          </div>

          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <span>{movie.type}</span>

            <button
              className="heart"
              onClick={() => toggleFavourite(movie.id)}
            >
              {favourites.includes(movie.id) ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [favourites, setFavourites] = useState(() => {
    return JSON.parse(localStorage.getItem('favourites')) || []
  })

  const toggleFavourite = (id) => {
    const updated = favourites.includes(id)
      ? favourites.filter((item) => item !== id)
      : [...favourites, id]

    setFavourites(updated)
    localStorage.setItem('favourites', JSON.stringify(updated))
  }

  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <h1>🎬 MovieHub</h1>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/favourites">
              Favourites ({favourites.length})
            </Link>
            <Link to="/health">Health Check</Link>
          </div>
        </nav>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  favourites={favourites}
                  toggleFavourite={toggleFavourite}
                />
              }
            />

            <Route
              path="/favourites"
              element={
                <Favourites
                  favourites={favourites}
                  toggleFavourite={toggleFavourite}
                />
              }
            />

            <Route path="/health" element={<Health />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

