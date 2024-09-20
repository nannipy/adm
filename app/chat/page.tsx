'use client'
import { useAuth, useUser } from '@clerk/nextjs';
import CoachUserChat from '@/components/coachuserchat';

export default function ChatPage() {
  const { isLoaded: isAuthLoaded, userId } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  const coachData = {
    id: 'gb.pernazza@gmail.com',
    name: 'Giovanni Pernazza',
    email: 'gb.pernazza@gmail.com',
  };

  if (!isAuthLoaded || !isUserLoaded) {
    return <div className="container mx-auto px-4 py-8">Caricamento...</div>;
  }

  if (!userId) {
    return <div className="container mx-auto px-4 py-8">Effettua l'accesso per utilizzare la chat</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Chat con il Coach</h1>
      <CoachUserChat coachData={coachData} user={user} />
    </div>
  );
}