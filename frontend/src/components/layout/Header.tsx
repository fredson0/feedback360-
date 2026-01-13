'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, User, LayoutDashboard, MessageSquare, Trophy } from 'lucide-react'
import { Button } from '@/components/ui'

export function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Feedbacks', href: '/feedbacks', icon: MessageSquare },
    { name: 'Ranking', href: '/ranking', icon: Trophy },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-2xl font-bold text-primary-600">
                Feedback360
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      inline-flex items-center px-3 py-2 text-sm font-medium rounded-md
                      ${
                        isActive(item.href)
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <User className="w-5 h-5" />
              <span className="hidden sm:block">{user?.name}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="sm:hidden pb-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-3 py-2 text-base font-medium rounded-md
                  ${
                    isActive(item.href)
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
