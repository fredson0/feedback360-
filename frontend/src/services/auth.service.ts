import api from '@/lib/api'
import { LoginDto, RegisterDto, AuthResponse, User } from '@/types'

function setTokenCookie(token: string) {
  const cookieString = `token=${token}; path=/; max-age=86400; SameSite=Lax`
  document.cookie = cookieString
  console.log('🍪 Cookie setado:', cookieString)
  console.log('🍪 Todos os cookies:', document.cookie)
}

function removeTokenCookie() {
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
}

export const authService = {
  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/user/login', data)
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token)
      setTokenCookie(response.data.access_token)
    }
    return response.data
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/user/register', data)
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token)
      setTokenCookie(response.data.access_token)
    }
    return response.data
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<{ message: string; user: User }>('/user/profile')
    return response.data.user
  },

  logout() {
    localStorage.removeItem('token')
    removeTokenCookie()
  },
}
