'use client'

import { useState, useEffect } from 'react'
import { Feedback, CreateFeedbackDto, UpdateFeedbackDto, RankingItem } from '@/types'
import { feedbackService } from '@/services/feedback.service'
import toast from 'react-hot-toast'

export function useFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadFeedbacks()
  }, [])

  async function loadFeedbacks() {
    try {
      setLoading(true)
      const data = await feedbackService.getAll()
      setFeedbacks(data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      toast.error('Erro ao carregar feedbacks')
    } finally {
      setLoading(false)
    }
  }

  async function createFeedback(data: CreateFeedbackDto) {
    try {
      const newFeedback = await feedbackService.create(data)
      setFeedbacks([newFeedback, ...feedbacks])
      toast.success('Feedback criado com sucesso!')
      return newFeedback
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erro ao criar feedback')
      throw err
    }
  }

  async function updateFeedback(id: number, data: UpdateFeedbackDto) {
    try {
      const updated = await feedbackService.update(id, data)
      setFeedbacks(feedbacks.map(f => f.id === id ? updated : f))
      toast.success('Feedback atualizado com sucesso!')
      return updated
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erro ao atualizar feedback')
      throw err
    }
  }

  async function deleteFeedback(id: number) {
    try {
      await feedbackService.delete(id)
      setFeedbacks(feedbacks.filter(f => f.id !== id))
      toast.success('Feedback excluído com sucesso!')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erro ao excluir feedback')
      throw err
    }
  }

  async function toggleLike(id: number, isLiked: boolean) {
    try {
      const updated = isLiked 
        ? await feedbackService.unlike(id)
        : await feedbackService.like(id)
      
      setFeedbacks(feedbacks.map(f => f.id === id ? updated : f))
      return updated
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erro ao processar like')
      throw err
    }
  }

  return {
    feedbacks,
    loading,
    error,
    loadFeedbacks,
    createFeedback,
    updateFeedback,
    deleteFeedback,
    toggleLike,
  }
}

export function useRanking() {
  const [ranking, setRanking] = useState<RankingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadRanking()
  }, [])

  async function loadRanking() {
    try {
      setLoading(true)
      const data = await feedbackService.getRanking()
      setRanking(data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      toast.error('Erro ao carregar ranking')
    } finally {
      setLoading(false)
    }
  }

  return {
    ranking,
    loading,
    error,
    loadRanking,
  }
}
