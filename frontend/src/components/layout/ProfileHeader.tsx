'use client';

import React from 'react';

interface ProfileHeaderProps {
    userName: string
    userRole: string
    userAvatar?: string
    activeTab: string

}

export default function ProfileHeader({ userName, userRole, userAvatar, activeTab }: ProfileHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-400 h-48 relative">
      {/* Passo 1: Barra roxa de fundo - FEITO! */}
      
      {/* Passo 2: Card branco - você vai fazer agora */}
    </div>
  );
}
