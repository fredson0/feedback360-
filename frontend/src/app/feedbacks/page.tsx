'use client'

import { useState, useMemo } from 'react'
import { DashboardLayout, Container } from '@/components/layout'
import { Button, Input } from '@/components/ui'
import { useFeedbacks } from '@/hooks'
import { useAuth } from '@/contexts/AuthContext'
import { ThumbsUp, MessageSquare, Sparkles, Plus, Search } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import CreateFeedbackModal from '@/components/features/CreateFeedbackModal'

export default function FeedbacksPage() {
  // 🏠 PÁGINA = DIRETOR DE ORQUESTRA
  
  // ⚡ HOOKS = INSTALAÇÃO ELÉTRICA (traz dados de fora) 
  const { feedbacks, loading, toggleLike, deleteFeedback } = useFeedbacks()
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
      (feedback.content || feedback.message || '').toLowerCase().includes(searchText.toLowerCase())
    )
  }, [feedbacks, searchText]) // 🔄 Recalcula quando mudar feedbacks OU searchText

  // 🎪 FUNÇÕES DE AÇÃO = EVENTOS QUE A PÁGINA COORDENA
  const handleLike = async (feedbackId: string, isLiked: boolean) => {
    await toggleLike(feedbackId, isLiked)
  }

  const handleDelete = async (feedbackId: string) => {
    if (confirm('Tem certeza que deseja excluir este feedback?')) {
      await deleteFeedback(feedbackId)
    }
  }

  // 🔧 ESTADOS DE CARREGAMENTO = FEEDBACK VISUAL PARA O USUÁRIO
  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-orange-200 -mt-6 -mb-6 py-6">
          <Container>
            <div className="animate-pulse space-y-6 py-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-orange-300/40 rounded-3xl"></div>
              ))}
            </div>
          </Container>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-orange-200 -mt-6 -mb-6 py-6">
        <Container>
          <div className="py-12 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  Feedbacks
                </h1>
                <p className="text-lg text-gray-600">
                  Compartilhe reconhecimentos e ajude seu time a crescer ✨
                </p>
              </div>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg font-semibold"
              >
                <Plus className="w-5 h-5" />
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
                  className="pl-10 bg-orange-50/60 backdrop-blur-sm border-orange-200/30 rounded-2xl"  // Espaço para o ícone + tema
                />
              </div>
              
              {/* 📊 CONTADOR DE RESULTADOS */}
              {searchText && (
                <p className="text-sm text-gray-500">
                  {filteredFeedbacks.length} feedback(s) encontrado(s)
                </p>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-orange-100/50 backdrop-blur-sm rounded-3xl p-6 border border-orange-200/30">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center">
                    <MessageSquare className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total</p>
                    <p className="text-3xl font-bold text-gray-900">{filteredFeedbacks.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-100/50 backdrop-blur-sm rounded-3xl p-6 border border-purple-200/30">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center">
                    <ThumbsUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Likes</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {filteredFeedbacks.reduce((sum, f) => sum + f.likes, 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-pink-100/50 backdrop-blur-sm rounded-3xl p-6 border border-pink-200/30">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Média</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {filteredFeedbacks.length > 0 
                        ? (filteredFeedbacks.reduce((sum, f) => sum + f.rating, 0) / filteredFeedbacks.length).toFixed(1)
                        : '0'
                      } ⭐
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedbacks List */}
            <div className="space-y-6">
              {filteredFeedbacks.length === 0 ? (
                <div className="bg-orange-100/50 backdrop-blur-sm rounded-3xl p-16 text-center border border-orange-200/30">
                  <MessageSquare className="w-20 h-20 mx-auto text-orange-300 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {searchText ? `Nenhum feedback encontrado para "${searchText}"` : 'Nenhum feedback ainda'}
                  </h3>
                  <p className="text-gray-600 mb-8">
                    {searchText ? 'Tente buscar por outros termos.' : 'Seja o primeiro a compartilhar um reconhecimento!'}
                  </p>
                  {searchText ? (
                    <Button 
                      onClick={() => setSearchText('')}
                      className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-2xl shadow-lg"
                    >
                      Limpar busca
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setIsModalOpen(true)}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl shadow-lg"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Criar Primeiro Feedback
                    </Button>
                  )}
                </div>
              ) : (
                filteredFeedbacks.map((feedback) => {
                  const isAuthor = feedback.authorId === user?.id
                  const isLiked = feedback.isLikedByCurrentUser

                  return (
                    <div 
                      key={feedback.id}
                      className="bg-orange-50/60 backdrop-blur-sm rounded-3xl p-8 hover:bg-orange-100/40 transition-all duration-300 border border-orange-200/30"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {feedback.author?.nome?.[0] || '?'}
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-bold text-gray-900">
                                {feedback.author?.nome || 'Anônimo'}
                              </span>
                              <span className="text-gray-400">→</span>
                              <span className="text-lg font-bold text-gray-900">
                                {feedback.recipient?.nome || 'Geral'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {feedback.createdAt && format(new Date(feedback.createdAt), "dd 'de' MMMM 'às' HH:mm", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Rating Badge */}
                        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full font-bold shadow-md">
                          <span className="text-lg">⭐</span>
                          <span>{feedback.rating}</span>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="mb-6">
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {feedback.message || feedback.content || 'Sem mensagem'}
                        </p>
                      </div>
>>>>>>> 9dadbc970f007d0ab3e05c723934ff35d8ed0604

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <button
                          onClick={() => handleLike(feedback.id, isLiked || false)}
                          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            isLiked
                              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                          <span className="text-lg">{feedback.likes}</span>
                        </button>

                        {isAuthor && (
                          <button
                            onClick={() => handleDelete(feedback.id)}
                            className="text-red-500 hover:text-red-700 font-medium px-5 py-3 rounded-xl hover:bg-red-50 transition-colors"
                          >
                            Excluir
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </Container>
        
        <CreateFeedbackModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  )
}
