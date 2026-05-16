'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button, Input, Textarea } from '@/components/ui'
import { useUsers, useFeedbacks } from '@/hooks'
import { X } from 'lucide-react'
import { CreateFeedbackDto } from '@/types'

interface CreateFeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  initialRecipientId?: string
}

export default function CreateFeedbackModal({
  isOpen,
  onClose,
  initialRecipientId,
}: CreateFeedbackModalProps) {
  const { users } = useUsers()
  const { createFeedback } = useFeedbacks()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CreateFeedbackDto>({
    message: '',
    rating: 5,
    recipientId: '',
  })
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (isOpen && initialRecipientId) {
      setFormData((prev) => ({ ...prev, recipientId: initialRecipientId }))
    }
  }, [isOpen, initialRecipientId])

  const selectedRecipient = useMemo(
    () => users.find((user) => user.id === formData.recipientId),
    [users, formData.recipientId]
  )

  useEffect(() => {
    if (selectedRecipient) {
      setSearchText(selectedRecipient.nome)
    }
  }, [selectedRecipient])

  const filteredUsers = useMemo(() => {
    const query = searchText.trim().toLowerCase()
    if (!query) return users
    return users.filter((user) =>
      user.nome.toLowerCase().includes(query)
    )
  }, [users, searchText])

  console.log('👥 Usuários carregados:', users)
  console.log('📝 FormData atual:', formData)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createFeedback(formData)
      setFormData({ message: '', rating: 5, recipientId: '' })
      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-10 text-center">
        <div className="fixed inset-0 transition-opacity bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

        <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/60 bg-white/80 text-left shadow-2xl shadow-indigo-200/40 backdrop-blur">
          <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Novo Feedback
                </h3>
                {selectedRecipient && (
                  <p className="text-xs text-white/80 mt-1">
                    Para {selectedRecipient.nome}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white/70 px-6 py-6">

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Para quem?
                </label>
                <div className="relative">
                  <Input
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value)
                      if (!e.target.value.trim()) {
                        setFormData((prev) => ({ ...prev, recipientId: '' }))
                      }
                    }}
                    placeholder="Digite o nome da pessoa"
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  />
                  {searchText.trim().length > 0 && (
                    <div className="absolute z-10 mt-2 w-full rounded-2xl border border-slate-200 bg-white/95 shadow-xl max-h-48 overflow-auto">
                      {filteredUsers.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-slate-500">Nenhum usuario encontrado</div>
                      ) : (
                        filteredUsers.map((user) => (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, recipientId: user.id }))
                              setSearchText(user.nome)
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-indigo-50"
                          >
                            <span className="font-medium">{user.nome}</span>
                            <span className="text-slate-400"> ({user.email})</span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
                {formData.recipientId === '' && (
                  <p className="mt-2 text-xs text-slate-500">Selecione uma pessoa para enviar o feedback.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Avaliação: {formData.rating} ⭐
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>

              <Textarea
                label="Mensagem"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Escreva seu feedback aqui..."
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  loading={loading}
                  className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 hover:from-indigo-500 hover:to-fuchsia-500"
                >
                  Enviar Feedback
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
