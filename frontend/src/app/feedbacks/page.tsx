'use client'

import { useState, useMemo } from 'react'
import { DashboardLayout, Container } from '@/components/layout'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input } from '@/components/ui'
import { useFeedbacks, useUsers } from '@/hooks'
import { useAuth } from '@/contexts/AuthContext'
import { ThumbsUp, Trash2, Plus, Search, Star } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import  FeedbackStats from '@/components/features/FeedbackStats'
import CreateFeedbackModal from '@/components/features/CreateFeedbackModal'

export default function FeedbacksPage() {
  // 🏠 PÁGINA = DIRETOR DE ORQUESTRA
  
  // ⚡ HOOKS = INSTALAÇÃO ELÉTRICA (traz dados de fora) 
  const { feedbacks, loading, toggleLike, deleteFeedback } = useFeedbacks()
  const { users } = useUsers()
  const { user } = useAuth()
  
  // 💾 ESTADO LOCAL = MEMÓRIA DA PÁGINA (só ela controla)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchText, setSearchText] = useState('')  // 🔥 NOVO: Estado de busca

  // 🧮 COMPUTED VALUE = CÁLCULO AUTOMÁTICO (useMemo)
  const filteredFeedbacks = useMemo(() => {
    // Se não tem nada digitado, mostra tudo
    if (!searchText.trim()) {
      return feedbacks
    }

    // 🔍 FILTRO: Busca no conteúdo (case-insensitive)
    return feedbacks.filter(feedback => 
      feedback.content.toLowerCase().includes(searchText.toLowerCase())
    )
  }, [feedbacks, searchText]) // 🔄 Recalcula quando mudar feedbacks OU searchText

  // 🎪 FUNÇÕES DE AÇÃO = EVENTOS QUE A PÁGINA COORDENA
  const handleLike = async (feedbackId: number, isLiked: boolean) => {
    await toggleLike(feedbackId, isLiked)
  }

  const handleDelete = async (feedbackId: number) => {
    if (confirm('Tem certeza que deseja excluir este feedback?')) {
      await deleteFeedback(feedbackId)
    }
  }

  // 🔧 ESTADOS DE CARREGAMENTO = FEEDBACK VISUAL PARA O USUÁRIO
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

          {/* 🔍 BARRA DE BUSCA = COMPONENTE UI + ESTADO */}
          <div className="space-y-2">
            <div className="relative">
              {/* 🎨 ÍCONE DECORATIVO (posicionado absolutamente) */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              
              {/* 🪑 COMPONENTE UI BÁSICO (Input) */}
              <Input
                type="text"
                placeholder="🔍 Buscar feedbacks por conteúdo..."
                value={searchText}                    // 📖 LENDO o estado
                onChange={(e) => setSearchText(e.target.value)} // ✏️ ATUALIZANDO o estado
                className="pl-10"  // Espaço para o ícone
              />
            </div>
            
            {/* 📊 CONTADOR DE RESULTADOS */}
            {searchText && (
              <p className="text-sm text-gray-500">
                {filteredFeedbacks.length} feedback(s) encontrado(s)
              </p>
            )}
          </div>

          {/* 🎨 DEMONSTRAÇÃO DOS BADGES MELHORADOS */}
          <Card>
            <CardHeader>
              <CardTitle>🎨 Novos Badges Visual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Badges de Rating */}
                <div>
                  <h4 className="font-semibold mb-2">⭐ Ratings:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="rating" rating={5} icon>Excelente</Badge>
                    <Badge variant="rating" rating={4} icon>Muito Bom</Badge>
                    <Badge variant="rating" rating={3} icon>Regular</Badge>
                    <Badge variant="rating" rating={2} icon>Ruim</Badge>
                    <Badge variant="rating" rating={1} icon>Péssimo</Badge>
                  </div>
                </div>
                
                {/* Badges de Status */}
                <div>
                  <h4 className="font-semibold mb-2">🚦 Status:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="success" icon>Aprovado</Badge>
                    <Badge variant="warning" icon>Pendente</Badge>
                    <Badge variant="danger" icon>Rejeitado</Badge>
                    <Badge variant="info" icon>Em Análise</Badge>
                  </div>
                </div>
                
                {/* Badges Especiais */}
                <div>
                  <h4 className="font-semibold mb-2">✨ Especiais:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="glow" icon size="lg">Premium</Badge>
                    <Badge variant="primary" size="xs">Micro</Badge>
                    <Badge variant="default" size="xl" border>Com Borda</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <FeedbackStats feedbacks={feedbacks} currentUserId={user?.id} users={users} />
          </Card>

          <div className="space-y-4">
            {filteredFeedbacks.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  {searchText ? (
                    <div>
                      <p className="text-gray-500 mb-2">Nenhum feedback encontrado para "{searchText}"</p>
                      <Button variant="outline" size="sm" onClick={() => setSearchText('')}>
                        Limpar busca
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-500">Nenhum feedback encontrado</p>
                  )}
                </CardContent>
              </Card>
            ) : (
              filteredFeedbacks.map((feedback) => {
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
                          <Badge variant="rating" rating={feedback.rating}>
                            {feedback.rating}
                          </Badge>
                        </div>

                        <p className="text-gray-700 mb-3">{feedback.content}</p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button
                            onClick={() => handleLike(feedback.id, isLiked || false)}
                            className={`flex items-center space-x-1 transition-colors ${
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
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {/* TODO: Implementar edição */}}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(feedback.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
