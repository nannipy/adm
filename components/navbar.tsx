'use client'

import Link from 'next/link'
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { Home, Dumbbell, LogIn, User, MessageSquare, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { user } = useUser()
  const pathname = usePathname()

  const isAdmin = user?.publicMetadata.role === 'admin'

  const isActive = (path: string) => pathname === path ? 'bg-gray-100' : ''

  return (
    <>
      {/* Navbar per tablet e desktop */}
      <nav className="hidden md:flex bg-white p-4 rounded-full m-4 mx-40">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-black text-4xl font-bold mx-16 ">
            ADM sport and nutrition
          </Link>
          <div className="space-x-4 text-xl px-10">
            <SignedIn>
              <Link href={`/workout/${user?.id}`} className={`text-black p-4 rounded-full hover:bg-gray-100 ${isActive(`/workout/${user?.id}`)}`}>
                Allenamento
              </Link>
              {isAdmin && (
                <Link href="/admin/create-workout" className={`text-black p-4 rounded-full hover:bg-gray-100 ${isActive('/admin/create-workout')}`}>
                  Crea Allenamento
                </Link>
              )}
              <Link href={`/messages/${user?.id}`} className={`text-black p-4 rounded-full hover:bg-gray-100 ${isActive(`/messages/${user?.id}`)}`}>
                Messaggi
              </Link>
              <Link href={`/user/${user?.id}`} className={`text-black p-4 rounded-full hover:bg-gray-100 ${isActive(`/user/${user?.id}`)}`}>
                Profilo
              </Link>
              <UserButton afterSignOutUrl="/" />
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

      {/* Navbar per mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 rounded-xl m-4 shadow-md z-50">
        <div className="flex justify-around items-center">
          <Link href="/" className={`text-black p-5 mx-0 rounded-xl hover:bg-gray-100 ${isActive('/')}`}>
            <Home size={24} />
          </Link>
          <SignedIn>
            <Link href={`/workout/${user?.id}`} className={`text-black p-5 mx-0 rounded-2xl hover:bg-gray-100 ${isActive(`/workout/${user?.id}`)}`}>
              <Dumbbell size={24} />
            </Link>
            {isAdmin && (
              <Link href="/admin/create-workout" className={`text-black p-5 mx-0 rounded-2xl hover:bg-gray-100 ${isActive('/admin/create-workout')}`}>
                <Settings size={24} />
              </Link>
            )}
            <Link href={`/messages/${user?.id}`} className={`text-black p-5 mx-0 rounded-2xl hover:bg-gray-100 ${isActive(`/messages/${user?.id}`)}`}>
              <MessageSquare size={24} />
            </Link>
            <Link href={`/user/${user?.id}`} className={`text-black p-5 mx-0 rounded-2xl hover:bg-gray-100 ${isActive(`/user/${user?.id}`)}`}>
              <User size={24} />
            </Link>
          </SignedIn>
          <SignedOut>
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