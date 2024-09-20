'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

export default function Messages({ params }: { params: { userId: string } }) {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    // Implementa la logica per recuperare i messaggi dal database
  }, [params.userId])

  const handleSendMessage = async () => {
    // Implementa la logica per inviare un nuovo messaggio
  }

  if (user?.id !== params.userId) {
    return <div>Accesso non autorizzato</div>
  }

  return (
    <div>
      <h1>Messaggi</h1>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <p>{message.content}</p>
            <small>{message.timestamp.toLocaleString()}</small>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Invia</button>
    </div>
    
  )
}