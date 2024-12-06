'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SignInButton, SignedIn, SignedOut, useUser,UserButton } from '@clerk/nextjs'
import { FileText, Home, Dumbbell, LogIn, User, Settings, BookMarked, MessageSquare } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'


export default function Navbar() {
  const { user } = useUser()
  const pathname = usePathname()
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      // Detect keyboard opening by comparing viewport heights
      const viewportHeight = window.innerHeight
      const visualViewportHeight = window.visualViewport?.height || viewportHeight
      
      setIsKeyboardOpen(viewportHeight > visualViewportHeight)
    }

    // Add event listener for viewport resize
    window.visualViewport?.addEventListener('resize', handleResize)
    
    return () => {
      // Cleanup listener
      window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [])

  const isAdmin = user?.publicMetadata.role === 'admin'

  const isActive = (path: string) => pathname === path ? 'bg-black text-white' : ''

  return (
    <>
      {/* Desktop Navbar remains unchanged */}
      <nav className="hidden md:flex bg-white  rounded-3xl m-4 mx-52">
        <div className="container  mx-auto flex justify-between items-center">
        <Link href="/" className="ml-5  text-black text-4xl font-bold  ">
          <Image src="/images/logo.png" alt="Logo" width={100} height={100} />        
        </Link>
          <div className="space-x-4 text-xl px-10">
            <SignedIn>
              <Link href={`/workout/${user?.id}`} className={`text-black p-4 rounded-full  ${isActive(`/workout/${user?.id}`) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
                Allenamento
              </Link>
              <Link href={`/scheda/${user?.id}`} className={`text-black p-4 rounded-full ${isActive(`/scheda/${user?.id}`) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
                Scheda
              </Link>
              <Link href={`/manual/${user?.id}`} className={`text-black p-4 rounded-full  ${isActive(`/manual/${user?.id}`) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
                Manuale
              </Link>
              <Link href={`/messages/${user?.id}`} className={`text-black p-4 rounded-full 0 ${isActive(`/messages/${user?.id}`) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
                Messaggi
              </Link>
              {isAdmin && (
                <Link href="/admin/create-workout" className={`text-black p-4 rounded-full  ${isActive('/admin/create-workout')}`}>
                  Crea Allenamento
                </Link>
              )}
              <Link href={`/user/${user?.id}`} className={`text-black p-4 rounded-full  ${isActive(`/user/${user?.id}`) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
                Profilo
              </Link>
                <UserButton afterSignOutUrl="/"/>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-white bg-black p-4 rounded-full ">
                  Accedi
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav 
        className={`
          md:hidden 
          fixed 
          bottom-0 
          left-0 
          right-0 
          bg-white 
          p-4 
          rounded-3xl 
          m-4 
          shadow-md 
          z-50 
          transition-transform 
          duration-300 
          ${isKeyboardOpen ? 'translate-y-full' : 'translate-y-0'}
        `}
      >
        <div className="flex justify-around items-center">
          <SignedIn>
            <Link href={`/workout/${user?.id}`} className={`text-black p-5 rounded-2xl  ${isActive(`/workout/${user?.id}`) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
              <Dumbbell size={24} />
            </Link>
            <Link href={`/scheda/${user?.id}`} className={`text-black p-5 rounded-2xl  ${isActive(`/scheda/${user?.id}`) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
              <FileText size={24} />
            </Link>
            <Link href={`/manual/${user?.id}`} className={`text-black p-5 rounded-2xl  ${isActive(`/manual/${user?.id}`) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
              <BookMarked size={24} />
            </Link>
            <Link href={`/messages/${user?.id}`} className={`text-black p-5 rounded-2xl  ${isActive(`/messages/${user?.id}`) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
              <MessageSquare size={24}/>
            </Link>
            {isAdmin && (
              <Link href="/admin/create-workout" className={`text-black p-5 rounded-2xl ${isActive('/admin/create-workout')}`}>
                <Settings size={24} />
              </Link>
            )}
            <Link href={`/user/${user?.id}`} className={`text-black p-5 rounded-2xl  ${isActive(`/user/${user?.id}`) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
              <User size={24} />
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/" className={`text-black p-5 mx-0 rounded-xl hover:bg-gray-100 ${isActive('/')}`}>
              <Home size={24} />
            </Link>
            <SignInButton mode="modal">
              <button className="text-white bg-black p-2 rounded-full">
                <LogIn size={24} />
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </>
  )
}