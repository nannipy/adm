'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

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
  const [profilo, setProfilo] = useState<UserProfile | null>(null)
  const [modifica, setModifica] = useState(false)

  useEffect(() => {
    if (user) {
      // Tenta di caricare il profilo dal localStorage
      const savedProfile = localStorage.getItem(`userProfile_${user.id}`)
      if (savedProfile) {
        setProfilo(JSON.parse(savedProfile))
        console.log('Profilo caricato dal localStorage:', JSON.parse(savedProfile))
      } else {
        // Se non c'è un profilo salvato, inizializza con i dati dell'utente
        const profiloIniziale = {
          nome: user.firstName || '',
          cognome: user.lastName || '',
          email: user.emailAddresses[0]?.emailAddress || '',
          dataNascita: user.publicMetadata.birthday as string || '',
          peso: 75,
          altezza: 180
        }
        setProfilo(profiloIniziale)
        console.log('Profilo inizializzato:', profiloIniziale)
      }
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfilo(prev => {
      if (!prev) return null
      const updatedProfile = { ...prev, [name]: value }
      console.log('Campo modificato:', name, 'Nuovo valore:', value)
      console.log('Profilo aggiornato:', updatedProfile)
      return updatedProfile
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user && profilo) {
      localStorage.setItem(`userProfile_${user.id}`, JSON.stringify(profilo))
      console.log('Profilo salvato nel localStorage:', profilo)
    }
    setModifica(false)
  }

  const toggleModifica = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('Pulsante Modifica cliccato. Stato attuale di modifica:', modifica)
    setModifica(prevState => {
      const newState = !prevState
      console.log('Nuovo stato di modifica:', newState)
      return newState
    })
  }

  if (!user || user.id !== params.userId) {
    return <div className="text-center mt-10">Accesso non autorizzato</div>
  }

  if (!profilo) {
    return <div className="text-center mt-10">Caricamento...</div>
  }

  console.log('Rendering del componente. Stato di modifica:', modifica)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Profilo Utente</h1>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Avatar className="h-24 w-24 mr-4 text-black font-bold text-2xl">
            <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'Utente'} />
            <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold text-black">{profilo.nome} {profilo.cognome}</h2>
            <p className="text-gray-600">{profilo.email}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(profilo).map(([campo, valore]) => (
              <div key={campo}>
                <label htmlFor={campo} className="block text-gray-600 mb-1">
                  {campo.charAt(0).toUpperCase() + campo.slice(1)}:
                </label>
                <input
                  id={campo}
                  type={campo === 'dataNascita' ? 'date' : campo === 'peso' || campo === 'altezza' ? 'number' : 'text'}
                  name={campo}
                  value={valore}
                  onChange={handleChange}
                  className={`w-full border rounded p-2 ${modifica ? 'bg-white' : 'bg-gray-100'} text-black`}
                  disabled={!modifica}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            {modifica ? (
              <>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition-colors">
                  Salva
                </button>
                <button type="button" onClick={toggleModifica} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors">
                  Annulla
                </button>
              </>
            ) : (
              <button type="button" onClick={toggleModifica} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                Modifica
              </button>
            )}
          </div>
        </form>
      </div>
  
    </div>
  )
}