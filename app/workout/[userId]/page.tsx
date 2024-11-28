'use client'

import { useState, useEffect } from 'react'
import { format, startOfWeek, addDays, isSameDay, subWeeks, addWeeks } from 'date-fns'
import { it } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Link from 'next/link'

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
  const [dieta, setDieta] = useState<DietaGiornaliera | null>(null)
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
    const dietaEsempio: DietaGiornaliera = {
      colazione: {
        nome: "Porridge con frutta",
        calorie: 350,
        ricetta: "Cuoci 50g di fiocchi d'avena in 250ml di latte, aggiungi una banana a fette e una manciata di mirtilli.",
        macros: { proteine: 15, carboidrati: 55, grassi: 10 },
        alternative: ["Yogurt greco con granola e frutta", "Frittata di albumi con spinaci e toast integrale"]
      },
      pranzo: {
        nome: "Insalata di pollo",
        calorie: 450,
        ricetta: "Mescola 150g di petto di pollo grigliato a cubetti con insalata mista, pomodorini, cetrioli e condisci con olio d'oliva e aceto balsamico.",
        macros: { proteine: 40, carboidrati: 15, grassi: 25 },
        alternative: ["Bowl di quinoa con verdure e tofu", "Wrap integrale con tacchino e avocado"]
      },
      cena: {
        nome: "Salmone con verdure",
        calorie: 400,
        ricetta: "Cuoci 150g di salmone al forno con broccoli e carote al vapore. Condisci con succo di limone e erbe aromatiche.",
        macros: { proteine: 35, carboidrati: 20, grassi: 22 },
        alternative: ["Zuppa di lenticchie con pane integrale", "Frittata di uova intere con asparagi e patate dolci"]
      }
    }
    setDieta(dietaEsempio)
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
      className="text-white min-h-screen p-4 rounded-full "
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Allenamenti e Dieta</h1>
      
      <div className="flex justify-between items-center bg-white text-black rounded-t-3xl p-4 -mx-8 ">
        <Button onClick={settimanaPrec} variant="outline" size="icon"><ChevronLeft /></Button>
        <span className="font-semibold text-lg">{format(settimanaCorrente, 'MMMM yyyy', { locale: it })}</span>
        <Button onClick={settimanaSucc} variant="outline" size="icon"><ChevronRight /></Button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6 bg-white text-black rounded-b-3xl p-4 -mx-8">
        {giorniSettimana.map((giorno, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`border rounded-3xl p-2 text-center cursor-pointer ${isSameDay(giorno, giornoSelezionato) ? 'bg-blue-500 text-white' : 'bg-black text-white'}`}
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
            <h2 className="text-2xl font-bold mb-4 px-4 text-center">{format(giornoSelezionato, 'EEEE d MMMM', { locale: it })}</h2>
            
           

            {allenamenti.find(a => isSameDay(a.data, giornoSelezionato)) && (
              <Link href={`/workout/${params.userId}/${allenamenti.find(a => isSameDay(a.data, giornoSelezionato))?.id}`}>
              <Card className="mb-2 rounded-3xl bg-white text-black mx-4">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Allenamento del Giorno</h3>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    {allenamenti.find(a => isSameDay(a.data, giornoSelezionato))?.esercizi.map((esercizio, index) => (
                      <li key={index} className="text-sm">{esercizio}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              </Link>
            )}

            {dieta && 
              <Card className="mb-32 rounded-3xl bg-white text-black mx-4 text-center  ">
                <CardHeader>
                  <h3 className="text-xl font-semibold "> 🍔 Dieta del Giorno</h3>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold">🌅 Colazione - <span className="text-green-500">{dieta.colazione.calorie} kcal</span></h4>
                    <p className="font-medium text-blue-600">{dieta.colazione.nome}</p>
                    <p className="text-sm mt-1 text-gray-600">{dieta.colazione.ricetta}</p>
                    <div className="flex justify-center space-x-4 mt-2 ">
                      <span className="text-sm px-2 py-1 bg-red-100 text-red-800 rounded-full">P: {dieta.colazione.macros.proteine}g</span>
                      <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">C: {dieta.colazione.macros.carboidrati}g</span>
                      <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">G: {dieta.colazione.macros.grassi}g</span>
                    </div>
                    <p className="text-sm mt-2 text-purple-600">Alternative: {dieta.colazione.alternative.join(", ")}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold">🌞 Pranzo - <span className="text-green-500">{dieta.pranzo.calorie} kcal</span></h4>
                    <p className="font-medium text-blue-600">{dieta.pranzo.nome}</p>
                    <p className="text-sm mt-1 text-gray-600">{dieta.pranzo.ricetta}</p>
                    <div className="flex justify-center space-x-4 mt-2">
                      <span className="text-sm px-2 py-1 bg-red-100 text-red-800 rounded-full">P: {dieta.pranzo.macros.proteine}g</span>
                      <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">C: {dieta.pranzo.macros.carboidrati}g</span>
                      <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">G: {dieta.pranzo.macros.grassi}g</span>
                    </div>
                    <p className="text-sm mt-2 text-purple-600">Alternative: {dieta.pranzo.alternative.join(", ")}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">🌙 Cena - <span className="text-green-500">{dieta.cena.calorie} kcal</span></h4>
                    <p className="font-medium text-blue-600">{dieta.cena.nome}</p>
                    <p className="text-sm mt-1 text-gray-600">{dieta.cena.ricetta}</p>
                    <div className="flex justify-center space-x-4 mt-2">
                      <span className="text-sm px-2 py-1 bg-red-100 text-red-800 rounded-full">P: {dieta.cena.macros.proteine}g</span>
                      <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">C: {dieta.cena.macros.carboidrati}g</span>
                      <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">G: {dieta.cena.macros.grassi}g</span>
                    </div>
                    <p className="text-sm mt-2 text-purple-600">Alternative: {dieta.cena.alternative.join(", ")}</p>
                  </div>
                  <p className="text-lg font-bold mt-6">Totale calorie giornaliere: <span className="text-yellow-400">{dieta.colazione.calorie + dieta.pranzo.calorie + dieta.cena.calorie} kcal</span> 🔥</p>
                  <div className="mt-3 flex justify-center space-x-4">
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