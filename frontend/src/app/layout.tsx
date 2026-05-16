import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/components/theme-provider'
import { DottedSurface } from '@/components/ui/dotted-surface'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Feedback360 - Sistema de Feedbacks',
  description: 'Sistema moderno de gerenciamento de feedbacks com ranking e likes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-slate-100 text-slate-900`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <DottedSurface className="opacity-35" />
          <AuthProvider>
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
