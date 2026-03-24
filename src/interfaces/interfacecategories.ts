export interface categoriesResponse {
  results: number
  metadata: Metadata
  data: categories[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface categories {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
