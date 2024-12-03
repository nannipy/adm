'use client'

import { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { Send, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isCoach: boolean;
}

export default function Messages({ params }: { params: { userId: string } }) {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Carica i messaggi dal localStorage all'avvio
    const storedMessages = localStorage.getItem(`messages_${params.userId}`)
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }
  }, [params.userId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '',
      receiverId: 'coach',
      content: newMessage,
      timestamp: new Date(),
      isCoach: false
    }

    const updatedMessages = [...messages, newMsg]
    setMessages(updatedMessages)
    setNewMessage('')

    // Salva i messaggi aggiornati nel localStorage
    localStorage.setItem(`messages_${params.userId}`, JSON.stringify(updatedMessages))

    // Qui implementeresti la logica per inviare il messaggio al backend
  }

  if (user?.id !== params.userId) {
    return <div className="container mx-auto px-4 py-8 text-center">Accesso non autorizzato</div>
  }

  return (
    <div className="py-4 md:max-w-full max-h-full md:px-1 px-4  ">
      <h1 className="text-3xl font-bold mb-6 text-center">Chat con il Coach</h1>
      <div className="bg-white rounded-3xl shadow-md p-3">
      <header className="flex items-center mb-4 bg-black p-3 rounded-3xl">
            <h2 className="text-lg md:text-xl font-semibold text-white mr-3">Coach </h2>
            <User size={20} className="text-white" />
          </header>
        <div className="h-[480px] overflow-y-scroll py-0 duration-300 transition ">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`mb-3 ${message.isCoach ? 'text-left' : 'text-right'}`}
              >
                <div className={`inline-block p-2 rounded-lg text-black  ${message.isCoach ? 'bg-blue-200' : 'bg-gray-300'}`}>
                  <p className="text-sm md:text-base text-black ">{message.content}</p>
                  <small className="text-xs text-black">{message.timestamp.toLocaleString()}</small>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow mr-2 p-2 border text-black rounded-full text-sm mt-2"
            placeholder="Scrivi un messaggio..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button 
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-full"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}