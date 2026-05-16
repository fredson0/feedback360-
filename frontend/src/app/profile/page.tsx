'use client'

import { useEffect, useRef, useState } from 'react'
import { Sora } from 'next/font/google'
import { DashboardLayout, Container } from "@/components/layout"
import { Card, CardContent, Badge } from "@/components/ui"
import { useAuth } from '@/contexts/AuthContext'
import { Calendar, User, TrendingUp, CheckCircle, Sparkles, Star } from 'lucide-react'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('about')
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const ratingHistory = [3.2, 3.1, 3.4, 3.5, 3.3, 3.4, 3.6] // Exemplo de dados históricos de rating

  useEffect(() => {
    const storageKey = `profileImage:${user?.id ?? 'me'}`
    const storedImage = localStorage.getItem(storageKey)
    if (storedImage) {
      setProfileImage(storedImage)
    }
  }, [user?.id])

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : null
      if (!result) return
      const storageKey = `profileImage:${user?.id ?? 'me'}`
      localStorage.setItem(storageKey, result)
      setProfileImage(result)
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePhoto = () => {
    const storageKey = `profileImage:${user?.id ?? 'me'}`
    localStorage.removeItem(storageKey)
    setProfileImage(null)
  }

  return (
    <DashboardLayout>
      <div className={`min-h-screen py-8 ${sora.className}`}>
        <Container>
          <div className="max-w-5xl mx-auto">
            
            <Card className="overflow-hidden rounded-[28px] border border-white/30 bg-white/35 shadow-2xl shadow-indigo-200/30 backdrop-blur">
              
              <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 p-8 text-white">
                <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:space-x-6">
                  <div className="flex-shrink-0">
                    <div className="rounded-2xl bg-white/15 p-4 shadow-lg">
                      <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white/20 text-3xl font-bold">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Foto do perfil"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span>{user?.nome?.substring(0, 2).toUpperCase() || 'JA'}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/70">Perfil</p>
                    <h1 className="mt-2 text-3xl font-semibold">
                      {user?.nome || 'jaozinho'}
                    </h1>
                    <p className="text-white/80 text-sm mt-1 font-medium">Desenvolvedor Backend</p>
                    <p className="text-white/70 text-sm mt-1">{user?.email || 'jaozinho123@gmail.com'}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 text-sm">
                      <Sparkles className="h-4 w-4" />
                      Membro desde 2024
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/30"
                      >
                        {profileImage ? 'Trocar foto' : 'Adicionar foto'}
                      </button>
                      {profileImage && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:bg-white/20"
                        >
                          Remover
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs - mesma linha, dentro do card */}
              <div className="border-b border-slate-200 bg-white/50">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`flex-1 px-6 py-3 text-sm font-semibold transition-all ${
                      activeTab === 'about'
                        ? 'text-indigo-600 border-b-2 border-indigo-500 bg-indigo-50'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    Sobre Mim
                  </button>
                  <button
                    onClick={() => setActiveTab('agenda')}
                    className={`flex-1 px-6 py-3 text-sm font-semibold transition-all ${
                      activeTab === 'agenda'
                        ? 'text-indigo-600 border-b-2 border-indigo-500 bg-indigo-50'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Agenda
                  </button>
                </div>
              </div>

              {/* Conteúdo - tudo dentro do mesmo card */}
              <CardContent className="p-6 bg-white/50">
                
                {/* Tab: Sobre Mim */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    
                    {/* Grid com 3 cards de métricas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Rating */}
                      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 p-5 shadow-sm">
                        <p className="text-xs text-slate-500 mb-2">Rating Geral</p>
                        <div className="flex items-center justify-between">
                          <p className="text-4xl font-semibold text-indigo-600">3.4</p>
                          <Star className="h-10 w-10 text-fuchsia-500" />
                        </div>
                        <div className="mt-2 flex items-center text-xs text-emerald-600">
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

                        <div className="mt-3 h-12 rounded-xl bg-indigo-100/70 flex items-center justify-center">
                          <span className="text-xs text-slate-500">Gráfico aqui</span>
                        </div>
                        
                      </div>

                      {/* Status */}
                      <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-5 shadow-sm">
                        <p className="text-xs text-slate-500 mb-2">Status</p>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-indigo-100 text-indigo-700 border-indigo-300 px-3 py-1">
                            <span className="mr-1">😊</span> Good
                          </Badge>
                          <CheckCircle className="w-8 h-8 text-indigo-500" />
                        </div>
                        <p className="text-xs text-slate-500">Performance acima da média</p>
                      </div>

                      {/* Total Feedbacks */}
                      <div className="rounded-2xl border border-fuchsia-100 bg-gradient-to-br from-fuchsia-50 via-white to-indigo-50 p-5 shadow-sm">
                        <p className="text-xs text-slate-500 mb-2">Feedbacks</p>
                        <div className="flex items-center justify-between">
                          <p className="text-4xl font-semibold text-fuchsia-600">24</p>
                          <div className="text-4xl">💬</div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Recebidos este trimestre</p>
                      </div>

                    </div>

                    {/* Pergunta Contextual com emoji */}
                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/80 p-4 shadow-sm">
                      <p className="text-sm font-semibold text-indigo-900 mb-2 flex items-center">
                        <span className="text-xl mr-2">💭</span>
                        O que você focou esta semana?
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Desenvolvimento de APIs REST, refatoração do sistema de autenticação 
                        e implementação de testes automatizados.
                      </p>
                    </div>

                    {/* Informações do perfil */}
                    <div className="space-y-1">
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-sm text-slate-500">Departamento</span>
                        <span className="text-sm font-semibold text-slate-900">Tecnologia</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-sm text-slate-500">Data de entrada</span>
                        <span className="text-sm font-semibold text-slate-900">Janeiro 2024</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-sm text-slate-500">Localização</span>
                        <span className="text-sm font-semibold text-slate-900">Remoto - Brasil</span>
                      </div>
                    </div>

                  </div>
                )}

                {/* Tab: Agenda */}
                {activeTab === 'agenda' && (
                  <div className="space-y-4">
                    
                    {/* Lista de tarefas - estilo Lattice */}
                    <div className="space-y-2">
                      
                      <label className="flex items-center space-x-3 p-3 rounded-xl hover:bg-indigo-50/60 transition cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 text-indigo-500 rounded border-slate-300 focus:ring-indigo-500" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-slate-900">Como você está se sentindo?</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Check-in semanal de bem-estar</p>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-3 rounded-xl hover:bg-indigo-50/60 transition cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 text-indigo-500 rounded border-slate-300 focus:ring-indigo-500" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-slate-900">Suas prioridades este trimestre</span>
                            <div className="flex -space-x-1">
                              <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-xs text-white font-semibold">
                                M
                              </div>
                              <div className="w-6 h-6 rounded-full bg-fuchsia-500 border-2 border-white flex items-center justify-center text-xs text-white font-semibold">
                                A
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Reunião com gestor e RH</p>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-3 rounded-xl hover:bg-indigo-50/60 transition cursor-pointer group">
                        <input 
                          type="checkbox" 
                          defaultChecked
                          className="w-5 h-5 text-indigo-500 rounded border-slate-300 focus:ring-indigo-500" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-slate-500 line-through">Aplicar feedback sobre comunicação assertiva</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">✓ Concluído</p>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-3 rounded-xl hover:bg-indigo-50/60 transition cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 text-indigo-500 rounded border-slate-300 focus:ring-indigo-500" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-slate-900">Enviar feedback para 3 colegas</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Meta mensal de desenvolvimento do time</p>
                        </div>
                      </label>

                      {/* Add talking point */}
                      <button className="flex items-center space-x-3 p-3 rounded-xl hover:bg-indigo-50/60 transition w-full text-left">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <span className="text-slate-400 text-xl leading-none">+</span>
                        </div>
                        <span className="text-sm text-slate-500">Adicionar ponto de conversa</span>
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