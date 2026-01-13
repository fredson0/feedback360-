'use client'

import { useState } from 'react'
import { Button, Input, Textarea } from '@/components/ui'
import { useUsers, useFeedbacks } from '@/hooks'
import { X } from 'lucide-react'
import { CreateFeedbackDto } from '@/types'

interface CreateFeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateFeedbackModal({ isOpen, onClose }: CreateFeedbackModalProps) {
  const { users } = useUsers()
  const { createFeedback } = useFeedbacks()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CreateFeedbackDto>({
    content: '',
    rating: 5,
    recipientId: 0,
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createFeedback(formData)
      setFormData({ content: '', rating: 5, recipientId: 0 })
      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Novo Feedback
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Para quem?
                </label>
                <select
                  required
                  value={formData.recipientId}
                  onChange={(e) => setFormData({ ...formData, recipientId: Number(e.target.value) })}
                  className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value={0}>Selecione um usuário</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Avaliação: {formData.rating} ⭐
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
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
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Escreva seu feedback aqui..."
              />

              <div className="flex space-x-3 pt-4">
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
