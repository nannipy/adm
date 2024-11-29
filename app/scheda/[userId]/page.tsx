"use client"

import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from 'framer-motion';


let tabs = [
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
    <table className="w-full text-white  ">
      <thead className="bg-neutral-800 text-sm ">
        <tr className=''>
          <th className="p-2 text-left rounded-l-xl">Esercizio</th>
          <th className="p-2 text-center">Serie</th>
          <th className="p-2 text-center">Rep</th>
          <th className="p-2 text-center">Rest</th>
          <th className="p-2 text-left rounded-r-xl ">Note</th>
        </tr>
      </thead>
      <tbody>
        {workouts.map((workout, index) => (
          <tr key={index} className="text-sm rounded-3xl justify-between items-center text-white p-4 ">
            <td className="p-2 font-semibold">{workout.esercizio}</td>
            <td className="p-2 text-center">{workout.serie}</td>
            <td className="p-2 text-center">{workout.rep}</td>
            <td className="p-2 text-center">{workout.rest}</td>
            <td className="p-2 text-left ">
              {workout.note.length > 0 && (
                <ul className="text-sm overflow-hidden">
                  {workout.note.map((note, noteIndex) => (
                    <p key={noteIndex}>{note}</p>
                  ))}
                </ul>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div className=" min-h-screen p-4 md:p-8 mb-16 md:mx-60">       

      <Card className="bg-inherit  border-transparent ">
        <CardHeader className="text-center">
          <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-5xl font-extrabold text-center text-white mb-3 tracking-tight"
            >
              Scheda
            </motion.h1>
        </CardHeader>
        <CardContent className='mt-4 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-8' >
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full "
          >
          <div className="flex space-x-1 mb-10 justify-center gap-10 bg-neutral-800/60 rounded-2xl  p-4 ">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id ? "" : "hover:text-white/60 "
                } relative flex items-center justify-center  px-3 py-3 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
                style={{WebkitTapHighlightColor: "transparent",}}
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
  )
}

export default WorkoutScheda