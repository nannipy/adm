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
      setProfilo({
        nome: user.firstName || '',  
        cognome: user.lastName || '',
        email: user.emailAddresses[0]?.emailAddress || '',
        dataNascita: user.publicMetadata.birthday as string || '',
        peso: 75,
        altezza: 180
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfilo(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profilo aggiornato:', profilo)
    setModifica(false)
  }

  const toggleModifica = () => {
    setModifica(prev => !prev)
  }

  if (!user || user.id !== params.userId) {
    return <div className="text-center mt-10">Accesso non autorizzato</div>
  }

  if (!profilo) {
    return <div className="text-center mt-10">Caricamento...</div>
  }

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
                <p className="text-gray-600">{campo.charAt(0).toUpperCase() + campo.slice(1)}:</p>
                {modifica ? (
                  <input
                    type={campo === 'dataNascita' ? 'date' : campo === 'peso' || campo === 'altezza' ? 'number' : 'text'}
                    name={campo}
                    value={valore}
                    onChange={handleChange}
                    className="w-full border rounded p-1 text-black"
                  />
                ) : (
                  <p className="font-semibold text-black">
                    {valore}
                    {campo === 'peso' ? ' kg' : campo === 'altezza' ? ' cm' : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            {modifica ? (
              <>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Salva</button>
                <button type="button" onClick={toggleModifica} className="bg-gray-300 text-black px-4 py-2 rounded">Annulla</button>
              </>
            ) : (
              <button type="button" onClick={toggleModifica} className="bg-green-500 text-white px-4 py-2 rounded">Modifica</button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
