'use client'

import { Sora } from 'next/font/google'
import { useAuth } from '@/contexts/AuthContext'
import { BarChart3, Star, Clock, Sparkles, ArrowUpRight } from 'lucide-react'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function OverviewPage() {
  const { user } = useAuth()

  const highlights = [
    { label: 'Feedbacks no mes', value: '18', icon: BarChart3, tone: 'from-indigo-500 to-violet-500' },
    { label: 'Tempo medio', value: '2d', icon: Clock, tone: 'from-fuchsia-500 to-pink-500' },
    { label: 'Media rating', value: '4.6', icon: Star, tone: 'from-emerald-500 to-teal-500' },
  ]

  const notes = [
    { title: 'Entrega consistente', detail: 'Recebeu elogios por consistencia no projeto de feedbacks.' },
    { title: 'Colaboracao em alta', detail: 'Participou de 6 revisoes de codigo no ultimo ciclo.' },
  ]

  return (
    <div className={sora.className}>
      <div className="grid gap-6">
        <section className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-xl shadow-indigo-100/40 backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-indigo-500">Overview</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Visao geral de {user?.nome || 'Colaborador'}</h2>
              <p className="mt-1 text-sm text-slate-500">Insights rapidos sobre performance e feedbacks.</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600">
              <Sparkles className="h-4 w-4" />
              Ultimos 30 dias
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="rounded-3xl border border-slate-100 bg-white/80 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{item.label}</p>
                    <div className={`flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-r ${item.tone} text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-lg shadow-indigo-100/30 backdrop-blur">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Atividades recentes</h3>
              <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Ver tudo</button>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { title: 'Feedback recebido de Ana', note: 'Excelente colaboracao no sprint 4', time: '2h' },
                { title: 'Resposta enviada', note: 'Obrigado pela sugestao de melhoria', time: '1d' },
                { title: 'Revisao de metas', note: 'Atualizou OKRs pessoais', time: '3d' },
              ].map((item) => (
                <div key={item.title} className="flex items-start justify-between rounded-2xl border border-slate-100 bg-white/80 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.note}</p>
                  </div>
                  <span className="text-xs text-slate-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-lg shadow-indigo-100/30 backdrop-blur">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Destaques</h3>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-4 space-y-3">
              {notes.map((item) => (
                <div key={item.title} className="rounded-2xl border border-indigo-100 bg-indigo-50/70 px-4 py-3">
                  <p className="text-sm font-semibold text-indigo-900">{item.title}</p>
                  <p className="text-xs text-indigo-700/80">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
