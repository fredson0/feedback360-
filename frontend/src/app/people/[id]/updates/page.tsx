'use client'

import { Sora } from 'next/font/google'
import { Sparkles, ArrowUpRight, Calendar, CheckCircle2 } from 'lucide-react'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function UpdatesPage() {
  const updates = [
    {
      title: 'Sprint 4 entregue',
      detail: 'Concluiu os endpoints de feedback e monitoramento.',
      time: 'Hoje',
    },
    {
      title: 'Alinhamento de metas',
      detail: 'Atualizou OKRs com foco em satisfacao do time.',
      time: '2d',
    },
    {
      title: 'Feedback loop',
      detail: 'Revisou respostas pendentes e abriu novas conversas.',
      time: '5d',
    },
  ]

  const highlights = [
    { label: 'Atualizacoes semanais', value: '4', icon: Sparkles },
    { label: 'Pendentes', value: '2', icon: Calendar },
    { label: 'Concluidas', value: '12', icon: CheckCircle2 },
  ]

  return (
    <div className={sora.className}>
      <div className="grid gap-6">
        <section className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-xl shadow-indigo-100/40 backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-indigo-500">Updates</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Status das ultimas semanas</h2>
              <p className="mt-1 text-sm text-slate-500">Timeline de progresso e entregas recentes.</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600">
              <Sparkles className="h-4 w-4" />
              Atualizado hoje
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="rounded-3xl border border-slate-100 bg-white/80 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{item.label}</p>
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white">
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
              <h3 className="text-lg font-semibold text-slate-900">Linha do tempo</h3>
              <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Ver detalhes</button>
            </div>
            <div className="mt-4 space-y-3">
              {updates.map((item) => (
                <div key={item.title} className="flex items-start justify-between rounded-2xl border border-slate-100 bg-white/80 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.detail}</p>
                  </div>
                  <span className="text-xs text-slate-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-lg shadow-indigo-100/30 backdrop-blur">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Resumo rapido</h3>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-4 space-y-3">
              {[
                { title: 'Meta principal', detail: 'Elevar a taxa de resposta para 85%.' },
                { title: 'Foco atual', detail: 'Melhoria continua no ciclo de feedbacks.' },
              ].map((item) => (
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
