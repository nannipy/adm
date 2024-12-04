'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import { Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardContent } from "@/components/ui/card"

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isCoach: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

const ChatComponent = ({ params }: { params: { userId: string } }) => {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Memoized scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [])

  // Load messages from localStorage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem(`messages_${params.userId}`)
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages).map((msg: Message) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
      setMessages(parsedMessages)
      
      // Scroll to bottom after messages are loaded
      setTimeout(scrollToBottom, 0)
    }
  }, [params.userId, scrollToBottom])

  // Memoized message send handler
  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '',
      receiverId: 'coach',
      content: newMessage,
      timestamp: new Date(),
      isCoach: false,
      status: 'sent'
    }

    const updatedMessages = [...messages, newMsg]
    setMessages(updatedMessages)
    setNewMessage('')

    // Save messages to localStorage
    localStorage.setItem(`messages_${params.userId}`, JSON.stringify(updatedMessages))

    // Simulate coach response (optional)
    setTimeout(() => {
      const coachReply: Message = {
        id: Date.now().toString(),
        senderId: 'coach',
        receiverId: user?.id || '',
        content: `Ricevuto: ${newMessage}`,
        timestamp: new Date(),
        isCoach: true,
        status: 'delivered'
      }
      const finalMessages = [...updatedMessages, coachReply]
      setMessages(finalMessages)
      localStorage.setItem(`messages_${params.userId}`, JSON.stringify(finalMessages))
      
      // Scroll to bottom after coach reply
      scrollToBottom()
    }, 1000)

    // Focus back on input
    inputRef.current?.focus()
  }, [messages, newMessage, params.userId, scrollToBottom, user?.id])

  // Memoized MessageBubble component
  const MessageBubble = useCallback(({ message }: { message: Message }) => {
    const isUserMessage = !message.isCoach

    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex w-full mb-2 ${isUserMessage ? 'justify-end' : 'justify-start'}`}
      >
        <div 
          className={`
            max-w-[75%] p-3 rounded-xl shadow-lg
            ${isUserMessage 
              ? 'bg-neutral-800 text-white' 
              : 'bg-neutral-700 text-white'}
            relative
          `}
        >
          <p className="text-sm break-words">{message.content}</p>
          <div className="flex items-center justify-end space-x-1 mt-1">
            <small className="text-xs text-neutral-400 mr-1">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </small>
            {isUserMessage && message.status && (
              <span className="text-green-400 text-xs">
                {message.status === 'sent' ? '✓' : '✓✓'}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    )
  }, [])

  // Unauthorized access check
  if (user?.id !== params.userId) {
    return <div className="container mx-auto px-4 py-8 text-center">Accesso non autorizzato</div>
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:px-20 xl:px-40 ">
      <Card className="bg-transparent border-none shadow-none  ">
        <CardHeader className="text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white  tracking-tight"
          >
            Chat con il Coach
          </motion.h1>
        </CardHeader>
        
        <CardContent className=' bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8'>
          {/* Messages Container */}
          <div
            className="h-[60vh] overflow-y-auto space-y-1 mb-4 bg-neutral-800/60 rounded-xl p-2 sm:p-4 md:p-6"
            style={{ scrollbarWidth: 'none' }}
            ref={(el) => {
              if (el) {
                el.scrollTop = el.scrollHeight;
              }
            }}
          >
            <AnimatePresence>
              {messages.reduce((acc, message, index, array) => {
                const prevMessage = array[index - 1]
                const isSameDay = prevMessage && message.timestamp.toDateString() === prevMessage.timestamp.toDateString()
                const isYesterday = prevMessage && message.timestamp.toDateString() === new Date(Date.now() - 1000 * 60 * 60 * 24).toDateString()
                const isToday = message.timestamp.toDateString() === new Date().toDateString()

                if (!isSameDay) {
                  const date = isYesterday ? 'Ieri' : isToday ? 'Oggi' : message.timestamp.toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })
                  acc.push(
                    <div key={`${message.id}-divider`} className="flex justify-center text-xs text-neutral-400 my-2">
                      <div className="bg-neutral-800/60 rounded-full px-2 py-0.5">{date}</div>
                    </div>
                  )
                }

                acc.push(<MessageBubble key={message.id} message={message} />)

                return acc
              }, [] as JSX.Element[])}
            </AnimatePresence>
          </div>

          {/* Message Input */}
          <div className="bg-neutral-800/60 rounded-2xl p-2 sm:p-4 flex items-center space-x-2">
            <div className="flex-grow relative">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className={`
                  w-full p-2 pl-4 pr-10 rounded-xl 
                  bg-neutral-700 text-white 
                  focus:outline-none focus:ring-2 focus:ring-sky-400
                  transition-all duration-300
                `}
                placeholder="Scrivi un messaggio..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
            </div>
            
            <button 
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ''}
              className={`
                bg-sky-400 text-black p-2 rounded-xl 
                transition-all duration-300
                ${newMessage.trim() === '' 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-sky-300 active:scale-95'}
              `}
            >
              <Send size={24} />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Add display name
ChatComponent.displayName = 'ChatComponent'

export default ChatComponent