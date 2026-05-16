'use client'

import { useEffect, useMemo, useState } from 'react'
import { Sora } from 'next/font/google'
import { DashboardLayout, Container } from '@/components/layout'
import { Button, Input } from '@/components/ui'
import { useFeedbacks } from '@/hooks'
import { useAuth } from '@/contexts/AuthContext'
import { ThumbsUp, MessageSquare, Sparkles, Plus, Search, Star } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import CreateFeedbackModal from '@/components/features/CreateFeedbackModal'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function FeedbacksPage() {
  // 🏠 PÁGINA = DIRETOR DE ORQUESTRA
  
  // ⚡ HOOKS = INSTALAÇÃO ELÉTRICA (traz dados de fora) 
  const { feedbacks, loading, toggleLike, deleteFeedback, updateFeedback } = useFeedbacks()
  const { user } = useAuth()

  const [profileImage, setProfileImage] = useState<string | null>(null)
  
  // 💾 ESTADO LOCAL = MEMÓRIA DA PÁGINA (só ela controla)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchText, setSearchText] = useState('')  // 🔥 Estado de busca
  const [editingId, setEditingId] = useState<string | null>(null)  // 🔥 Estado de edição
  const [editingContent, setEditingContent] = useState('')
  const [editingRating, setEditingRating] = useState(5)
  
  // 🧮 COMPUTED VALUE = CÁLCULO AUTOMÁTICO (useMemo)
  const filteredFeedbacks = useMemo(() => {
    // Se não tem nada digitado, mostra tudo
    if (!searchText.trim()) {
      return feedbacks
    }

    // 🔍 FILTRO: Busca no conteúdo (case-insensitive)
    return feedbacks.filter(feedback => 
      ((feedback.message || '').toLowerCase().includes(searchText.toLowerCase()))
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

  const handleEdit = (feedback: any) => {
    setEditingId(feedback.id)
    setEditingContent(feedback.message || '')
    setEditingRating(feedback.rating)
  }

  const handleSavedEdit = async () => {
    if (!editingId) return

    await updateFeedback(editingId, {message: editingContent, rating: editingRating})
    
    setEditingId(null)
    setEditingContent('')
    setEditingRating(5)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingContent('')
    setEditingRating(5)
  }

  useEffect(() => {
    const storageKey = `profileImage:${user?.id ?? 'me'}`
    const storedImage = localStorage.getItem(storageKey)
    setProfileImage(storedImage)
  }, [user?.id])

  // 🔧 ESTADOS DE CARREGAMENTO = FEEDBACK VISUAL PARA O USUÁRIO
  if (loading) {
    return (
      <DashboardLayout>
        <div className={`min-h-screen -mt-6 -mb-6 py-8 ${sora.className}`}>
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="animate-pulse space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 rounded-3xl border border-slate-200/60 bg-white/60"></div>
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
      <div className={`min-h-screen -mt-6 -mb-6 py-8 ${sora.className}`}>
        <Container>
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col gap-4 rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-xl shadow-indigo-100/40 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-indigo-500">Feedbacks</p>
                <h1 className="mt-2 text-2xl font-semibold text-slate-900">Hub de reconhecimentos</h1>
                <p className="mt-1 text-sm text-slate-500">Compartilhe reconhecimentos e acompanhe o impacto.</p>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200/50 hover:from-indigo-500 hover:to-fuchsia-500"
              >
                <Plus className="w-4 h-4 inline-block mr-1.5" />
                Novo Feedback
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Buscar feedbacks por conteudo..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10 bg-white/70 border border-slate-200/70 rounded-2xl text-sm py-2 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                />
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200/60 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-500">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                30 dias
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 p-4 shadow-sm">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Total</div>
                <div className="text-2xl font-semibold text-slate-900">{filteredFeedbacks.length}</div>
              </div>

              <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-4 shadow-sm">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Likes</div>
                <div className="text-2xl font-semibold text-slate-900">
                  {filteredFeedbacks.reduce((sum, f) => sum + f.likes, 0)}
                </div>
              </div>

              <div className="rounded-3xl border border-fuchsia-100 bg-gradient-to-br from-fuchsia-50 via-white to-indigo-50 p-4 shadow-sm">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Media</div>
                <div className="text-2xl font-semibold text-slate-900">
                  {filteredFeedbacks.length > 0 
                    ? (filteredFeedbacks.reduce((sum, f) => sum + f.rating, 0) / filteredFeedbacks.length).toFixed(1)
                    : '0'
                  }
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredFeedbacks.length === 0 ? (
                <div className="rounded-3xl border border-slate-200/60 bg-white/70 p-12 text-center shadow-sm">
                  <MessageSquare className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    {searchText ? 'Nenhum feedback encontrado' : 'Nenhum feedback ainda'}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    {searchText ? 'Tente buscar por outros termos.' : 'Seja o primeiro a compartilhar um reconhecimento!'}
                  </p>
                  {searchText ? (
                    <Button 
                      onClick={() => setSearchText('')}
                      className="rounded-full bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 text-sm"
                    >
                      Limpar busca
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setIsModalOpen(true)}
                      className="rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white px-4 py-2 text-sm inline-flex items-center gap-1.5"
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
                      className="rounded-3xl border border-white/70 bg-white/70 p-5 shadow-lg shadow-indigo-100/40 backdrop-blur"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-2xl flex items-center justify-center overflow-hidden text-white font-medium text-xs flex-shrink-0">
                            {isAuthor && profileImage ? (
                              <img src={profileImage} alt="Foto do perfil" className="h-full w-full object-cover" />
                            ) : (
                              authorInitials
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-slate-900 text-sm">
                                {feedback.author?.nome || 'Anonimo'}
                              </span>
                              <span className="text-slate-400 text-xs font-medium">PARA</span>
                              
                              <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white font-medium text-[10px]">
                                  {recipientInitials}
                                </div>
                                <span className="font-semibold text-slate-900 text-sm">
                                  {feedback.recipient?.nome || 'Geral'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                          <span className="font-medium">Privado</span>
                        </div>
                      </div>

                      <div className="ml-12 mb-4">
                        {isEditing ? (
                          <div className="space-y-3">
                            <textarea
                              value={editingContent}
                              onChange={(e) => setEditingContent(e.target.value)}
                              className="w-full border border-slate-200 rounded-2xl p-3 text-sm text-slate-900 bg-white/80 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                              rows={3}
                            />
                            <input
                              type="range"
                              min="1"
                              max="5"
                              value={editingRating}
                              onChange={(e) => setEditingRating(Number(e.target.value))}
                              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                            <p className="text-xs text-slate-500">Rating: {editingRating} ⭐</p>
                          </div>
                        ) : (
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {feedback.message || 'Sem mensagem'}
                          </p>
                        )}
                      </div>

                      <div className="ml-12 flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200/60">
                        <button
                          onClick={() => handleLike(feedback.id, isLiked || false)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                            isLiked
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                          <span>{feedback.likes}</span>
                        </button>

                        <div className="text-xs text-slate-400">
                          {feedback.createdAt && format(new Date(feedback.createdAt), "dd MMM yyyy", { locale: ptBR })}
                        </div>

                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Star className="h-3.5 w-3.5 text-fuchsia-500" />
                          <span>{feedback.rating}</span>
                        </div>

                        {isAuthor && (
                          <>
                            {isEditing ? (
                              <>
                                <button
                                  onClick={handleSavedEdit}
                                  className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold px-3 py-1.5 rounded-full hover:bg-emerald-50"
                                >
                                  Salvar
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="text-xs text-slate-600 hover:text-slate-700 font-semibold px-3 py-1.5 rounded-full hover:bg-slate-100"
                                >
                                  Cancelar
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(feedback)}
                                  className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold px-3 py-1.5 rounded-full hover:bg-indigo-50"
                                >
                                  Editar
                                </button>
                                <button 
                                  onClick={() => handleDelete(feedback.id)} 
                                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-3 py-1.5 rounded-full hover:bg-rose-50"
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
