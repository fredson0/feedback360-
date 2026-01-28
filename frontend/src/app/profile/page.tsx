'use client'

import { useState } from 'react'
import { DashboardLayout, Container } from "@/components/layout"
import { Card, CardContent, Badge } from "@/components/ui"
import { useAuth } from '@/contexts/AuthContext'
import { Calendar, User, TrendingUp, CheckCircle } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('about')
  const ratingHistory = [3.2, 3.1, 3.4, 3.5, 3.3, 3.4, 3.6] // Exemplo de dados históricos de rating

  return (
    <DashboardLayout>
      {/* Fundo verde claro da página toda */}
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8">
        <Container>
          <div className="max-w-5xl mx-auto">
            
            {/* Card Principal com borda colorida */}
            <Card className="overflow-hidden shadow-xl border-t-4 border-emerald-400">
              
              {/* Header com foto À ESQUERDA e info AO LADO */}
              <div className="bg-gradient-to-r from-teal-100 via-emerald-100 to-cyan-100 p-8">
                <div className="flex items-center space-x-6">
                  {/* Avatar à esquerda - card branco com sombra */}
                  <div className="flex-shrink-0">
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                        {user?.nome?.substring(0, 2).toUpperCase() || 'JA'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Nome e cargo ao lado */}
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {user?.nome || 'jaozinho'}
                    </h1>
                    <p className="text-teal-700 text-base mt-1 font-medium">Desenvolvedor Backend</p>
                    <p className="text-teal-600 text-sm mt-1">{user?.email || 'jaozinho123@gmail.com'}</p>
                  </div>
                </div>
              </div>

              {/* Tabs - mesma linha, dentro do card */}
              <div className="border-b border-gray-200 bg-white">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`flex-1 px-6 py-3 text-sm font-medium transition-all ${
                      activeTab === 'about'
                        ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    Sobre Mim
                  </button>
                  <button
                    onClick={() => setActiveTab('agenda')}
                    className={`flex-1 px-6 py-3 text-sm font-medium transition-all ${
                      activeTab === 'agenda'
                        ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Agenda
                  </button>
                </div>
              </div>

              {/* Conteúdo - tudo dentro do mesmo card */}
              <CardContent className="p-6 bg-white">
                
                {/* Tab: Sobre Mim */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    
                    {/* Grid com 3 cards de métricas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Rating */}
                      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-5 border border-yellow-200 shadow-sm">
                        <p className="text-xs text-gray-600 mb-2">Rating Geral</p>
                        <div className="flex items-center justify-between">
                          <p className="text-4xl font-bold text-amber-600">3.4</p>
                          <div className="text-5xl">⭐</div>
                        </div>
                        <div className="mt-2 flex items-center text-xs text-green-600">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +0.2 este mês
                        </div>

                        {/*
                          mini grafico de linha
                        */}
                        <div className="mt-4">
                          s
                        </div>
                        
                        {/* ESPAÇO PARA O GRÁFICO - VOCÊ VAI ADICIONAR AQUI */}

                        <div className="mt-3 h-12 bg-amber-100 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">Gráfico aqui</span>
                        </div>
                        
                      </div>

                      {/* Status */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200 shadow-sm">
                        <p className="text-xs text-gray-600 mb-2">Status</p>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-green-100 text-green-700 border-green-300 px-3 py-1">
                            <span className="mr-1">😊</span> Good
                          </Badge>
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <p className="text-xs text-gray-500">Performance acima da média</p>
                      </div>

                      {/* Total Feedbacks */}
                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 border border-purple-200 shadow-sm">
                        <p className="text-xs text-gray-600 mb-2">Feedbacks</p>
                        <div className="flex items-center justify-between">
                          <p className="text-4xl font-bold text-purple-600">24</p>
                          <div className="text-5xl">💬</div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Recebidos este trimestre</p>
                      </div>

                    </div>

                    {/* Pergunta Contextual com emoji */}
                    <div className="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4 shadow-sm">
                      <p className="text-sm font-semibold text-purple-900 mb-2 flex items-center">
                        <span className="text-xl mr-2">💭</span>
                        O que você focou esta semana?
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Desenvolvimento de APIs REST, refatoração do sistema de autenticação 
                        e implementação de testes automatizados.
                      </p>
                    </div>

                    {/* Informações do perfil */}
                    <div className="space-y-1">
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Departamento</span>
                        <span className="text-sm font-semibold text-gray-900">Tecnologia</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Data de entrada</span>
                        <span className="text-sm font-semibold text-gray-900">Janeiro 2024</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Localização</span>
                        <span className="text-sm font-semibold text-gray-900">Remoto - Brasil</span>
                      </div>
                    </div>

                  </div>
                )}

                {/* Tab: Agenda */}
                {activeTab === 'agenda' && (
                  <div className="space-y-4">
                    
                    {/* Lista de tarefas - estilo Lattice */}
                    <div className="space-y-2">
                      
                      <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">Como você está se sentindo?</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">Check-in semanal de bem-estar</p>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">Suas prioridades este trimestre</span>
                            <div className="flex -space-x-1">
                              <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-xs text-white font-semibold">
                                M
                              </div>
                              <div className="w-6 h-6 rounded-full bg-purple-400 border-2 border-white flex items-center justify-center text-xs text-white font-semibold">
                                A
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">Reunião com gestor e RH</p>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer group">
                        <input 
                          type="checkbox" 
                          defaultChecked
                          className="w-5 h-5 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-500 line-through">Aplicar feedback sobre comunicação assertiva</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">✓ Concluído</p>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">Enviar feedback para 3 colegas</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">Meta mensal de desenvolvimento do time</p>
                        </div>
                      </label>

                      {/* Add talking point */}
                      <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition w-full text-left">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <span className="text-gray-400 text-xl leading-none">+</span>
                        </div>
                        <span className="text-sm text-gray-500">Adicionar ponto de conversa</span>
                      </button>

                    </div>

                  </div>
                )}

              </CardContent>
            </Card>

          </div>
        </Container>
      </div>
    </DashboardLayout>
  )
}