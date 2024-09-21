'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Link from 'next/link'

interface Esercizio {
  nome: string;
  serie: number;
  ripetizioni: number;
  recupero: string;
  intensita: string;
  descrizione: string;
  erroriComuni: string[];
  videoUrl: string;
}

interface Allenamento {
  id: string;
  data: Date;
  esercizi: Esercizio[];
}

export default function SchedaAllenamento({ params }: { params: { userId: string, allenamentoID: string } }) {
  const [allenamento, setAllenamento] = useState<Allenamento | null>(null)
  const [esercizioAperto, setEsercizioAperto] = useState<number | null>(null)

  useEffect(() => {
    // Qui dovresti recuperare i dettagli dell'allenamento dal tuo backend
    const allenamentoEsempio: Allenamento = {
      id: params.allenamentoID,
      data: new Date(),
      esercizi: [
        {
          nome: "Squat",
          serie: 4,
          ripetizioni: 8,
          recupero: "2 minuti",
          intensita: "80%",
          descrizione: "Lo squat è un esercizio fondamentale per lo sviluppo della forza nelle gambe. Mantieni la schiena dritta, i piedi alla larghezza delle spalle e scendi fino a quando le cosce sono parallele al pavimento.",
          erroriComuni: ["Piegare la schiena", "Non scendere abbastanza", "Sollevare i talloni"],
          videoUrl: "https://www.youtube.com/embed/ultWZbUMPL8"
        },
        {
          nome: "Panca piana",
          serie: 3,
          ripetizioni: 10,
          recupero: "90 secondi",
          intensita: "75%",
          descrizione: "La panca piana è ottima per sviluppare i pettorali. Mantieni i piedi ben piantati a terra e le scapole retratte. Abbassa il bilanciere fino al petto e poi spingi verso l'alto.",
          erroriComuni: ["Rimbalzare il bilanciere sul petto", "Arcuare eccessivamente la schiena", "Non bloccare le braccia in alto"],
          videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg"
        },
        // ... Altri esercizi con descrizioni simili ...
      ]
    }
    setAllenamento(allenamentoEsempio)
  }, [params.allenamentoID])

  if (!allenamento) {
    return <div className="text-center mt-10 text-xl">Caricamento...</div>
  }

  const toggleEsercizio = (index: number) => {
    setEsercizioAperto(esercizioAperto === index ? null : index)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-gray-900 w-[calc(100%-2px)] mx-auto "
    >
      <Link href={`/workout/${params.userId}`}>
        <Button variant="outline" size="icon" className="mb-4 rounded-full bg-white text-black">
          <ChevronLeft />
        </Button>
      </Link>

      <h1 className="text-4xl font-bold mb-8 text-center text-white">Scheda Allenamento</h1>
      
      <Card className="mb-8 bg-gray-50 text-gray-800 rounded-3xl overflow-hidden shadow-lg ">
        <CardHeader className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800">
          <h2 className="text-3xl font-semibold">
            Allenamento del {allenamento.data.toLocaleDateString()}
          </h2>
        </CardHeader>
        <CardContent className="p-4 sm:p-8">
          <ul className="space-y-4 sm:space-y-8">
            <AnimatePresence>
              {allenamento.esercizi.map((esercizio, index) => (
                <motion.li 
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-4 sm:p-6 shadow-md"
                >
                  <div 
                    className="flex justify-between items-center cursor-pointer" 
                    onClick={() => toggleEsercizio(index)}
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">{esercizio.nome}</h3>
                    <motion.div
                      animate={{ rotate: esercizioAperto === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={24} />
                    </motion.div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-4 text-base sm:text-lg">
                    <p><span className="font-medium">Serie:</span> {esercizio.serie}</p>
                    <p><span className="font-medium">Ripetizioni:</span> {esercizio.ripetizioni}</p>
                    <p><span className="font-medium">Recupero:</span> {esercizio.recupero}</p>
                    <p><span className="font-medium">Intensità:</span> {esercizio.intensita}</p>
                  </div>
                  <AnimatePresence>
                    {esercizioAperto === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 sm:mt-6 bg-gray-100 rounded-xl p-4 sm:p-6 shadow-inner"
                      >
                        <p className="mb-4 sm:mb-6 text-gray-700 text-base sm:text-lg">{esercizio.descrizione}</p>
                        <h4 className="font-semibold mt-4 text-lg sm:text-xl text-gray-800">Errori comuni:</h4>
                        <ul className="list-disc list-inside text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                          {esercizio.erroriComuni.map((errore, errIndex) => (
                            <li key={errIndex}>{errore}</li>
                          ))}
                        </ul>
                        <div className="mt-4 sm:mt-6 rounded-xl overflow-hidden">
                          <iframe 
                            width="100%" 
                            height="315" 
                            src={esercizio.videoUrl} 
                            title={`Video tutorial per ${esercizio.nome}`}
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
