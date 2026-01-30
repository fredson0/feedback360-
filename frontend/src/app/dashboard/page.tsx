'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MessageSquare, Clock, CheckCircle, Star } from 'lucide-react'
import { StatsCard } from './components/StatsCard'
import { DashboardLayout, Container } from '@/components/layout'

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
      
      const response = await fetch('http://localhost:3000/feedback', {
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

  return (
    <DashboardLayout>
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo ao seu painel de feedbacks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total de Feedbacks"
            value={24}
            icon={MessageSquare}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          
          <StatsCard
            title="Pendentes"
            value={8}
            icon={Clock}
            color="text-orange-600"
            bgColor="bg-orange-100"
          />
          
          <StatsCard
            title="Respondidos"
            value={16}
            icon={CheckCircle}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          
          <StatsCard
            title="Média de Rating"
            value={4.5}
            icon={Star}
            color="text-yellow-600"
            bgColor="bg-yellow-100"
          />
        </div>

        <div className="text-gray-500 text-center py-12">
          ActivityChart, RecentFeedbackList e QuickActions virão aqui
        </div>
      </Container>
    </DashboardLayout>
  )
}