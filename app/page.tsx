'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">ADM Sport e Nutrizione</h1>
        <p className="text-xl mb-8">Trasforma il tuo corpo e la tua vita con il nostro coaching personalizzato</p>
        <Link href="/signup" className="bg-white text-black px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
          Inizia Ora
        </Link>
      </section>

      {/* Servizi */}
      <section className="py-4">
        <h2 className="text-3xl font-semibold text-center mb-12">I Nostri Servizi</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-center text-black">Coaching Sportivo</h3>
            <p className="text-center text-black">Programmi di allenamento su misura per raggiungere i tuoi obiettivi fitness.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-center text-black">Consulenza Nutrizionale</h3>
            <p className="text-center text-black">Piani alimentari personalizzati per ottimizzare la tua salute e le tue prestazioni.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-center text-black">Chat con il Coach</h3>
            <p className="text-center text-black">Comunicazione diretta con il tuo coach personale.</p>
            <div className="text-center mt-4">
              <Link href="/chat" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-300">
                Vai alla Chat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ... resto del codice rimane invariato ... */}
    </div>
  )
}