import { useState, useEffect } from 'react'
import MoviesTable from './components/MoviesTable'
import Button from './components/Button'
import { Movie, MovieCompany, Review } from './types'

const MOVIE_COMPANIES_API_URL =
  'https://comforting-starlight-f3456a.netlify.app/.netlify/functions/movieCompanies'

const MOVIES_API_URL =
  'https://comforting-starlight-f3456a.netlify.app/.netlify/functions/movies'

export const App = () => {
  const [reviewsSubmitted, setReviewsSubmitted] = useState<Review[]>([])
  const [movies, setMovies] = useState<Movie[]>([])
  const [movieCompanies, setMovieCompanies] = useState<MovieCompany[]>([])

  const fetchData = async () => {
    const moviesRes = await fetch(MOVIES_API_URL)
    const moviesJson = await moviesRes.json()
    setMovies(moviesJson)
    const movieCompaniesRes = await fetch(MOVIE_COMPANIES_API_URL)
    const movieCompaniesJson = await movieCompaniesRes.json()
    setMovieCompanies(movieCompaniesJson)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="p-8">
      {!movies.length || !movieCompanies.length ? (
        <div className="flex h-screen justify-center items-center">
          No movies loaded yet
          {/* TODO: Add loading spinner? */}
        </div>
      ) : null}
      {movies.length && movieCompanies.length && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl">Welcome to the Movie Database!</h2>
              <p className="text-xl">Total movies: {movies.length}</p>
            </div>
            <Button onClick={() => fetchData()}>Refresh data</Button>
          </div>
          <MoviesTable
            movieCompanies={movieCompanies}
            reviewsSubmitted={reviewsSubmitted}
            setReviewsSubmitted={setReviewsSubmitted}
            movies={movies}
          />
        </div>
      )}
    </div>
  )
}
