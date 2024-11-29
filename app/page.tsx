'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { SignedOut, SignInButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'

export default function Home() {
  const { user } = useUser()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="container mx-auto mt-10 text-white p-4 ">
      {/* Hero Section */}
      <motion.section 
        className="text-center"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-10 text-white">ADM Sport e Nutrizione</h1>
        <p className="text-xl mb-8 text-white">Trasforma il tuo corpo e la tua vita con il nostro coaching personalizzato</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-black bg-white p-4 rounded-full">
                Inizia Ora 
              </button>
            </SignInButton>
          </SignedOut>
            {user && (
              <Link href="/workout">
                <button className="text-black bg-white p-4 rounded-3xl">
                  Vai alle schede
                </button>
              </Link>
            )}
          
        </motion.div>
      </motion.section>

      {/* Servizi */}
      <section className="py-2">
      <motion.section 
        className="text-center py-10 mb-10 md:mb-0"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-semibold text-center mb-12 text-white">I Nostri Servizi</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white p-8 rounded-3xl shadow-md"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.2, delay: 0.01 }}
          >
            
            <h3 className="text-2xl font-semibold mb-4 text-center text-blue-900">Coaching Sportivo</h3>
            <p className="text-center text-gray-700">Programmi di allenamento su misura per raggiungere i tuoi obiettivi fitness.</p>
          </motion.div>
          <motion.div 
            className="bg-white p-8 rounded-3xl shadow-md z-0"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)"  }}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}

            transition={{ duration: 0.2, delay: 0.01 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-center text-blue-900">Consulenza Nutrizionale</h3>
            <p className="text-center text-gray-700">Piani alimentari personalizzati per ottimizzare la tua salute e le tue prestazioni.</p>
          </motion.div>
          <motion.div 
            className="bg-white p-8 rounded-3xl shadow-md"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
            
            transition={{ duration: 0.2, delay: 0.01}}
          >
            <h3 className="text-2xl font-semibold mb-4 text-center text-blue-900">Chat con il Coach</h3>
            <p className="text-center text-gray-700">Comunicazione diretta con il tuo coach personale.</p>
            <div className="text-center mt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/messages" className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-600 transition duration-300 mt-4 inline-block">Vai alla chat</Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      </section>
    </div>
  )
}