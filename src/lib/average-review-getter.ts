export default (reviews: any) => {
  return (
    reviews.reduce((acc: number, i: number) => acc + i, 0) / reviews.length
  ).toFixed(1)
}
