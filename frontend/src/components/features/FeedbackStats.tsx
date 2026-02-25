'use client'

import { useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui'
import { BarChart3, TrendingUp, Users, Heart, Star, Send, Inbox } from 'lucide-react'

interface Feedback {
  id: number
  rating: number
  authorId: number
  recipientId: number
  likes?: number
  isLikedByCurrentUser?: boolean
  author: { nome: string }
  recipient: { nome: string }
}

interface User {
  id: number
  nome: string
}

interface FeedbackStatsProps {
  feedbacks: Feedback[]
  currentUserId?: number
  users: User[]
}

export default function FeedbackStats({ feedbacks, currentUserId, users }: FeedbackStatsProps) {
  
  // 🧮 ESTATÍSTICAS COMPUTADAS
  const stats = useMemo(() => {
    // Básicas
    const totalFeedbacks = feedbacks.length
    const averageRating = feedbacks.length > 0 
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : '0.0'
    
    // Por usuário atual
    const sentByUser = feedbacks.filter(f => f.authorId === currentUserId).length
    const receivedByUser = feedbacks.filter(f => f.recipientId === currentUserId).length
    
    // Distribuição por rating
    const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: feedbacks.filter(f => f.rating === rating).length,
      percentage: totalFeedbacks > 0 
        ? Math.round((feedbacks.filter(f => f.rating === rating).length / totalFeedbacks) * 100)
        : 0
    }))
    
    // Top feedbacks mais curtidos
    const topLiked = [...feedbacks]
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 3)
    
    // Usuários mais ativos
    const userActivity = users.map(user => ({
      ...user,
      sent: feedbacks.filter(f => f.authorId === user.id).length,
      received: feedbacks.filter(f => f.recipientId === user.id).length,
      total: feedbacks.filter(f => f.authorId === user.id || f.recipientId === user.id).length
    })).filter(u => u.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    
    return {
      totalFeedbacks,
      averageRating,
      sentByUser, 
      receivedByUser,
      ratingDistribution,
      topLiked,
      userActivity
    }
  }, [feedbacks, currentUserId, users])
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* 📊 MÉTRICAS GERAIS */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Feedbacks</CardTitle>
          <BarChart3 className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.totalFeedbacks}</div>
          <p className="text-xs text-gray-500">Total na plataforma</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Média de Rating</CardTitle>
          <Star className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{stats.averageRating}</div>
          <div className="flex items-center mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.round(Number(stats.averageRating))
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 📤📥 ENVIOS E RECEBIMENTOS PESSOAIS */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Enviados</CardTitle>
          <Send className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.sentByUser}</div>
          <p className="text-xs text-gray-500">Feedbacks que você enviou</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recebidos</CardTitle>
          <Inbox className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{stats.receivedByUser}</div>
          <p className="text-xs text-gray-500">Feedbacks que você recebeu</p>
        </CardContent>
      </Card>

      {/* 📊 DISTRIBUIÇÃO POR RATING */}
      <Card className="md:col-span-2 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-indigo-600" />
            Distribuição por Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="rating" rating={rating} size="sm">
                    {rating}★
                  </Badge>
                  <span className="text-sm text-gray-600">{count} feedbacks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-indigo-600 w-10">
                    {percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 🔥 TOP FEEDBACKS MAIS CURTIDOS */}
      <Card className="md:col-span-2 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="h-4 w-4 mr-2 text-red-600" />
            Top Feedbacks Mais Curtidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.topLiked.length > 0 ? stats.topLiked.map((feedback, index) => (
              <div key={feedback.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <Badge variant="glow" size="sm">#{index + 1}</Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {feedback.author.nome} → {feedback.recipient.nome}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="rating" rating={feedback.rating} size="xs">
                      {feedback.rating}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Heart className="h-3 w-3 mr-1 text-red-500" />
                      {feedback.likes || 0} likes
                    </span>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-sm text-gray-500 italic">Nenhum feedback curtido ainda</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 👥 USUÁRIOS MAIS ATIVOS */}
      <Card className="lg:col-span-4 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-emerald-600" />
            Usuários Mais Ativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.userActivity.map((user, index) => (
              <div key={user.id} className="text-center p-4 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg">
                <div className="flex justify-center mb-2">
                  <Badge variant={index === 0 ? 'glow' : 'primary'} size="sm">
                    #{index + 1}
                  </Badge>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{user.nome}</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Enviados:</span>
                    <span className="font-medium text-green-600">{user.sent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recebidos:</span>
                    <span className="font-medium text-purple-600">{user.received}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-emerald-600">{user.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}