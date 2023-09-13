import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

import { Movie, Review } from '../types'

import Button from './Button'

const REVIEW_API_URL =
  'https://comforting-starlight-f3456a.netlify.app/.netlify/functions/submitReview'

interface ReviewFormProps {
  movie: Movie
  reviewsSubmitted: Review[]
  setReviewsSubmitted: (value: any[]) => void
}

const ReviewForm = ({
  movie,
  reviewsSubmitted,
  setReviewsSubmitted,
}: ReviewFormProps) => {
  const Schema = Yup.object().shape({
    review: Yup.string()
      .max(100, 'Reviews should be 100 characters or less')
      .required('This field is required'),
  })

  const handleSubmit = async (movie: any, values: any) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: values.review }),
    }
    const submitRes = await fetch(REVIEW_API_URL, requestOptions)
    const submitJson = await submitRes.json()
    setReviewsSubmitted([
      ...reviewsSubmitted,
      { id: movie.id, response: submitJson.message },
    ])
  }

  return (
    <div className="space-y-2">
      <h2>Please leave your review below:</h2>
      <Formik
        initialValues={{
          review: '',
        }}
        validationSchema={Schema}
        onSubmit={(values) => {
          handleSubmit(movie, values)
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <label>
              <span className="text-xs">
                Review: <span className="text-red-600">*</span>
              </span>
              <Field className="border w-full p-2 mb-2" name="review" />
              {errors.review && touched.review ? (
                <div className="text-red-600 text-xs">{errors.review}</div>
              ) : null}
            </label>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ReviewForm
