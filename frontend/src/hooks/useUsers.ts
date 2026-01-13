'use client'

import { useState, useEffect } from 'react'
import { User } from '@/types'
import { userService } from '@/services/user.service'
import toast from 'react-hot-toast'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      setLoading(true)
      const data = await userService.getAll()
      setUsers(data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      toast.error('Erro ao carregar usuários')
    } finally {
      setLoading(false)
    }
  }

  return {
    users,
    loading,
    error,
    loadUsers,
  }
}
