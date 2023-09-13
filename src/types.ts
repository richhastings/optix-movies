export interface Review {
  id: number
  response: string
}

export interface Movie {
  id: number
  title: string
  filmCompanyId: number
  reviews: number[]
}

export interface MovieCompany {
  id: number
  name: string
}
