export interface User {
  id: number
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Feedback {
  id: number
  content: string
  rating: number
  likes: number
  authorId: number
  author: User
  recipientId: number
  recipient: User
  createdAt: string
  updatedAt: string
  isLikedByCurrentUser?: boolean
}

export interface CreateFeedbackDto {
  content: string
  rating: number
  recipientId: number
}

export interface UpdateFeedbackDto {
  content?: string
  rating?: number
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
  nome: string
}

export interface AuthResponse {
  access_token: string
  user: User
}

export interface RankingItem {
  id: number
  content: string
  rating: number
  likes: number
  score: number
  author: User
  recipient: User
  createdAt: string
}
