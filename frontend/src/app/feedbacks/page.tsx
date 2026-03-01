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
  const { feedbacks, loading, toggleLike, deleteFeedback, updateFeedback } = useFeedbacks()
  const { user } = useAuth()
  
  // 💾 ESTADO LOCAL = MEMÓRIA DA PÁGINA (só ela controla)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchText, setSearchText] = useState('')  // 🔥 Estado de busca
  const [editingId, setEditingId] = useState<string | null>(null)  // 🔥 NOVO: Estado de edição
  const [editingRating, setEditingRating] = useState(5)
  const [editingMessage, setEditingMessage] = useState('')
  // 🧮 COMPUTED VALUE = CÁLCULO AUTOMÁTICO (useMemo)
  const filteredFeedbacks = useMemo(() => {
    // Se não tem nada digitado, mostra tudo
    if (!searchText.trim()) {
      return feedbacks
    }

    // 🔍 FILTRO: Busca no conteúdo (case-insensitive)
    return feedbacks.filter(feedback => 
      (feedback.content || '').toLowerCase().includes(searchText.toLowerCase())
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

  const handleEdit = (feedbackId: string, currentMessage: string, currentRating: number) => {
    setEditingId(feedbackId)
    setEditingMessage(currentMessage)
    setEditingRating(currentRating)
  }
  
  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingMessage('')
    setEditingRating(5)
  }

  const handleSaveEdit = async (feedbackId: string) => {
    try {
      await updateFeedback(feedbackId, { content: editingMessage, rating: editingRating })
      handleCancelEdit()
    } catch (error) {
      console.error('Erro ao atualizar feedback:', error)
    }
  }
  // 🔧 ESTADOS DE CARREGAMENTO = FEEDBACK VISUAL PARA O USUÁRIO
  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-white -mt-6 -mb-6 py-8">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="animate-pulse space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-gray-100 rounded-lg border border-gray-200"></div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white -mt-6 -mb-6 py-8">
        <Container>
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Feedbacks
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Compartilhe reconhecimentos e ajude seu time a crescer
                </p>
              </div>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                <Plus className="w-4 h-4 inline-block mr-1.5" />
                Novo Feedback
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Buscar feedbacks por conteúdo..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 bg-white border border-gray-200 rounded-md text-sm py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total</div>
                <div className="text-2xl font-semibold text-gray-900">{filteredFeedbacks.length}</div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Likes</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {filteredFeedbacks.reduce((sum, f) => sum + f.likes, 0)}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Média</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {filteredFeedbacks.length > 0 
                    ? (filteredFeedbacks.reduce((sum, f) => sum + f.rating, 0) / filteredFeedbacks.length).toFixed(1)
                    : '0'
                  }
                </div>
              </div>
            </div>

            {/* Feedbacks */}
            <div className="space-y-3">
              {filteredFeedbacks.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                  <MessageSquare className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                  <h3 className="text-base font-medium text-gray-900 mb-1">
                    {searchText ? 'Nenhum feedback encontrado' : 'Nenhum feedback ainda'}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {searchText ? 'Tente buscar por outros termos.' : 'Seja o primeiro a compartilhar um reconhecimento!'}
                  </p>
                  {searchText ? (
                    <Button 
                      onClick={() => setSearchText('')}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Limpar busca
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setIsModalOpen(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm inline-flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Criar Primeiro Feedback
                    </Button>
                  )}
                </div>
              ) : (
                filteredFeedbacks.map((feedback) => {
                  const isAuthor = feedback.authorId === user?.id
                  const isLiked = feedback.isLikedByCurrentUser
                  const authorInitials = feedback.author?.nome?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '??'
                  const recipientInitials = feedback.recipient?.nome?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '??'
                  const isEditing = editingId === feedback.id

                  return (
                    <div 
                      key={feedback.id}
                      className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          {/* Author Avatar */}
                          <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-xs flex-shrink-0">
                            {authorInitials}
                          </div>
                          
                          <div className="flex-1">
                            {/* Names Row */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-gray-900 text-sm">
                                {feedback.author?.nome || 'Anônimo'}
                              </span>
                              <span className="text-gray-400 text-xs font-medium">TO</span>
                              
                              {/* Recipient Avatar + Name */}
                              <div className="flex items-center gap-1.5">
                                <div className="w-5 h-5 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-medium text-[10px]">
                                  {recipientInitials}
                                </div>
                                <span className="font-semibold text-gray-900 text-sm">
                                  {feedback.recipient?.nome || 'Geral'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Private Badge */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
                          <span className="font-medium">Private</span>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="ml-12 mb-4">
                        {isEditing ? (
                          // 🔥 MODO EDIÇÃO
                          <div className="space-y-3">
                            <textarea
                              value={editingMessage}
                              onChange={(e) => setEditingMessage(e.target.value)}
                              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              rows={3}
                            />
                            <input
                              type="range"
                              min="1"
                              max="5"
                              value={editingRating}
                              onChange={(e) => setEditingRating(Number(e.target.value))}
                              className="w-full"
                            />
                            <p className="text-xs text-gray-500">Rating: {editingRating} ⭐</p>
                          </div>
                        ) : (
                          // 👁️ MODO VISUALIZAÇÃO
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {feedback.content || 'Sem mensagem'}
                          </p>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="ml-12 flex items-center gap-3 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => handleLike(feedback.id, isLiked || false)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                            isLiked
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                          <span>{feedback.likes}</span>
                        </button>

                        <div className="text-xs text-gray-400">
                          {feedback.createdAt && format(new Date(feedback.createdAt), "dd MMM yyyy", { locale: ptBR })}
                        </div>

                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span>⭐</span>
                          <span>{feedback.rating}</span>
                        </div>

                        {isAuthor && (
                          <>
                            {isEditing ? (
                              // 🔥 MODO EDIÇÃO - Salvar e Cancelar
                              <>
                                <button
                                  onClick={() => handleSaveEdit(feedback.id)}
                                  className="text-xs text-green-600 hover:text-green-700 font-medium px-3 py-1.5 rounded-md hover:bg-green-50"
                                >
                                  Salvar
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="text-xs text-gray-600 hover:text-gray-700 font-medium px-3 py-1.5 rounded-md hover:bg-gray-50"
                                >
                                  Cancelar
                                </button>
                              </>
                            ) : (
                              // 👁️ MODO VISUALIZAÇÃO - Editar e Deletar
                              <>
                                <button
                                  onClick={() => handleEdit(feedback.id, feedback.content || '', feedback.rating)}
                                  className="text-xs text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 rounded-md hover:bg-blue-50"
                                >
                                  Editar
                                </button>
                                <button 
                                  onClick={() => handleDelete(feedback.id)} 
                                  className="text-xs text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-md hover:bg-red-50"
                                >
                                  Excluir
                                </button>
                              </>
                            )}
                          </>
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
