'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Mail, Lock, User as UserIcon } from 'lucide-react'
import { Button, Input } from '@/components/ui'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        await login({ email, password })
      } else {
        await register({ email, password, nome: name })
      }
      // Redirect será feito pelo page.tsx quando user for atualizado
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-2xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Entrar no' : 'Criar conta no'} Feedback360
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? 'Bem-vindo de volta!' : 'Junte-se a nós hoje'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <Input
                id="name"
                name="name"
                type="text"
                required={!isLogin}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                icon={<UserIcon className="h-5 w-5 text-gray-400" />}
              />
            )}

            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              icon={<Mail className="h-5 w-5 text-gray-400" />}
            />

            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              icon={<Lock className="h-5 w-5 text-gray-400" />}
            />
          </div>

          <div>
            <Button
              type="submit"
              fullWidth
              loading={loading}
            >
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </Button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              {isLogin
                ? 'Não tem uma conta? Cadastre-se'
                : 'Já tem uma conta? Entre'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
