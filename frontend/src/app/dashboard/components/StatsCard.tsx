import React from 'react'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number
  icon: LucideIcon
  color: string
  bgColor: string
}

export function StatsCard({ title, value, icon: Icon, color, bgColor }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex items-center gap-4">
        <div className={`${bgColor} p-3 rounded-xl flex items-center justify-center`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 leading-none">
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}
