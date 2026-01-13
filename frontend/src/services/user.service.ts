import api from '@/lib/api'
import { User } from '@/types'

export const userService = {
  async getAll(): Promise<User[]> {
    const response = await api.get<User[]>('/user')
    return response.data
  },

  async getById(id: number): Promise<User> {
    const response = await api.get<User>(`/user/${id}`)
    return response.data
  },
}
