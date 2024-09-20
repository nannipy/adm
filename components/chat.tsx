import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import CoachUserChat from './coachuserchat';
import {Coachdata} from '@/types/coachdata';

const ChatPage = () => {
  const { isLoaded: isAuthLoaded, userId } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  const coachData = {
    id: 'gbpernazza',
    name: 'Giovanni Pernazza',
    email: 'gb.pernazza@gmail.com',
    // Non c'è photoUrl, quindi non la includiamo
  };

  if (!isAuthLoaded || !isUserLoaded) {
    return <div>Caricamento...</div>;
  }

  if (!userId) {
    return <div>Effettua l'accesso per utilizzare la chat</div>;
  }

  return <CoachUserChat coachData={coachData as Coachdata} />;
};

export default ChatPage;