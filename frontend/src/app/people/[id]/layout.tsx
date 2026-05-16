'use client';

import { Header, ProfileHeader } from '@/components/layout';
import { useAuth } from '@/contexts/AuthContext';

export default function PeopleLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="lg:pl-72">
        <ProfileHeader 
          id={params.id}
          userName={user?.nome || 'User'} 
          userRole={user?.email || 'Role'} 
          userAvatar={user?.avatar}
        />
        <div className="bg-transparent min-h-screen">
          <div className="max-w-6xl mx-auto px-4 pb-8 pt-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

