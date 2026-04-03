'use client';

import { Header, ProfileHeader } from '@/components/layout';
import { useAuth } from '@/contexts/AuthContext';

export default function PeopleLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const { user } = useAuth();

  return (
    <div>
      <Header />
      <ProfileHeader 
        id={params.id}
        userName={user?.nome || 'User'} 
        userRole={user?.email || 'Role'} 
        userAvatar={user?.avatar}
      />
      <div className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}

