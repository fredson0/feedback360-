'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, User, LayoutDashboard, MessageSquare, Trophy, Sparkles } from 'lucide-react'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  // Agora a navegação é dinâmica e usa o ID do usuário!
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Feedbacks', href: user?.id ? `/people/${user.id}/feedbacks` : '/feedbacks', icon: MessageSquare },
    { name: 'Ranking', href: '/ranking', icon: Trophy },
    { name: 'Perfil', href: '/profile', icon: User },
  ]

  const isActive = (path: string) => pathname === path || pathname.startsWith(path)

  return (
    <>
      <div className="lg:hidden sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-slate-900">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            Feedback360
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
              <User className="h-4 w-4" />
            </div>
            <span className="max-w-[120px] truncate">{user?.nome}</span>
            <button
              type="button"
              onClick={() => {
                logout()
                router.push('/login')
              }}
              className="ml-2 inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </button>
          </div>
        </div>
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>

      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-72">
        <div className="flex h-full w-full flex-col bg-gradient-to-b from-indigo-600 via-violet-600 to-fuchsia-500 px-6 py-8 text-white shadow-xl">
          <Link href="/dashboard" className="flex items-center gap-3 text-xl font-semibold">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
              <Sparkles className="h-5 w-5" />
            </span>
            Feedback360
          </Link>

          <div className="mt-10 flex flex-col gap-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="mt-auto">
            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">Hoje</p>
              <p className="mt-2 text-lg font-semibold">Visao geral do time</p>
              <p className="mt-1 text-sm text-white/80">Acompanhe pendentes e ratings.</p>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <User className="h-4 w-4" />
                </div>
                <span className="max-w-[120px] truncate">{user?.nome}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout()
                  router.push('/login')
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/30"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
