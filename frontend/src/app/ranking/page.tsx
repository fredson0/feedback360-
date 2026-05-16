'use client'

import { useMemo, useState } from 'react'
import { Sora } from 'next/font/google'
import { DashboardLayout, Container } from '@/components/layout'
import { Card } from '@/components/ui'
import { useRanking } from '@/hooks'
import { Trophy, Star, ThumbsUp, TrendingUp, Sparkles } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function RankingPage() {
  const { ranking, loading } = useRanking()
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  const topRanking = useMemo(() => ranking.slice(0, 3), [ranking])
  const restRanking = useMemo(() => ranking.slice(3), [ranking])

  const periodLabel = period === '7d' ? 'Ultimos 7 dias' : period === '90d' ? 'Ultimos 90 dias' : 'Ultimos 30 dias'
  const getPeriodClass = (value: typeof period) =>
    value === period
      ? 'bg-indigo-600 text-white'
      : 'bg-white/70 text-slate-600 hover:bg-white'

  return (
    <DashboardLayout>
      <div className={sora.className}>
        <Container>
          <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-xl shadow-indigo-100/40 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-indigo-500">Ranking</p>
                <h1 className="mt-2 text-2xl font-semibold text-slate-900 flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                  Ranking de Feedbacks
                </h1>
                <p className="mt-1 text-sm text-slate-500">Reconhecimentos mais relevantes da plataforma.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {(['7d', '30d', '90d'] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPeriod(value)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${getPeriodClass(value)}`}
                  >
                    {value === '7d' ? '7d' : value === '90d' ? '90d' : '30d'}
                  </button>
                ))}
                <div className="flex items-center gap-2 rounded-2xl bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600">
                  <Sparkles className="h-4 w-4" />
                  {periodLabel}
                </div>
              </div>
            </div>

            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 rounded-3xl border border-slate-200/60 bg-white/60"></div>
                ))}
              </div>
            ) : ranking.length === 0 ? (
              <Card className="rounded-3xl border border-slate-200/60 bg-white/70 p-12 text-center shadow-sm">
                <p className="text-slate-500">Nenhum feedback no ranking ainda</p>
              </Card>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-3">
                  {topRanking.map((item, index) => (
                    <div
                      key={item.id}
                      className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-lg shadow-indigo-100/40 backdrop-blur"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500">Top {index + 1}</span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-400 text-white">
                          <Trophy className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-slate-900">{item.author?.nome ?? 'Sem autor'}</p>
                        <p className="text-xs text-slate-500">para {item.recipient?.nome ?? 'Sem destinatario'}</p>
                      </div>
                      <p className="mt-3 text-sm text-slate-600 line-clamp-3">{item.message}</p>
                      <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-fuchsia-500" />
                          {item.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3.5 w-3.5 text-indigo-500" />
                          {item.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                          {item.score}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-white/70 bg-white/70 shadow-lg shadow-indigo-100/30 backdrop-blur">
                  <div className="grid gap-4 p-6">
                    {restRanking.map((item, index) => (
                      <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/80 p-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-600">
                            {index + 4}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{item.author?.nome ?? 'Sem autor'}</p>
                            <p className="text-xs text-slate-500">para {item.recipient?.nome ?? 'Sem destinatario'}</p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 md:max-w-xl">{item.message}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 text-fuchsia-500" />
                            {item.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-3.5 w-3.5 text-indigo-500" />
                            {item.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                            {item.score}
                          </div>
                          <span className="text-slate-400">
                            {format(new Date(item.createdAt), "dd MMM yyyy", { locale: ptBR })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
    </DashboardLayout>
  )
}
