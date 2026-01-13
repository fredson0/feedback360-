'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, LoginDto, RegisterDto } from '@/types'
import { authService } from '@/services/auth.service'
import toast from 'react-hot-toast'

interface AuthContextData {
  user: User | null
  loading: boolean
  login: (data: LoginDto) => Promise<void>
  register: (data: RegisterDto) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    try {
      console.log('🔍 loadUser: Verificando token...')
      const token = localStorage.getItem('token')
      console.log('🔍 Token encontrado:', !!token)
      
      if (token) {
        console.log('🔍 Buscando dados do usuário...')
        const userData = await authService.getCurrentUser()
        console.log('✅ Usuário carregado:', userData)
        setUser(userData)
      } else {
        console.log('⚠️ Nenhum token encontrado')
      }
    } catch (error) {
      console.error('❌ Error loading user:', error)
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      console.log('🔍 loadUser finalizado, loading=false')
      setLoading(false)
    }
  }

  async function login(data: LoginDto) {
    try {
      setLoading(true)
      const response = await authService.login(data)
      setUser(response.user)
      toast.success('Login realizado com sucesso!')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao fazer login')
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function register(data: RegisterDto) {
    try {
      setLoading(true)
      const response = await authService.register(data)
      setUser(response.user)
      toast.success('Cadastro realizado com sucesso!')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao cadastrar')
      throw error
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    authService.logout()
    setUser(null)
    toast.success('Logout realizado com sucesso!')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
