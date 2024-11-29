'use client'

import { useState, useEffect } from 'react'
import { format, startOfWeek, addDays, isSameDay, subWeeks, addWeeks } from 'date-fns'
import { it } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import { getDietaGiornaliera, } from '@/components/dieta'


interface Allenamento {
  id: string;
  data: Date;
  esercizi: string[];
}

interface Macros {
  proteine: number;
  carboidrati: number;
  grassi: number;
}

interface Pasto {
  nome: string;
  calorie: number;
  ricetta: string;
  macros: Macros;
  alternative: string[];
}

interface DietaGiornaliera {
  colazione: Pasto;
  pranzo: Pasto;
  cena: Pasto;
}



export default function CalendarioAllenamenti({ params }: { params: { userId: string } }) {
  const [allenamenti, setAllenamenti] = useState<Allenamento[]>([])
  const [dieta, setDieta] =  useState<DietaGiornaliera>(getDietaGiornaliera())
  const [settimanaCorrente, setSettimanaCorrente] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [giornoSelezionato, setGiornoSelezionato] = useState<Date>(new Date())

  useEffect(() => {
    // Qui dovresti recuperare gli allenamenti dell'utente dal tuo backend
    const allenamentiEsempio: Allenamento[] = [
      { id: '1', data: addDays(settimanaCorrente, 1), esercizi: ['Panca piana', 'Squat'] },
      { id: '2', data: addDays(settimanaCorrente, 3), esercizi: ['Stacchi', 'Pull-up'] },
      { id: '3', data: addDays(settimanaCorrente, 5), esercizi: ['Shoulder press', 'Affondi', 'Bench press', 'Deadlift', 'Pull-over', 'Dip', 'Panca piana'] },
    ]
    setAllenamenti(allenamentiEsempio)

    // Qui dovresti recuperare la dieta dell'utente dal tuo backend
    const DietaGiornalieraEsempio: DietaGiornaliera = getDietaGiornaliera()
    setDieta(DietaGiornalieraEsempio)
  }, [settimanaCorrente])
  const giorniSettimana = Array.from({ length: 7 }, (_, i) => addDays(settimanaCorrente, i))

  const settimanaPrec = () => setSettimanaCorrente(prev => subWeeks(prev, 1))
  const settimanaSucc = () => setSettimanaCorrente(prev => addWeeks(prev, 1))

  const selezionaGiorno = (giorno: Date) => {
    setGiornoSelezionato(giorno)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-white p-8 rounded-3xl mx-2 md:mx-auto md:max-w-2xl border-black "
    >
      <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-extrabold text-center text-white mb-6 tracking-tight"
          >
            Calendario
          </motion.h1>
      
      <div className="flex justify-between items-center bg-neutral-800/50 p-8 text-white rounded-t-3xl -mx-8 ">
        <Button onClick={settimanaPrec} className='bg-neutral-800/75 rounded-2xl' size="icon"><ChevronLeft /></Button>
        <span className="font-semibold text-lg">{format(settimanaCorrente, 'MMMM yyyy', { locale: it })}</span>
        <Button onClick={settimanaSucc}  className='bg-neutral-800/75 rounded-2xl' size="icon"><ChevronRight /></Button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6 bg-neutral-800/50 p-6 text-white rounded-b-3xl -mx-8">
        {giorniSettimana.map((giorno, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            className={` rounded-3xl p-2 text-center cursor-pointer ${isSameDay(giorno, giornoSelezionato) ? 'bg-blue-500 text-white' : 'bg-black text-white'}`}
            onClick={() => selezionaGiorno(giorno)}
          >
            <div className="text-sm">{format(giorno, 'EEE', { locale: it })}</div>
            <div className="font-bold text-lg">{format(giorno, 'd')}</div>
            {allenamenti.find(a => isSameDay(a.data, giorno)) && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-red-500 w-3 h-3 rounded-full mx-auto mt-1"
              />
            )}
          </motion.div>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        {giornoSelezionato && (
          <motion.div
            key={giornoSelezionato.toISOString()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className=" -mx-8"
          >
            <h2 className="text-2xl font-bold mb-4 px-2 text-center ">{format(giornoSelezionato, 'EEEE d MMMM', { locale: it })}</h2>
            
           

            {allenamenti.find(a => isSameDay(a.data, giornoSelezionato)) && (
              <Link href={`/workout/${params.userId}/${allenamenti.find(a => isSameDay(a.data, giornoSelezionato))?.id}`}>
              <Card className="mb-2 rounded-3xl bg-neutral-800/50 text-white border-black mx-2 md:mx-auto md:max-w-2xl">
                <CardHeader>
                  <h3 className="text-3xl font-semibold">Allenamento del Giorno</h3>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 bg-neutral-700/50 p-6 rounded-3xl">
                    {allenamenti.find(a => isSameDay(a.data, giornoSelezionato))?.esercizi.map((esercizio, index) => (
                      <p key={index} className="text-white text-xl mx-4">{esercizio}</p>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              </Link>
            )}

            {dieta && 
              <Card className="mb-32 rounded-3xl bg-neutral-800/50 text-white mx-2 md:mx-auto md:max-w-2xl border-black ">
                <CardHeader>
                  <h3 className="text-xl font-semibold mx-4 "> 🍔 Dieta del Giorno</h3>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 bg-neutral-700/50 p-6 rounded-3xl">
                    <h4 className="font-semibold ">🌅 Colazione - <span className="text-white">{dieta.colazione.calorie} kcal</span></h4>
                    <p className="font-medium text-white">{dieta.colazione.nome}</p>
                    <p className="text-sm mt-1 text-white">{dieta.colazione.ricetta}</p>
                    <div className="flex justify-left space-x-4 mt-2 ">
                      <span className="text-sm px-2 py-1 bg-red-200 text-red-800 rounded-full font-semibold">P: {dieta.colazione.macros.proteine}g</span>
                      <span className="text-sm px-2 py-1 bg-blue-200 text-blue-800 rounded-full font-semibold">C: {dieta.colazione.macros.carboidrati}g</span>
                      <span className="text-sm px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full font-semibold">G: {dieta.colazione.macros.grassi}g</span>
                    </div>
                    <p className="text-sm mt-2 text-white">Alternative: {dieta.colazione.alternative.join(", ")}</p>
                  </div>
                  <div className="mb-4 bg-neutral-700/50 p-6 rounded-3xl ">
                    <h4 className="font-semibold">🌞 Pranzo - <span className="text-white">{dieta.pranzo.calorie} kcal</span></h4>
                    <p className="font-medium text-white">{dieta.pranzo.nome}</p>
                    <p className="text-sm mt-1 text-white">{dieta.pranzo.ricetta}</p>
                    <div className="flex justify-left space-x-4 mt-2">
                      <span className="text-sm px-2 py-1 bg-red-200 text-red-800 rounded-full font-semibold">P: {dieta.pranzo.macros.proteine}g</span>
                      <span className="text-sm px-2 py-1 bg-blue-200 text-blue-800 rounded-full font-semibold">C: {dieta.pranzo.macros.carboidrati}g</span>
                      <span className="text-sm px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full font-semibold">G: {dieta.pranzo.macros.grassi}g</span>
                    </div>
                    <p className="text-sm mt-2 text-white">Alternative: {dieta.pranzo.alternative.join(", ")}</p>
                  </div>
                  <div className='mb-4 bg-neutral-700/50 p-6 rounded-3xl'>
                    <h4 className="font-semibold">🌙 Cena - <span className="text-white">{dieta.cena.calorie} kcal</span></h4>
                    <p className="font-medium text-white">{dieta.cena.nome}</p>
                    <p className="text-sm mt-1 text-white">{dieta.cena.ricetta}</p>
                    <div className="flex justify-left space-x-4 mt-2">
                      <span className="text-sm px-2 py-1 bg-red-200 text-red-800 rounded-full font-semibold">P: {dieta.cena.macros.proteine}g</span>
                      <span className="text-sm px-2 py-1 bg-blue-200 text-blue-800 rounded-full font-semibold">C: {dieta.cena.macros.carboidrati}g</span>
                      <span className="text-sm px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full font-semibold">G: {dieta.cena.macros.grassi}g</span>
                    </div>
                    <p className="text-sm mt-2 text-white">Alternative: {dieta.cena.alternative.join(", ")}</p>
                  </div>
                  
                  
                  <div className="mt-3  justify-left space-x-4 mb-4 bg-neutral-700/50 p-6 rounded-3xl">
                    <p className="text-md font-bold  mb-4 ">Totale calorie giornaliere: <span className="text-yellow-400">{dieta.colazione.calorie + dieta.pranzo.calorie + dieta.cena.calorie} kcal</span> 🔥</p>
                    
                    <span className="text-md font-semibold px-3 py-1 bg-red-200 text-red-800 rounded-full">P: {dieta.colazione.macros.proteine + dieta.pranzo.macros.proteine + dieta.cena.macros.proteine}g</span>
                    <span className="text-md font-semibold px-3 py-1 bg-blue-200 text-blue-800 rounded-full">C: {dieta.colazione.macros.carboidrati + dieta.pranzo.macros.carboidrati + dieta.cena.macros.carboidrati}g</span>
                    <span className="text-md font-semibold px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full">G: {dieta.colazione.macros.grassi + dieta.pranzo.macros.grassi + dieta.cena.macros.grassi}g</span>
                  </div>
                </CardContent>
              </Card>
            }
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}