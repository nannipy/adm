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
import { workoutSections, Workout, tabs } from "@/components/workout"

interface Allenamento {
  id: string;
  data: Date;
  esercizi: Workout[];
  tipo: string;
}

interface WorkoutConfig {
  frequenzaAllenamenti: number; // Number of workouts per week
  distribuzioneGiorni: number[]; // Days of the week (0-6, where 0 is Monday)
  tipiAllenamenti: string[]; // Types of workouts to cycle through
}

export default function CalendarioAllenamenti({ params }: { params: { userId: string } }) {
  // State for workouts and calendar
  const [allenamenti, setAllenamenti] = useState<Allenamento[]>([]);
  const [settimanaCorrente, setSettimanaCorrente] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [giornoSelezionato, setGiornoSelezionato] = useState<Date>(new Date());

  // Workout configuration state
  const [workoutConfig, setWorkoutConfig] = useState<WorkoutConfig>({
    frequenzaAllenamenti: 3,
    distribuzioneGiorni: [1, 3, 5], // Default: Tuesday, Thursday, Saturday
    tipiAllenamenti: ["push", "pull", "upper"], // Default workout types to cycle through
  });

  // Modale per la configurazione degli allenamenti
  const [configDialogOpen, setConfigDialogOpen] = useState(false);

  // Genera gli allenamenti basati sulla configurazione
  useEffect(() => {
    const generaAllenamenti = () => {
      const allenamentiGenerati: Allenamento[] =
        workoutConfig.distribuzioneGiorni.map((giorno, index) => {
          // Cycle through workout types based on index
          const tipoAllenamento =
            workoutConfig.tipiAllenamenti[
              index % workoutConfig.tipiAllenamenti.length
            ];

          return {
            id: `workout-${index + 1}`,
            data: addDays(settimanaCorrente, giorno),
            esercizi:
              workoutSections[tipoAllenamento as keyof typeof workoutSections],
            tipo: tipoAllenamento,
          };
        });

      setAllenamenti(allenamentiGenerati);
    };

    generaAllenamenti();
  }, [settimanaCorrente, workoutConfig]);

  // Memoize week days
  const giorniSettimana = Array.from({ length: 7 }, (_, i) =>
    addDays(settimanaCorrente, i)
  );

  const settimanaPrec = () => setSettimanaCorrente((prev) => subWeeks(prev, 1));
  const settimanaSucc = () => setSettimanaCorrente((prev) => addWeeks(prev, 1));

  const selezionaGiorno = (giorno: Date) => {
    setGiornoSelezionato(giorno);
  };

  // Trova l'allenamento per il giorno selezionato
  const workoutPerGiornoSelezionato = allenamenti.find((a) =>
    isSameDay(a.data, giornoSelezionato)
  );

  // Aggiorna la configurazione degli allenamenti
  const aggiornaConfigurazioneAllenamenti = (
    nuovaConfig: Partial<WorkoutConfig>
  ) => {
    setWorkoutConfig((prev) => ({
      ...prev,
      ...nuovaConfig,
    }));
  };

  return (
    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white p-8 rounded-3xl mx-2 md:mx-auto md:max-w-2xl border-black "
          >
      {/* Intestazione con pulsante configurazione */}
      <div className="flex justify-between items-center mb-6 ">
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
            <Button
              variant="ghost"
              size="icon"
              className="bg-neutral-800/75 text-white rounded-2xl"
            >
              <Settings />
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-neutral-800 text-white rounded-3xl p-16 md:mx-auto md:max-w-2xl border-none">
            <DialogHeader >
              <DialogTitle className="text-white text-2xl ">
                Configura Allenamenti
              </DialogTitle>
            </DialogHeader>

            {/* Selezione frequenza allenamenti */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2 ">
                  Quanti giorni ti vuoi allenare a settimana?
                </label>
                <Select
                  value={workoutConfig.frequenzaAllenamenti.toString()}
                  onValueChange={(value) =>
                    aggiornaConfigurazioneAllenamenti({
                      frequenzaAllenamenti: parseInt(value),
                      // Resetta la distribuzione quando cambia la frequenza
                      distribuzioneGiorni: Array.from(
                        { length: parseInt(value) },
                        (_, i) => i 
                      ),
                    })
                  }
                >
                  <SelectTrigger className="bg-neutral-700 border-none ">
                    <SelectValue placeholder="Seleziona frequenza" />
                  </SelectTrigger>
                  <SelectContent className='bg-neutral-700 text-white border-none'>
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} allenament{num > 1 ? 'i' : 'o'} a settimana
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Selezione giorni di allenamento */}
                <label className="block mb-2 mt-3">Giorni di allenamento</label>
                <div className="grid grid-cols-7 gap-2">
                  {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map(
                    (day, index) => (
                      <Button
                        key={day}
                        variant={
                          workoutConfig.distribuzioneGiorni.includes(index)
                            ? "default"
                            : "default"
                        }
                        className={`${
                          workoutConfig.distribuzioneGiorni.includes(index)
                            ? "bg-blue-500 text-white"
                            : "bg-neutral-700 text-white hover:bg-neutral-600"
                        }`}
                        onClick={() => {
                          const nuovaDistribuzione =
                            workoutConfig.distribuzioneGiorni.includes(index)
                              ? workoutConfig.distribuzioneGiorni.filter(
                                  (d) => d !== index
                                )
                              : [
                                  ...workoutConfig.distribuzioneGiorni,
                                  index,
                                ].sort((a, b) => a - b);

                          // Limita ai giorni selezionati nella frequenza
                          if (
                            nuovaDistribuzione.length <=
                            workoutConfig.frequenzaAllenamenti
                          ) {
                            aggiornaConfigurazioneAllenamenti({
                              distribuzioneGiorni: nuovaDistribuzione,
                            });
                          }
                        }}
                      >
                        {day}
                      </Button>
                    )
                  )}
                </div>

                {/* Selezione tipi di allenamento */}
                <label className="block mb-2 mt-3">Tipi di Allenamento</label>
                <div className="flex gap-2">
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant={
                        workoutConfig.tipiAllenamenti.includes(tab.id)
                          ? "default"
                          : "default"
                      }
                      className={`${
                        workoutConfig.tipiAllenamenti.includes(tab.id)
                          ? "bg-blue-500 text-white"
                          : "bg-neutral-700 text-white hover:bg-neutral-600"
                      }`}
                      onClick={() => {
                        const nuoviTipi =
                          workoutConfig.tipiAllenamenti.includes(tab.id)
                            ? workoutConfig.tipiAllenamenti.filter(
                                (t) => t !== tab.id
                              )
                            : [...workoutConfig.tipiAllenamenti, tab.id];

                        // Assicura che ci siano almeno 3 tipi di allenamento
                        if (nuoviTipi.length > 0) {
                          aggiornaConfigurazioneAllenamenti({
                            tipiAllenamenti: nuoviTipi,
                          });
                        }
                      }}
                    >
                      {tab.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

      </div>

      <div className="flex justify-between items-center bg-neutral-800/50 p-0 text-white rounded-t-3xl -mx-8 ">
        <Button
          onClick={settimanaPrec}
          className="bg-neutral-800/75 rounded-2xl m-2"
          size="icon"
        >
          <ChevronLeft />
        </Button>
        <span className="font-semibold text-lg">
          {format(settimanaCorrente, "MMMM yyyy", { locale: it })}
        </span>
        <Button
          onClick={settimanaSucc}
          className="bg-neutral-800/75 rounded-2xl m-2"
          size="icon"
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4 bg-neutral-800/50 p-6 text-white rounded-b-3xl -mx-8">
        {giorniSettimana.map((giorno) => (
          <motion.div
            key={giorno.toISOString()}
            whileHover={{ scale: 1.05 }}
            className={`rounded-3xl p-2 text-center cursor-pointer ${
              isSameDay(giorno, giornoSelezionato)
                ? "bg-blue-500 text-white"
                : "bg-black text-white"
            }`}
            onClick={() => selezionaGiorno(giorno)}
          >
            <div className="text-sm">
              {format(giorno, "EEE", { locale: it })}
            </div>
            <div className="font-bold text-lg">{format(giorno, "d")}</div>
            {allenamenti.some((a) => isSameDay(a.data, giorno)) && (
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
            {workoutPerGiornoSelezionato && (
              <Link
                href={`/workout/${params.userId}/${workoutPerGiornoSelezionato.id}`}
                className="block"
              >
                <Card
                  className="
                  rounded-2xl 
                  bg-neutral-800/50
                  text-white 
                  border-0 
                  shadow-lg 
                  mx-3 
                  sm:mx-4 
                  md:mx-auto 
                  md:max-w-2xl 
                  transition-all 
                  duration-300 
                  hover:scale-[1.02] 
                  hover:shadow-xl
                  mb-20
                  "
                >
                  <CardHeader className="pb-2 ">
                    <div className="flex items-center justify-between">
                      <h3
                        className="
                        text-2xl 
                        md:text-3xl 
                        font-bold 
                        tracking-tight 
                        bg-clip-text 
                        text-transparent 
                        bg-gradient-to-r 
                        from-white 
                        to-neutral-300
                        
                      "
                      >
                        {workoutPerGiornoSelezionato.tipo.toUpperCase()} WORKOUT
                      </h3>
                      <div className="text-sm text-neutral-400 opacity-75">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 inline-block mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Details
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul
                      className="
                        space-y-3 
                        bg-neutral-700/30 
                        p-4 
                        sm:p-5 
                        rounded-xl 
                        border 
                        border-neutral-700/50
                      ">
                      {workoutPerGiornoSelezionato.esercizi.map(
                        (esercizio, index) => (
                          <li
                            key={index}
                            className="
                            flex 
                            items-center 
                            justify-between 
                            text-white 
                            text-base 
                            sm:text-lg 
                            py-2 
                            border-b 
                            border-neutral-700/50 
                            last:border-b-0
                            hover:bg-neutral-700/20 
                            px-2 
                            rounded-lg 
                            transition-colors 
                            duration-200
                            "
                          >
                            <div className="flex-grow p-1">
                              <span className="font-small w-1/2 block">
                                {esercizio.esercizio}
                              </span>
                            </div>
                            <div
                              className="
                              text-sm 
                              text-neutral-300 
                              bg-neutral-800/50 
                              px-2 
                              py-1 
                              rounded-full
                              w-1/3
                              text-right
                              "
                              >
                              {esercizio.serie} × {esercizio.rep}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}