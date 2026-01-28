'use client'

import { useState } from 'react'
import { DashboardLayout, Container } from '@/components/layout'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui'
import { useFeedbacks, useUsers } from '@/hooks'
import { useAuth } from '@/contexts/AuthContext'
import { ThumbsUp, Trash2, Plus, Star } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import CreateFeedbackModal from '@/components/features/CreateFeedbackModal'

export default function FeedbacksPage() {
  const { feedbacks, loading, toggleLike, deleteFeedback } = useFeedbacks()
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLike = async (feedbackId: number, isLiked: boolean) => {
    await toggleLike(feedbackId, isLiked)
  }

  const handleDelete = async (feedbackId: number) => {
    if (confirm('Tem certeza que deseja excluir este feedback?')) {
      await deleteFeedback(feedbackId)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <Container>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-gray-200 rounded"></div>
            ))}
          </div>
        </Container>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <Container>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Feedbacks</h1>
              <p className="mt-2 text-gray-600">
                Gerencie todos os feedbacks enviados e recebidos
              </p>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Feedback
            </Button>
          </div>

          <div className="space-y-4">
            {feedbacks.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500">Nenhum feedback encontrado</p>
                </CardContent>
              </Card>
            ) : (
              feedbacks.map((feedback) => {
                const isAuthor = feedback.authorId === user?.id
                const isLiked = feedback.isLikedByCurrentUser

                return (
                  <Card key={feedback.id} hoverable>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {feedback.author.nome}
                          </span>
                          <span className="text-sm text-gray-500">→</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {feedback.recipient.nome}
                          </span>
                          <Badge variant="info">
                            <Star className="w-3 h-3 mr-1 inline" />
                            {feedback.rating}
                          </Badge>
                        </div>

                        <p className="text-gray-700 mb-3">{feedback.content}</p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button
                            onClick={() => handleLike(feedback.id, isLiked || false)}
                            className={`flex items-center space-x-1 ${
                              isLiked ? 'text-primary-600' : 'hover:text-primary-600'
                            }`}
                          >
                            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                            <span>{feedback.likes}</span>
                          </button>
                          <span>
                            {format(new Date(feedback.createdAt), "dd 'de' MMM 'às' HH:mm", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                      </div>

                      {isAuthor && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(feedback.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </div>

        <CreateFeedbackModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Container>
    </DashboardLayout>
  )
}
