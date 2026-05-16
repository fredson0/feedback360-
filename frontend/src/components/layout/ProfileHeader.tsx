'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface ProfileHeaderProps {
    userName: string
    userRole: string
    userAvatar?: string
    id?: string
}

export function ProfileHeader({ userName, userRole, userAvatar, id }: ProfileHeaderProps) {
  const pathname = usePathname();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const storageKey = `profileImage:${id ?? 'me'}`;
    const storedImage = localStorage.getItem(storageKey);
    setProfileImage(storedImage);
  }, [id]);

  const isActive = (route: string) => pathname.includes(route);
  const getTabClass = (route: string) => 
    isActive(route) 
      ? 'bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium text-gray-900' 
      : 'text-gray-600 hover:text-gray-900 cursor-pointer transition-colors';

  return (
  <div className="bg-gradient-to-r from-purple-600 to-purple-400 h-20 relative pt-16">
    {/* Camada 1: Container do Card Branco */}
    <div className="max-w-6xl mx-auto px-4 -mt-8">
      
      {/* Camada 2: Card Branco */}
      <div className="bg-white rounded-lg shadow-lg p-8 flex justify-between items-center">
        
        {/* Lado Esquerdo: Avatar + Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl overflow-hidden">
            {profileImage || userAvatar ? (
              <img
                src={profileImage || userAvatar}
                alt="Foto do perfil"
                className="h-full w-full object-cover"
              />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
          </div>
          
          {/* Info */}
          <div>
            <h2 className="font-bold text-lg text-gray-900">{userName}</h2>
            <p className="text-gray-500 text-sm">{userRole}</p>
          </div>
        </div>
        
        {/* Lado Direito: Abas */}
        <nav className="flex gap-6">
          {/* As 5 abas aqui: Overview, 1:1s, Updates, Feedbacks, Grow */}
          <Link href={`/people/${id}/overview`} className={getTabClass('overview')}>
            Overview
          </Link>
          <Link href={`/people/${id}/one-on-one`} className={getTabClass('one-on-one')}>
            1:1s
          </Link>
          <Link href={`/people/${id}/updates`} className={getTabClass('updates')}>
            Updates
          </Link>
          <Link href={`/people/${id}/feedbacks`} className={getTabClass('feedbacks')}>
            Feedbacks
          </Link>
          <Link href={`/people/${id}/grow`} className={getTabClass('grow')}>
            Grow
          </Link>
        </nav>
        
      </div>
    </div>
  </div>
);
}
