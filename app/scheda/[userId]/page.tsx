"use client"

import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { motion } from 'framer-motion';


const tabs = [
  { id: "push", label: "PUSH" },
  { id: "pull", label: "PULL" },
  { id: "upper", label: "UPPER" },
];

interface Workout {
  esercizio: string;
  serie: number | string;
  rep: number | string;
  rest: string;
  note: string[];
}

const WorkoutScheda = () => {
  const [activeTab, setActiveTab] = useState("push")

  const workoutSections = {
    push: [
      {
        esercizio: "Lento avanti con manubri",
        serie: 3,
        rep: 8,
        rest: "2'-3'",
        note: [
          "mantieni gli avambracci perpendicolari",
          "Lavora con il braccio a 45° col busto"
        ]
      },
      {
        esercizio: "Alzate laterali",
        serie: 3,
        rep: 12,
        rest: "1'-1'30''",
        note: [
          "lavora con il braccio leggermente più avanti rispetto al busto"
        ]
      },
      {
        esercizio: "Spinte con manubri su panca a 30°",
        serie: 3,
        rep: 8,
        rest: "2'-3'",
        note: [
          "mantieni avambracci perpendicolari",
          "Gomiti a 45° col busto"
        ]
      },
      {
        esercizio: "Chest press",
        serie: 3,
        rep: "8/10",
        rest: "2'-3'",
        note: [
          "mantieni avambracci perpendicolari",
          "Posiziona l'impugnatura ad altezza capezzolo circa",
          "Braccio a 45° col busto"
        ]
      },
      {
        esercizio: "Croci ai cavi",
        serie: 2,
        rep: 12,
        rest: "1'-1'30''",
        note: [
          "puoi farle anche con i manubri"
        ]
      },
      {
        esercizio: "French press con manubri",
        serie: 3,
        rep: "8/10",
        rest: "1'-2'",
        note: [
          "mantieni i gomiti fermi"
        ]
      },
      {
        esercizio: "Push down al cavo alto con corda",
        serie: 3,
        rep: "10/12",
        rest: "1'-1'30''",
        note: [
          "mantieni i gomiti fermi"
        ]
      },
      {
        esercizio: "Sit up con peso",
        serie: 3,
        rep: 12,
        rest: "1'",
        note: []
      }
    ],
    pull: [
      {
        esercizio: "Lat machine",
        serie: 3,
        rep: "8/10",
        rest: "2'-3'",
        note: [
          "Mantieni una presa media poco più larga delle spalle",
          "mantieni sempre gli avambracci perpendicolari"
        ]
      },
      {
        esercizio: "Pulley",
        serie: 3,
        rep: "8/10",
        rest: "2'-3'",
        note: [
          "da eseguire con il triangolo",
          "Porta il triangolo ad altezza ombelico",
          "Non andare indietro con il busto nell'esecuzione"
        ]
      },
      {
        esercizio: "Pull down",
        serie: 3,
        rep: "10/12",
        rest: "1'-2'",
        note: [
          "mantieni l'apertura dei gomiti invariata per tutto l'allenamento",
          "Concentrati sull'avvicinare il braccio al busto",
          "Da eseguire con una corda (la più lunga che hai in palestra)"
        ]
      },
      {
        esercizio: "Panca scott con bilanciere",
        serie: 3,
        rep: "8/10",
        rest: "1'-1'30''",
        note: []
      },
      {
        esercizio: "Hammer curl su panca a 60°",
        serie: 3,
        rep: 10,
        rest: "1'-1'30''",
        note: []
      }
    ],
    upper: [
      {
        esercizio: "Spinte con manubri con panca a 15°",
        serie: 3,
        rep: 8,
        rest: "2'-3'",
        note: [
          "mantieni gli avambracci perpendicolari sempre",
          "Gomiti 45° col busto"
        ]
      },
      {
        esercizio: "Panca a 45° al multipower",
        serie: 3,
        rep: "8/10",
        rest: "2'-3'",
        note: [
          "mantieni gli avambracci perpendicolari sempre perpendicolari",
          "Gomiti a 45° col busto"
        ]
      },
      {
        esercizio: "Shoulder press",
        serie: 3,
        rep: "8/10",
        rest: "2'-3'",
        note: [
          "mantieni gli avambracci perpendicolari",
          "Lavora con il braccio a 45° col busto"
        ]
      },
      {
        esercizio: "Alzate laterali singole al cavo",
        serie: 3,
        rep: 12,
        rest: "1'",
        note: [
          "braccio leggermente avanti rispetto al busto",
          "Posiziona il cavo ad altezza del bacino"
        ]
      },
      {
        esercizio: "Rematore con manubri su panca a 30°",
        serie: 3,
        rep: 8,
        rest: "2'-3'",
        note: [
          "posizionati a pancia in giù sullo schienale a 30° con la testa che sporge",
          "Porta i gomiti verso l'alto e verso dietro con un angolo di 90° in contrazione"
        ]
      },
      {
        esercizio: "Alzate posteriori con panca a 30°",
        serie: 3,
        rep: 15,
        rest: "1'-1'30''",
        note: [
          "posizionati a pancia in giù sulla panca con la testa che sporge",
          "Cerca di non avvicinare le scapole nell'esecuzione"
        ]
      },
      {
        esercizio: "Leg raise appeso alla sbarra",
        serie: 3,
        rep: "Cedimento",
        rest: "1'",
        note: []
      }
    ]
  }

  const renderWorkoutTable = (workouts: Workout[]) => (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-white border-separate border-spacing-y-2">
        <thead className="bg-neutral-800 text-xs md:text-sm">
          <tr>
            <th className="p-2 text-left rounded-l-xl w-1/3 md:w-auto">Esercizio</th>
            <th className="p-2 text-center w-16">Serie</th>
            <th className="p-2 text-center w-16">Rep</th>
            <th className="p-2 text-center w-16">Rest</th>
            <th className="p-2 text-left rounded-r-xl w-1/3 md:w-auto">Note</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => (
            <tr 
              key={index} 
              className="bg-neutral-900 hover:bg-neutral-800/80 transition-colors duration-200 ease-in-out"
            >
              <td className="p-2 font-semibold text-sm md:text-base break-words">
                {workout.esercizio}
              </td>
              <td className="p-2 text-center text-xs md:text-sm">
                {workout.serie}
              </td>
              <td className="p-2 text-center text-xs md:text-sm">
                {workout.rep}
              </td>
              <td className="p-2 text-center text-xs md:text-sm">
                {workout.rest}
              </td>
              <td className="p-2 text-left">
                {workout.note.length > 0 && (
                  <ul className="text-xs md:text-sm space-y-1">
                    {workout.note.map((note, noteIndex) => (
                      <li key={noteIndex} className="list-disc list-inside">
                        {note}
                      </li>
                    ))}
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:px-20 xl:px-40">
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white mb-3 tracking-tight"
          >
            Scheda Allenamento
          </motion.h1>
        </CardHeader>
        
        <CardContent className='mt-4 mb-20 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8'>
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <div className="flex justify-center mx-20 md:mx-96 space-x-2 sm:space-x-4 mb-6 sm:mb-10 bg-neutral-800/60 rounded-2xl p-2 sm:p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center justify-center 
                    px-2 sm:px-3 py-2 text-xs sm:text-sm 
                    font-medium text-white 
                    outline-sky-400 transition 
                    focus-visible:outline-2
                    ${activeTab === tab.id ? 'text-black' : 'hover:text-white/60'}
                  `}
                  style={{WebkitTapHighlightColor: "transparent"}}
                >
                  {activeTab === tab.id && (
                    <motion.span
                      layoutId="bubble"
                      className="absolute inset-0 z-10 bg-white mix-blend-difference rounded-2xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {tab.label}
                </button>
              ))}
            </div>
            
            <TabsContent value="push">
              {renderWorkoutTable(workoutSections.push)}
            </TabsContent>
            
            <TabsContent value="pull">
              {renderWorkoutTable(workoutSections.pull)}
            </TabsContent>
            
            <TabsContent value="upper">
              {renderWorkoutTable(workoutSections.upper)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutScheda;