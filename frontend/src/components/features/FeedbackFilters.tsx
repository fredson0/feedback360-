'use client'

import { useState } from 'react'
import { Input, Button } from '@/components/ui'
import { Search, Filter, X, Star } from 'lucide-react'
import { User } from '@/types'

interface FeedbackFiltersProps {
  users: User[]
  onFilterChange: (filters: FeedbackFilters) => void
  onReset: () => void
}

export interface FeedbackFilters {
  search: string
  authorId?: number
  recipientId?: number
  rating?: number
  dateFrom?: string
  dateTo?: string
}

export default function FeedbackFilters({ users, onFilterChange, onReset }: FeedbackFiltersProps) {
  const [filters, setFilters] = useState<FeedbackFilters>({
    search: '',
  })
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterUpdate = (newFilters: Partial<FeedbackFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleReset = () => {
    const resetFilters = { search: '' }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
    onReset()
    setIsExpanded(false)
  }

  const hasActiveFilters = filters.authorId || filters.recipientId || filters.rating || filters.dateFrom || filters.dateTo

  return (
    <div className="space-y-4">
      {/* Barra de busca principal */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar feedbacks por conteúdo..."
          value={filters.search}
          onChange={(e) => handleFilterUpdate({ search: e.target.value })}
          className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute inset-y-0 right-0 px-3"
        >
          <Filter className="h-4 w-4" />
          {hasActiveFilters && (
            <span className="ml-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              !
            </span>
          )}
        </Button>
      </div>

      {/* Filtros expandidos */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          {/* Filtro por autor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              De quem
            </label>
            <select
              value={filters.authorId || ''}
              onChange={(e) => handleFilterUpdate({ authorId: e.target.value ? Number(e.target.value) : undefined })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-sm"
            >
              <option value="">Todos</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por destinatário */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Para quem
            </label>
            <select
              value={filters.recipientId || ''}
              onChange={(e) => handleFilterUpdate({ recipientId: e.target.value ? Number(e.target.value) : undefined })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-sm"
            >
              <option value="">Todos</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Avaliação mínima
            </label>
            <select
              value={filters.rating || ''}
              onChange={(e) => handleFilterUpdate({ rating: e.target.value ? Number(e.target.value) : undefined })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-sm"
            >
              <option value="">Qualquer</option>
              {[5, 4, 3, 2, 1].map(rating => (
                <option key={rating} value={rating}>
                  <Star className="w-3 h-3 inline mr-1" />
                  {rating}+ estrelas
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por data */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
            <div className="space-y-1">
              <input
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => handleFilterUpdate({ dateFrom: e.target.value || undefined })}
                className="block w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-xs"
                placeholder="De"
              />
              <input
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => handleFilterUpdate({ dateTo: e.target.value || undefined })}
                className="block w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-xs"
                placeholder="Até"
              />
            </div>
          </div>

          {/* Botão de reset (se houver filtros ativos) */}
          {hasActiveFilters && (
            <div className="flex items-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="w-full"
              >
                <X className="h-4 w-4 mr-1" />
                Limpar
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}