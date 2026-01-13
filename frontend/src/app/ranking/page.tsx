'use client'

import { DashboardLayout, Container } from '@/components/layout'
import { Card, Badge } from '@/components/ui'
import { useRanking } from '@/hooks'
import { Trophy, Star, ThumbsUp, TrendingUp } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function RankingPage() {
  const { ranking, loading } = useRanking()

  if (loading) {
    return (
      <DashboardLayout>
        <Container>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </Container>
      </DashboardLayout>
    )
  }

  const getMedalColor = (position: number) => {
    if (position === 0) return 'text-yellow-500'
    if (position === 1) return 'text-gray-400'
    if (position === 2) return 'text-orange-600'
    return 'text-gray-600'
  }

  const getMedalBg = (position: number) => {
    if (position === 0) return 'bg-yellow-50 border-yellow-200'
    if (position === 1) return 'bg-gray-50 border-gray-200'
    if (position === 2) return 'bg-orange-50 border-orange-200'
    return ''
  }

  return (
    <DashboardLayout>
      <Container>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Trophy className="w-8 h-8 mr-3 text-yellow-500" />
              Ranking de Feedbacks
            </h1>
            <p className="mt-2 text-gray-600">
              Feedbacks mais bem avaliados e curtidos da plataforma
            </p>
          </div>

          <div className="space-y-4">
            {ranking.length === 0 ? (
              <Card>
                <div className="text-center py-12">
                  <p className="text-gray-500">Nenhum feedback no ranking ainda</p>
                </div>
              </Card>
            ) : (
              ranking.map((item, index) => (
                <Card 
                  key={item.id} 
                  hoverable
                  className={`border-2 ${getMedalBg(index)}`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Posição */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        index < 3 ? 'bg-white shadow-md' : 'bg-gray-100'
                      }`}>
                        {index < 3 ? (
                          <Trophy className={`w-6 h-6 ${getMedalColor(index)}`} />
                        ) : (
                          <span className="text-lg font-bold text-gray-600">
                            {index + 1}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {item.author.name}
                        </span>
                        <span className="text-sm text-gray-500">→</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {item.recipient.name}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-3">{item.content}</p>

                      <div className="flex items-center space-x-4">
                        <Badge variant="warning">
                          <Star className="w-3 h-3 mr-1 inline fill-current" />
                          Rating: {item.rating}
                        </Badge>
                        <Badge variant="info">
                          <ThumbsUp className="w-3 h-3 mr-1 inline" />
                          Likes: {item.likes}
                        </Badge>
                        <Badge variant="success">
                          <TrendingUp className="w-3 h-3 mr-1 inline" />
                          Score: {item.score}
                        </Badge>
                      </div>

                      <div className="mt-2 text-xs text-gray-500">
                        {format(new Date(item.createdAt), "dd 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </Container>
    </DashboardLayout>
  )
}
