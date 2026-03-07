export interface User {
  id: string
  email: string
  nome: string
  createdAt: string
  updatedAt: string
}

export interface Feedback {
  id: string
  message?: string  // Campo atual do backend
  rating: number
  likes: number
  authorId: string
  author: User
  recipientId: string
  recipient: User
  createdAt: string
  updatedAt: string
  isLikedByCurrentUser?: boolean
}

export interface CreateFeedbackDto {
  message: string
  rating: number
  recipientId: string
}

export interface UpdateFeedbackDto {
  message?: string
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
  message?: string
  rating: number
  likes: number
  score: number
  author: User
  recipient: User
  createdAt: string
}
