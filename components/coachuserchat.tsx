import React, { useEffect, useState, useCallback } from 'react';
import Talk from 'talkjs';
import { Session, Chatbox, ConversationList } from '@talkjs/react';

const CoachUserChat = ({ coachData, user }: { coachData: any, user: any }) => {
  const [talkReady, setTalkReady] = useState(false);
  const [isCoach, setIsCoach] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    Talk.ready.then(() => setTalkReady(true));
  }, []);

  useEffect(() => {
    if (user.id === coachData.id) {
      setIsCoach(true);
    }
  }, [user.id, coachData.id]);

  const syncUser = useCallback(() => {
    if (isCoach) {
      return new Talk.User({
        id: coachData.id,
        name: coachData.name,
        email: coachData.email,
        photoUrl: coachData.photoUrl || 'https://example.com/default-coach-avatar.jpg',
        role: 'coach'
      });
    }

    return new Talk.User({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.primaryEmailAddress?.emailAddress,
      photoUrl: user.imageUrl,
      role: 'user'
    });
  }, [user, isCoach, coachData]);

  const syncConversation = useCallback((session: any) => {
    if (isCoach) {
      // For the coach, we don't create a specific conversation here
      // The coach will see a list of all conversations
      return null;
    } else {
      // For regular users, create a conversation with the coach
      const conversationId = `coach_${coachData.id}_user_${user.id}`;
      const conversation = session.getOrCreateConversation(conversationId);

      const coach = new Talk.User({
        id: coachData.id,
        name: coachData.name,
        email: coachData.email,
        photoUrl: coachData.photoUrl || 'https://example.com/default-coach-avatar.jpg',
        role: 'coach'
      });

      const currentUser = session.me;
      conversation.setParticipant(currentUser);
      conversation.setParticipant(coach);

      return conversation;
    }
  }, [user.id, coachData, isCoach]);

  if (!talkReady) {
    return <div>Caricamento della chat...</div>;
  }

  return (
    <Session appId="t6NpV0HE" syncUser={syncUser}>
      {isCoach ? (
        <div style={{ display: 'flex', height: '500px' }}>
          <ConversationList
            onSelectConversation={setSelectedConversation}
            style={{ width: '300px', height: '100%' }}
          />
          {selectedConversation && (
            <Chatbox
              conversation={selectedConversation}
              style={{ width: 'calc(100% - 300px)', height: '100%' }}
            />
          )}
        </div>
      ) : (
        <Chatbox
          syncConversation={syncConversation}
          style={{ width: '100%', height: '500px' }}
        />
      )}
    </Session>
  );
};

export default CoachUserChat;