import { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import ReviewForm from './ReviewForm'
import getAverageReview from '../lib/average-review-getter'
import ArrowDown from './ArrowDown'
import ArrowUp from './ArrowUp'

interface MoviesTableProps {
  movies: any[]
  reviewsSubmitted: any[]
  setReviewsSubmitted: (value: any[]) => void
  movieCompanies: any[]
}

const MoviesTable = ({
  movies,
  reviewsSubmitted,
  setReviewsSubmitted,
  movieCompanies,
}: MoviesTableProps) => {
  const getMovieCompany = (id: number) =>
    movieCompanies.filter((company) => company.id === id)[0]?.name

  const moviesWithAverageRating = movies.map((movie) => {
    return { ...movie, averageReview: Number(getAverageReview(movie.reviews)) }
  })

  const [sortedMovies, setSortedMovies] = useState(moviesWithAverageRating)
  const [currentSort, setCurrentSort] = useState<string>('')

  const sortMovies = () => {
    if (currentSort === '') {
      setSortedMovies(
        moviesWithAverageRating.sort(
          (a, b) => b.averageReview - a.averageReview
        )
      )
      setCurrentSort('desc')
    }
    if (currentSort === 'asc') {
      setSortedMovies(
        moviesWithAverageRating.sort(
          (a, b) => b.averageReview - a.averageReview
        )
      )
      setCurrentSort('desc')
    }
    if (currentSort === 'desc') {
      setSortedMovies(
        moviesWithAverageRating.sort(
          (a, b) => a.averageReview - b.averageReview
        )
      )
      setCurrentSort('asc')
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center font-bold">
        <div className="w-1/3">Title</div>
        <div className="w-1/3">
          Average Review Score
          <button
            className="inline-flex hover:bg-gray-200 ml-4 items-center justify-center border p-2"
            onClick={() => sortMovies()}
          >
            {currentSort === 'asc' ? <ArrowUp /> : <ArrowDown />}
          </button>
        </div>
        <div className="w-1/3">Film Company</div>
      </div>

      <div className="space-y-2">
        {sortedMovies.map((movie, i) => {
          const hasReview = reviewsSubmitted.some(
            (review) => review.id === movie.id
          )

          return (
            <Disclosure key={`movie${i}`}>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`p-2 w-full hover:bg-gray-100 border flex justify-between text-left ${
                      open ? 'bg-gray-200 hover:bg-gray-100' : ''
                    }`}
                  >
                    <div className="w-1/3">{movie.title}</div>
                    <div className="w-1/3">
                      {getAverageReview(movie.reviews)}
                    </div>
                    <div className="w-1/3">
                      {getMovieCompany(movie.filmCompanyId)}
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel className="py-2">
                    {!hasReview && (
                      <ReviewForm
                        reviewsSubmitted={reviewsSubmitted}
                        setReviewsSubmitted={setReviewsSubmitted}
                        movie={movie}
                      />
                    )}
                    {hasReview &&
                      reviewsSubmitted.filter(
                        (review) => review.id === movie.id
                      )[0].response}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          )
        })}
      </div>
    </div>
  )
}

export default MoviesTable
