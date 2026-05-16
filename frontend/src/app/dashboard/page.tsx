'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sora } from 'next/font/google'
import {
  MessageSquare,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  ArrowUpRight,
  Users,
  Sparkles,
  BarChart3,
} from 'lucide-react'
import { DashboardLayout, Container } from '@/components/layout'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    } else {
      setIsLoading(false)
      fetchFeedbacks()
    }
  }, [router])

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch('http://localhost:3005/feedback', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error('Erro ao buscar feedbacks')
      }
      
      const data = await response.json()
      console.log('Feedbacks recebidos:', data)
      setFeedbacks(data)
      
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  const totalFeedbacks = feedbacks.length || 128
  const pendingFeedbacks = 18
  const answeredFeedbacks = Math.max(totalFeedbacks - pendingFeedbacks, 0)
  const averageRating = 4.6

  return (
    <DashboardLayout>
      <div className={sora.className}>
        <Container maxWidth="full" className="relative">
          <div className="pointer-events-none absolute -top-28 left-1/2 h-80 w-[520px] -translate-x-1/2 rounded-full bg-indigo-200/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-fuchsia-200/60 blur-3xl" />

          <div className="relative">
            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-indigo-500">Painel</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900 lg:text-4xl">Dashboard de feedbacks</h1>
                <p className="mt-2 text-slate-500">Resumo visual do time, status e percepcao geral.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <input
                    type="search"
                    placeholder="Buscar pessoas ou feedbacks"
                    className="w-56 bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
                  />
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">CTRL K</span>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Periodo</p>
                  <p className="text-sm font-semibold text-slate-900">Ultimos 30 dias</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <div className="rounded-[32px] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 p-6 text-white shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80">Overview</p>
                    <h2 className="mt-2 text-2xl font-semibold">Saude do feedback do time</h2>
                  </div>
                  <div className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">Mensal</div>
                </div>

                <div className="mt-6 rounded-3xl bg-white/10 p-4">
                  <svg viewBox="0 0 460 140" className="h-40 w-full">
                    <path
                      d="M10 100 C60 60 110 80 160 70 C210 60 260 30 310 40 C360 50 400 20 450 30"
                      fill="none"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 100 C60 60 110 80 160 70 C210 60 260 30 310 40 C360 50 400 20 450 30"
                      fill="url(#fade)"
                      opacity="0.4"
                    />
                    <defs>
                      <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="white" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <circle cx="310" cy="40" r="8" fill="white" />
                    <circle cx="310" cy="40" r="16" fill="rgba(255,255,255,0.2)" />
                  </svg>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/80">
                    <span className="rounded-full bg-white/15 px-3 py-1">Crescimento 14%</span>
                    <span className="rounded-full bg-white/15 px-3 py-1">Taxa de resposta 78%</span>
                    <span className="rounded-full bg-white/15 px-3 py-1">Risco baixo</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-2xl bg-white/15 p-4">
                    <p className="text-xs text-white/70">Total feedbacks</p>
                    <p className="mt-2 text-2xl font-semibold">{totalFeedbacks}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                      <MessageSquare className="h-4 w-4" />
                      Ultimo mes
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/15 p-4">
                    <p className="text-xs text-white/70">Pendentes</p>
                    <p className="mt-2 text-2xl font-semibold">{pendingFeedbacks}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                      <Clock className="h-4 w-4" />
                      Aguardando resposta
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/15 p-4">
                    <p className="text-xs text-white/70">Respondidos</p>
                    <p className="mt-2 text-2xl font-semibold">{answeredFeedbacks}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                      <CheckCircle className="h-4 w-4" />
                      Concluidos
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/15 p-4">
                    <p className="text-xs text-white/70">Media rating</p>
                    <p className="mt-2 text-2xl font-semibold">{averageRating}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                      <Star className="h-4 w-4" />
                      Baseado em 30 dias
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="rounded-3xl bg-white p-5 shadow-lg shadow-indigo-100/40">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">Feedbacks pendentes</p>
                    <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">Prioridade</div>
                  </div>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{pendingFeedbacks}</p>
                  <div className="mt-4 h-2 rounded-full bg-slate-100">
                    <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>Meta semanal</span>
                    <span className="font-semibold text-slate-700">62%</span>
                  </div>
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-500 p-5 text-white shadow-2xl">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/80">Media de rating</p>
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-3xl font-semibold">{averageRating}</p>
                  <p className="mt-2 text-sm text-white/80">Crescimento de 12% no trimestre</p>
                  <div className="mt-6 flex items-center gap-2 text-xs">
                    <Star className="h-4 w-4" />
                    89% das avaliacoes acima de 4
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-lg shadow-indigo-100/40">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">Destaques do time</p>
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      { name: 'Equipe Produto', note: 'Resposta em 24h' },
                      { name: 'Equipe Suporte', note: 'Melhor nota media' },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-500">{item.note}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-5 shadow-lg shadow-indigo-100/40">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">Pulse semanal</p>
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
                <p className="mt-3 text-2xl font-semibold text-slate-900">+9.2%</p>
                <p className="mt-1 text-sm text-slate-500">Engajamento nas respostas.</p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-lg shadow-indigo-100/40">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">Colaboradores ativos</p>
                  <Users className="h-5 w-5 text-indigo-500" />
                </div>
                <p className="mt-3 text-2xl font-semibold text-slate-900">42</p>
                <p className="mt-1 text-sm text-slate-500">Participacao acima da meta.</p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-lg shadow-indigo-100/40">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">Acoes rapidas</p>
                  <BarChart3 className="h-5 w-5 text-fuchsia-500" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Enviar feedback', 'Criar pesquisa', 'Ver ranking'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-200"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </DashboardLayout>
  )
}