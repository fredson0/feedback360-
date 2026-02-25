import React, { ReactNode } from 'react'
import { Star, CheckCircle, AlertTriangle, XCircle, Info, Zap } from 'lucide-react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'rating' | 'glow'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rating?: number // Usado quando variant='rating'
  border?: boolean
  icon?: boolean
}

export function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  rating,
  border = false,
  icon = false
}: BadgeProps) {
  const variants = {
    default: 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300 shadow-sm',
    success: 'bg-gradient-to-r from-emerald-100 to-green-200 text-emerald-800 hover:from-emerald-200 hover:to-green-300 shadow-sm shadow-green-200',
    warning: 'bg-gradient-to-r from-amber-100 to-yellow-200 text-amber-800 hover:from-amber-200 hover:to-yellow-300 shadow-sm shadow-yellow-200',
    danger: 'bg-gradient-to-r from-red-100 to-rose-200 text-red-800 hover:from-red-200 hover:to-rose-300 shadow-sm shadow-red-200',
    info: 'bg-gradient-to-r from-cyan-100 to-blue-200 text-cyan-800 hover:from-cyan-200 hover:to-blue-300 shadow-sm shadow-blue-200',
    primary: 'bg-gradient-to-r from-indigo-100 to-purple-200 text-indigo-800 hover:from-indigo-200 hover:to-purple-300 shadow-sm shadow-purple-200',
    rating: getRatingVariant(rating || 0),
    glow: 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-purple-500/25 animate-pulse',
  }
  
  const sizes = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
    xl: 'px-4 py-2 text-lg',
  }

  const borderStyles = border ? 'border border-opacity-20' : ''
  
  function getRatingVariant(rating: number): string {
    if (rating >= 5) return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-green-500/25'
    if (rating >= 4) return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25'
    if (rating >= 3) return 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700 shadow-lg shadow-yellow-500/25'
    if (rating >= 2) return 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/25'
    return 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/25'
  }

  function getIcon() {
    if (!icon) return null
    
    const iconClasses = `w-3 h-3 mr-1.5`
    
    switch (variant) {
      case 'success': return <CheckCircle className={iconClasses} />
      case 'warning': return <AlertTriangle className={iconClasses} />
      case 'danger': return <XCircle className={iconClasses} />
      case 'info': return <Info className={iconClasses} />
      case 'glow': return <Zap className={iconClasses} />
      case 'rating': return <Star className={`${iconClasses} fill-current`} />
      default: return null
    }
  }
  
  return (
    <span className={`
      inline-flex items-center rounded-full font-medium 
      transition-all duration-300 ease-in-out
      hover:scale-105 hover:shadow-lg
      ${variants[variant]} 
      ${sizes[size]} 
      ${borderStyles}
    `}>
      {getIcon()}
      {children}
    </span>
  )
}
