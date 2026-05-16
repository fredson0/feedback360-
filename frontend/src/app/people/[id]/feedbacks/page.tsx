'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Sora } from 'next/font/google'
import { MessageSquare, Star, ThumbsUp, Plus } from 'lucide-react'
import CreateFeedbackModal from '@/components/features/CreateFeedbackModal'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function FeedbacksPage() {
  const params = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const recipientId = typeof params?.id === 'string' ? params.id : ''

  const feedbacks = [
    {
      author: 'Ana Lima',
      photo: '',
      message: 'Excelente colaboracao no sprint 4, trouxe clareza para o time.',
      rating: 5,
      likes: 12,
      time: '2h',
    },
    {
      author: 'Carlos Monteiro',
      photo: '',
      message: 'Feedback objetivo e com boas sugestoes de melhoria.',
      rating: 4,
      likes: 6,
      time: '1d',
    },
    {
      author: 'Helena Souza',
      photo: '',
      message: 'Otima comunicacao com stakeholders e time.',
      rating: 4.5,
      likes: 9,
      time: '3d',
    },
  ]

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

  return (
    <div className={sora.className}>
      <div className="grid gap-6">
        <section className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-xl shadow-indigo-100/40 backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-indigo-500">Feedbacks</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Visao consolidada</h2>
              <p className="mt-1 text-sm text-slate-500">Ultimos feedbacks recebidos e enviados.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600">
                <MessageSquare className="h-4 w-4" />
                18 feedbacks no mes
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-200/40"
              >
                <Plus className="h-4 w-4" />
                Enviar feedback
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.author}
              className="rounded-3xl border border-white/70 bg-white/70 p-5 shadow-lg shadow-indigo-100/30 backdrop-blur"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-indigo-500 text-sm font-semibold text-white flex items-center justify-center">
                    {feedback.photo ? (
                      <img src={feedback.photo} alt={feedback.author} className="h-full w-full object-cover" />
                    ) : (
                      getInitials(feedback.author)
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{feedback.author}</p>
                    <p className="text-xs text-slate-500">Feedback recente</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">{feedback.time}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{feedback.message}</p>
              <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-fuchsia-500" />
                  {feedback.rating}
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-3.5 w-3.5 text-indigo-500" />
                  {feedback.likes}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      <CreateFeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialRecipientId={recipientId}
      />
    </div>
  )
}
