'use client'

import { DashboardLayout, Container } from '@/components/layout'
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui'
import { useFeedbacks } from '@/hooks'
import { useAuth } from '@/contexts/AuthContext'
import { MessageSquare, ThumbsUp, TrendingUp, Users } from 'lucide-react'

export default function DashboardPage() {
  const { feedbacks, loading } = useFeedbacks()
  const { user } = useAuth()

  // Estatísticas
  const myFeedbacks = feedbacks.filter(f => f.authorId === user?.id)
  const receivedFeedbacks = feedbacks.filter(f => f.recipientId === user?.id)
  const totalLikes = receivedFeedbacks.reduce((sum, f) => sum + f.likes, 0)
  const averageRating = receivedFeedbacks.length > 0
    ? (receivedFeedbacks.reduce((sum, f) => sum + f.rating, 0) / receivedFeedbacks.length).toFixed(1)
    : '0'

  const stats = [
    {
      name: 'Feedbacks Enviados',
      value: myFeedbacks.length,
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Feedbacks Recebidos',
      value: receivedFeedbacks.length,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Total de Likes',
      value: totalLikes,
      icon: ThumbsUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Avaliação Média',
      value: averageRating,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ]

  if (loading) {
    return (
      <DashboardLayout>
        <Container>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </Container>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <Container>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Olá, {user?.name}! 👋
            </h1>
            <p className="mt-2 text-gray-600">
              Aqui está um resumo das suas atividades no Feedback360
            </p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.name} hoverable>
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-lg p-3 ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Feedbacks Recentes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Últimos Enviados */}
            <Card>
              <CardHeader>
                <CardTitle>Últimos Feedbacks Enviados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myFeedbacks.slice(0, 3).map((feedback) => (
                    <div key={feedback.id} className="border-l-4 border-primary-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          Para: {feedback.recipient.name}
                        </span>
                        <Badge variant="info">⭐ {feedback.rating}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {feedback.content}
                      </p>
                    </div>
                  ))}
                  {myFeedbacks.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Você ainda não enviou nenhum feedback
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Últimos Recebidos */}
            <Card>
              <CardHeader>
                <CardTitle>Últimos Feedbacks Recebidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {receivedFeedbacks.slice(0, 3).map((feedback) => (
                    <div key={feedback.id} className="border-l-4 border-green-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          De: {feedback.author.name}
                        </span>
                        <Badge variant="success">⭐ {feedback.rating}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {feedback.content}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {feedback.likes} likes
                      </div>
                    </div>
                  ))}
                  {receivedFeedbacks.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Você ainda não recebeu nenhum feedback
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </DashboardLayout>
  )
}
