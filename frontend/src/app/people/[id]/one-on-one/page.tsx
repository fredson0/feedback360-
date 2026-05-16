'use client'

import { Sora } from 'next/font/google'
import { Calendar, MessageSquare, CheckCircle2, ArrowUpRight } from 'lucide-react'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function OneOnOnePage() {
  const agenda = [
    'Revisar progresso das metas trimestrais',
    'Alinhamento sobre prioridades do sprint',
    'Feedback bilateral e proximos passos',
  ]

  const notes = [
    { title: 'Ponto forte', detail: 'Entrega consistente e boa comunicacao com o time.' },
    { title: 'Ponto de atencao', detail: 'Precisa reduzir tempo de resposta em threads abertas.' },
  ]

  return (
    <div className={sora.className}>
      <div className="grid gap-6">
        <section className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-xl shadow-indigo-100/40 backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-indigo-500">1:1s</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Ritual de acompanhamento</h2>
              <p className="mt-1 text-sm text-slate-500">Checklist rapido do proximo encontro.</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600">
              <Calendar className="h-4 w-4" />
              Proxima reuniao: 18 Mai
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-lg shadow-indigo-100/30 backdrop-blur">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Agenda sugerida</h3>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-4 space-y-3">
              {agenda.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white/80 px-4 py-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-500" />
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-lg shadow-indigo-100/30 backdrop-blur">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Notas da ultima 1:1</h3>
              <MessageSquare className="h-4 w-4 text-indigo-500" />
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
