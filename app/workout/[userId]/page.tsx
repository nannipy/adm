'use client'

import { useState, useEffect } from 'react'
import { format, startOfWeek, addDays, isSameDay, subWeeks, addWeeks } from 'date-fns'
import { it } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'

// Interfaces for workout configuration and tracking
interface Allenamento {
  id: string;
  data: Date;
  esercizi: string[];
}

interface WorkoutConfig {
  frequenzaAllenamenti: number; // Number of workouts per week
  distribuzioneGiorni: number[]; // Days of the week (0-6, where 0 is Monday)
}

export default function CalendarioAllenamenti({ params }: { params: { userId: string } }) {
  // State for workouts and calendar
  const [allenamenti, setAllenamenti] = useState<Allenamento[]>([])
  const [settimanaCorrente, setSettimanaCorrente] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [giornoSelezionato, setGiornoSelezionato] = useState<Date>(new Date())

  // Workout configuration state
  const [workoutConfig, setWorkoutConfig] = useState<WorkoutConfig>({
    frequenzaAllenamenti: 3,
    distribuzioneGiorni: [1, 3, 5] // Default: Tuesday, Thursday, Saturday
  })

  // Modale per la configurazione degli allenamenti
  const [configDialogOpen, setConfigDialogOpen] = useState(false)

  // Genera gli allenamenti basati sulla configurazione
  useEffect(() => {
    const generaAllenamenti = () => {
      const allenamentiGenerati: Allenamento[] = workoutConfig.distribuzioneGiorni.map((giorno, index) => ({
        id: `workout-${index + 1}`,
        data: addDays(settimanaCorrente, giorno),
        esercizi: generaEserciziCasuali()
      }))
      
      setAllenamenti(allenamentiGenerati)
    }

    generaAllenamenti()
  }, [settimanaCorrente, workoutConfig])

  // Funzione per generare esercizi casuali (da personalizzare)
  const generaEserciziCasuali = () => {
    const esercizi = [
      'Panca piana', 'Squat', 'Stacchi', 'Pull-up', 'Shoulder press', 
      'Affondi', 'Bench press', 'Deadlift', 'Pull-over', 'Dip'
    ]
    
    // Genera 3-5 esercizi casuali
    const numEsercizi = Math.floor(Math.random() * 3) + 3
    const eserciziSelezionati: string[] = []
    
    while (eserciziSelezionati.length < numEsercizi) {
      const esercizioCasuale = esercizi[Math.floor(Math.random() * esercizi.length)]
      if (!eserciziSelezionati.includes(esercizioCasuale)) {
        eserciziSelezionati.push(esercizioCasuale)
      }
    }
    
    return eserciziSelezionati
  }

  // Memoize week days
  const giorniSettimana = Array.from({ length: 7 }, (_, i) => addDays(settimanaCorrente, i))

  const settimanaPrec = () => setSettimanaCorrente(prev => subWeeks(prev, 1))
  const settimanaSucc = () => setSettimanaCorrente(prev => addWeeks(prev, 1))

  const selezionaGiorno = (giorno: Date) => {
    setGiornoSelezionato(giorno)
  }

  // Trova l'allenamento per il giorno selezionato
  const workoutPerGiornoSelezionato = allenamenti.find(a => isSameDay(a.data, giornoSelezionato))

  // Aggiorna la configurazione degli allenamenti
  const aggiornaConfigurazioneAllenamenti = (nuovaConfig: Partial<WorkoutConfig>) => {
    setWorkoutConfig(prev => ({
      ...prev,
      ...nuovaConfig
    }))
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-white p-8 rounded-3xl mx-2 md:mx-auto md:max-w-2xl border-black "
    >
      {/* Intestazione con pulsante configurazione */}
      <div className="flex justify-between items-center mb-6">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold text-white tracking-tight"
        >
          Calendario
        </motion.h1>
        
        {/* Pulsante configurazione allenamenti */}
        <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="bg-neutral-800/75 text-white rounded-2xl">
              <Settings />
            </Button>
          </DialogTrigger>
          
          <DialogContent className="bg-neutral-800 text-white rounded-3xl border-none p-8 mx-2 md:mx-auto md:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-2xl ">Configura Allenamenti</DialogTitle>
            </DialogHeader>
            
            {/* Selezione frequenza allenamenti */}
            <div className="space-y-2">
              <div>
                <label className="block mb-2">Quanti giorni ti vuoi allenare a settimana?</label>
                <Select 
                   
                  value={workoutConfig.frequenzaAllenamenti.toString()} 
                  onValueChange={(value) => aggiornaConfigurazioneAllenamenti({ 
                    frequenzaAllenamenti: parseInt(value),
                    // Resetta la distribuzione quando cambia la frequenza
                    distribuzioneGiorni: Array.from({ length: parseInt(value) }, (_, i) => (i + 1) * 2 - 1)
                  })}
                >
                  <SelectTrigger className="border-neutral-600 w-fit">
                    <SelectValue placeholder="Seleziona frequenza" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2, 3, 4, 5,6,7].map(num => (
                      <SelectItem  key={num} value={num.toString()}>
                        {num} allenamenti a settimana
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              

              {/* Selezione giorni di allenamento */}
              
                <label className="block mb-2 mt-3">Giorni di allenamento</label>
                <div className="grid grid-cols-7 gap-2">
                  {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((day, index) => (
                    <Button
                      key={day}
                      variant={workoutConfig.distribuzioneGiorni.includes(index) ? 'default' : 'outline'}
                      className={`${
                        workoutConfig.distribuzioneGiorni.includes(index) 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-neutral-700 text-white hover:bg-neutral-600'
                      }`}
                      onClick={() => {
                        const nuovaDistribuzione = workoutConfig.distribuzioneGiorni.includes(index)
                          ? workoutConfig.distribuzioneGiorni.filter(d => d !== index)
                          : [...workoutConfig.distribuzioneGiorni, index].sort((a, b) => a - b)
                        
                        // Limita ai giorni selezionati nella frequenza
                        if (nuovaDistribuzione.length <= workoutConfig.frequenzaAllenamenti) {
                          aggiornaConfigurazioneAllenamenti({ 
                            distribuzioneGiorni: nuovaDistribuzione 
                          })
                        }
                      }}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Resto del componente rimane invariato */}
      <div className="flex justify-between items-center bg-neutral-800/50 p-8 text-white rounded-t-3xl -mx-8 ">
        <Button onClick={settimanaPrec} className='bg-neutral-800/75 rounded-2xl' size="icon"><ChevronLeft /></Button>
        <span className="font-semibold text-lg">{format(settimanaCorrente, 'MMMM yyyy', { locale: it })}</span>
        <Button onClick={settimanaSucc}  className='bg-neutral-800/75 rounded-2xl' size="icon"><ChevronRight /></Button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6 bg-neutral-800/50 p-6 text-white rounded-b-3xl -mx-8">
        {giorniSettimana.map((giorno) => (
          <motion.div 
            key={giorno.toISOString()}
            whileHover={{ scale: 1.05 }}
            className={`rounded-3xl p-2 text-center cursor-pointer ${isSameDay(giorno, giornoSelezionato) ? 'bg-blue-500 text-white' : 'bg-black text-white'}`}
            onClick={() => selezionaGiorno(giorno)}
          >
            <div className="text-sm">{format(giorno, 'EEE', { locale: it })}</div>
            <div className="font-bold text-lg">{format(giorno, 'd')}</div>
            {allenamenti.some(a => isSameDay(a.data, giorno)) && (
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
            className="-mx-8"
          >
            <h2 className="text-2xl font-bold mb-4 px-2 text-center">
              {format(giornoSelezionato, 'EEEE d MMMM', { locale: it })}
            </h2>

            {workoutPerGiornoSelezionato && (
              <Link href={`/workout/${params.userId}/${workoutPerGiornoSelezionato.id}`}>
                <Card className="mb-2 rounded-3xl bg-neutral-800/50 text-white border-black mx-2 md:mx-auto md:max-w-2xl">
                  <CardHeader>
                    <h3 className="text-3xl font-semibold">Allenamento del Giorno</h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 bg-neutral-700/50 p-6 rounded-3xl">
                      {workoutPerGiornoSelezionato.esercizi.map((esercizio, index) => (
                        <p key={index} className="text-white text-xl mx-4">{esercizio}</p>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}