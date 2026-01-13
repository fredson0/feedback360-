import api from '@/lib/api'
import { 
  Feedback, 
  CreateFeedbackDto, 
  UpdateFeedbackDto,
  RankingItem 
} from '@/types'

export const feedbackService = {
  async getAll(): Promise<Feedback[]> {
    const response = await api.get<Feedback[]>('/feedback')
    return response.data
  },

  async getById(id: number): Promise<Feedback> {
    const response = await api.get<Feedback>(`/feedback/${id}`)
    return response.data
  },

  async create(data: CreateFeedbackDto): Promise<Feedback> {
    const response = await api.post<Feedback>('/feedback', data)
    return response.data
  },

  async update(id: number, data: UpdateFeedbackDto): Promise<Feedback> {
    const response = await api.patch<Feedback>(`/feedback/${id}`, data)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/feedback/${id}`)
  },

  async like(id: number): Promise<Feedback> {
    const response = await api.post<Feedback>(`/feedback/${id}/like`)
    return response.data
  },

  async unlike(id: number): Promise<Feedback> {
    const response = await api.delete<Feedback>(`/feedback/${id}/like`)
    return response.data
  },

  async getRanking(): Promise<RankingItem[]> {
    const response = await api.get<RankingItem[]>('/feedback/ranking')
    return response.data
  },
}
