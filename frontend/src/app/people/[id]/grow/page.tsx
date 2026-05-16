'use client'

import { Sora } from 'next/font/google'
import { Target, TrendingUp, ArrowUpRight } from 'lucide-react'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function GrowPage() {
  const goals = [
    { title: 'Fortalecer feedback continuo', progress: 62 },
    { title: 'Melhorar tempo de resposta', progress: 48 },
    { title: 'Expandir networking interno', progress: 72 },
  ]

  return (
    <div className={sora.className}>
      <div className="grid gap-6">
        <section className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-xl shadow-indigo-100/40 backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-indigo-500">Grow</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Plano de desenvolvimento</h2>
              <p className="mt-1 text-sm text-slate-500">Acompanhe metas e proximos passos.</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600">
              <Target className="h-4 w-4" />
              Ciclo atual
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-lg shadow-indigo-100/30 backdrop-blur">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Metas em andamento</h3>
              <TrendingUp className="h-4 w-4 text-indigo-500" />
            </div>
            <div className="mt-4 space-y-4">
              {goals.map((goal) => (
                <div key={goal.title} className="rounded-2xl border border-slate-100 bg-white/80 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{goal.title}</p>
                    <span className="text-xs font-semibold text-slate-500">{goal.progress}%</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-lg shadow-indigo-100/30 backdrop-blur">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Proximos passos</h3>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-4 space-y-3">
              {[
                'Agendar 1:1 para revisar expectativas.',
                'Compartilhar aprendizados do ultimo sprint.',
                'Definir plano de melhoria continua.',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-indigo-100 bg-indigo-50/70 px-4 py-3 text-sm text-indigo-900">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
