'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

import { motion } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Edit, Save, X, LogOut, Lock } from 'lucide-react'
import { useClerk } from '@clerk/nextjs'
import { toast } from 'sonner' // Assuming you're using sonner for notifications

interface UserProfile {
  nome: string;
  cognome: string;
  email: string;
  dataNascita: string;
  peso: number;
  altezza: number;
}


  
export default function ProfiloUtente({ params }: { params: { userId: string } }) {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [profilo, setProfilo] = useState<UserProfile | null>(null)
  const [modifica, setModifica] = useState(false)
  
  // Remove unused state if not needed
  const [, setOriginalProfile] = useState<UserProfile | null>(null)

  const [passwordChange, setPasswordChange] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const [passwordModifica, setPasswordModifica] = useState(false)

  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`userProfile_${user.id}`)
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile)
        setProfilo(parsedProfile)
        // Use the setter without capturing the value
        setOriginalProfile(parsedProfile)
      } else {
        const profiloIniziale: UserProfile = {
          nome: user.firstName || '',
          cognome: user.lastName || '',
          email: user.emailAddresses[0]?.emailAddress || '',
          dataNascita: user.publicMetadata.birthday as string || '',
          peso: 75,
          altezza: 180
        }
        setProfilo(profiloIniziale)
        setOriginalProfile(profiloIniziale)
      }
    }
  }, [user])



  const handleLogout = async () => {
    try {
      await signOut()
      toast.success('Disconnessione avvenuta con successo', {
        description: 'Sarai reindirizzato alla pagina iniziale'
      })
    } catch (error) {
      console.error('Errore durante la disconnessione:', error)
      toast.error('Impossibile disconnettersi', {
        description: 'Si è verificato un errore. Riprova più tardi.'
      })
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfilo(prev => {
      if (!prev) return null
      return { ...prev, [name]: value }
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordChange(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user && profilo) {
      localStorage.setItem(`userProfile_${user.id}`, JSON.stringify(profilo))
      setOriginalProfile(profilo)
      setModifica(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate password inputs
    if (passwordChange.newPassword !== passwordChange.confirmNewPassword) {
      toast.error('Le nuove password non corrispondono')
      return
    }

    if (passwordChange.newPassword.length < 8) {
      toast.error('La nuova password deve essere lunga almeno 8 caratteri')
      return
    }

    try {
      if (user) {
        await user.updatePassword({
          currentPassword: passwordChange.currentPassword,
          newPassword: passwordChange.newPassword
        })
        
        toast.success('Password modificata con successo')
        
        // Reset password fields and toggle
        setPasswordChange({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        })
        setPasswordModifica(false)

        // Optional: Sign out the user after password change
        await signOut()
      }
    } catch (error) {
      console.error('Errore nel cambio password:', error)
      toast.error('Impossibile modificare la password. Controlla le credenziali.')
    }
  }

  const toggleModifica = (e: React.MouseEvent) => {
    e.preventDefault()
    setModifica(prevState => !prevState)
  }

  const togglePasswordModifica = (e: React.MouseEvent) => {
    e.preventDefault()
    setPasswordModifica(prevState => !prevState)
  }

  if (!user || user.id !== params.userId) {
    return <div className="text-center mt-10 text-white">Accesso non autorizzato</div>
  }

  if (!profilo) {
    return <div className="text-center mt-10 text-white">Caricamento...</div>
  }

  const profileFields = [
    { 
      label: 'Nome', 
      field: 'nome', 
      type: 'text' 
    },
    { 
      label: 'Cognome', 
      field: 'cognome', 
      type: 'text' 
    },
    { 
      label: 'Email', 
      field: 'email', 
      type: 'email' 
    },
    { 
      label: 'Data di Nascita', 
      field: 'dataNascita', 
      type: 'date' 
    },
    { 
      label: 'Peso (kg)', 
      field: 'peso', 
      type: 'number' 
    },
    { 
      label: 'Altezza (cm)', 
      field: 'altezza', 
      type: 'number' 
    }
  ]

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:px-20 xl:px-40 bg-neutral-950">
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white mb-3 tracking-tight"
          >
            Profilo Utente
          </motion.h1>
        </CardHeader>
        
        <CardContent className='mt-4 mb-20 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8'>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center mb-6"
          >
            <Avatar className="h-24 w-24 mb-4 ring-2 ring-neutral-700">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'Utente'} />
              <AvatarFallback className="bg-neutral-800 text-white text-xl">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white">{profilo.nome} {profilo.cognome}</h2>
              <p className="text-gray-400">{profilo.email}</p>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profileFields.map((field) => (
                <motion.div 
                  key={field.field}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <label htmlFor={field.field} className="block text-gray-400 mb-1 text-sm">
                    {field.label}
                  </label>
                  <input
                    id={field.field}
                    type={field.type}
                    name={field.field}
                    value={profilo[field.field as keyof UserProfile]}
                    onChange={handleChange}
                    className={`
                      w-full border rounded-xl p-2 
                      ${modifica ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-900 border-transparent'}
                      text-white 
                      focus:outline-none focus:ring-2 focus:ring-sky-500
                      transition-all duration-300
                    `}
                    disabled={!modifica}
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center flex justify-center space-x-4">
              {modifica ? (
                <>
                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      bg-green-500 text-white 
                      px-4 py-2 rounded-xl 
                      flex items-center space-x-2
                      hover:bg-green-600 
                      transition-colors
                    "
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Salva
                  </motion.button>
                  <motion.button 
                    type="button" 
                    onClick={toggleModifica}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      bg-neutral-800 text-white 
                      px-4 py-2 rounded-xl 
                      flex items-center space-x-2
                      hover:bg-neutral-700 
                      transition-colors
                    "
                  >
                    <X className="w-5 h-5 mr-2" />
                    Annulla
                  </motion.button>
                </>
              ) : (
                <motion.button 
                  type="button" 
                  onClick={toggleModifica}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    bg-sky-500 text-white 
                    px-4 py-2 rounded-xl 
                    flex items-center space-x-2
                    hover:bg-sky-600 
                    transition-colors
                  "
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Modifica Profilo
                </motion.button>
              )}
            </div>
          </form>

          {/* Password Change Section */}
          <div className="mt-8 border-t border-neutral-800  pt-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center">
              <Lock className="w-6 h-6 mr-2" /> Cambia Password
            </h3>

            <form onSubmit={handlePasswordSubmit}>
              {passwordModifica ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <label htmlFor="currentPassword" className="block text-gray-400 mb-1 text-sm">
                      Password Attuale
                    </label>
                    <input
                      id="currentPassword"
                      type="password"
                      name="currentPassword"
                      value={passwordChange.currentPassword}
                      onChange={handlePasswordChange}
                      className="
                        w-full bg-neutral-800 border border-neutral-700 
                        rounded-xl p-2 text-white 
                        focus:outline-none focus:ring-2 focus:ring-sky-500
                        transition-all duration-300
                      "
                      required
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <label htmlFor="newPassword" className="block text-gray-400 mb-1 text-sm">
                      Nuova Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      value={passwordChange.newPassword}
                      onChange={handlePasswordChange}
                      className="
                        w-full bg-neutral-800 border border-neutral-700 
                        rounded-xl p-2 text-white 
                        focus:outline-none focus:ring-2 focus:ring-sky-500
                        transition-all duration-300
                      "
                      minLength={8}
                      required
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="sm:col-span-2"
                  >
                    <label htmlFor="confirmNewPassword" className="block text-gray-400 mb-1 text-sm">
                      Conferma Nuova Password
                    </label>
                    <input
                      id="confirmNewPassword"
                      type="password"
                      name="confirmNewPassword"
                      value={passwordChange.confirmNewPassword}
                      onChange={handlePasswordChange}
                      className="
                        w-full bg-neutral-800 border border-neutral-700 
                        rounded-xl p-2 text-white 
                        focus:outline-none focus:ring-2 focus:ring-sky-500
                        transition-all duration-300
                      "
                      minLength={8}
                      required
                    />
                  </motion.div>

                  <div className="sm:col-span-2 text-center flex justify-center space-x-4">
                    <motion.button 
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="
                        bg-green-500 text-white 
                        px-4 py-2 rounded-xl 
                        flex items-center space-x-2
                        hover:bg-green-600 
                        transition-colors
                      "
                    >
                      <Save className="w-5 h-5 mr-2" />
                      Salva Nuova Password
                    </motion.button>
                    <motion.button 
                      type="button" 
                      onClick={togglePasswordModifica}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="
                        bg-neutral-800 text-white
                        px-4 py-2 rounded-xl 
                  flex items-center space-x-2
                  hover:bg-neutral-700 
                  transition-colors
                "
                >
                  <X className="w-5 h-5 mr-2" />
                  Annulla
                </motion.button>
              </div>
            </div>
          ) : (
            <div>
            <div className="mt-6 flex items-center justify-center">
              <motion.button 
                type="button" 
                onClick={togglePasswordModifica}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  bg-sky-500 text-white 
                    px-4 py-2 rounded-xl 
                    flex items-center space-x-2
                    hover:bg-sky-600 
                    transition-colors
                  
                "
              >
                <Lock className="w-5 h-5 mr-2" />
                Cambia Password
              </motion.button>
              </div>
              <div className="flex justify-center">
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  bg-red-500 text-white 
                  px-4 py-2 rounded-xl 
                  flex items-center justify-center
                  hover:bg-red-600 
                  transition-colors
                  w-full
                  space-x-2
                  shadow-md
                  group
                  mt-2
                  
                "
                >
                <LogOut className="w-5 h-5 mr-2 group-hover:rotate-6 transition-transform" />
                Esci dall&apos; Account
              </motion.button>
              </div>
            </div>
          )}
        </form>
      </div>
    </CardContent>
  </Card>
</div>
  )
} 