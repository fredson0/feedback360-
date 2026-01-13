'use client'

import { ReactNode } from 'react'
import { Header } from './Header'
import { useAuth } from '@/contexts/AuthContext'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-6">
        {children}
      </main>
    </div>
  )
}
