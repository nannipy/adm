"use client"

import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { motion } from 'framer-motion';
import { Workout, tabs, workoutSections } from '@/components/workout';
import { Timer, Repeat } from 'lucide-react';

const renderWorkoutTable = (workouts: Workout[]) => (
  <div className="w-full overflow-x-auto">
    <div className="space-y-2">
      {workouts.map((workout, index) => (
        <div 
          key={index} 
          className="bg-neutral-900 rounded-xl p-3 shadow-lg hover:bg-neutral-800/90 transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm md:text-base text-white">
                {workout.esercizio}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Repeat className="text-green-400 w-4 h-4" />
                <span className="text-xs text-gray-300">{workout.serie}</span>
              </div>
              <div className="flex items-center space-x-1">
                <p className="text-xs text-gray-300"> Reps: </p>
                <span className="text-xs text-gray-300">{workout.rep}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Timer className="text-purple-400 w-4 h-4" />
                <span className="text-xs text-gray-300">{workout.rest}</span>
              </div>
            </div>
          </div>
          {workout.note.length > 0 && (
            <div className="pl-7 mt-1 border-t border-neutral-700 pt-1">
              <ul className="text-xs text-gray-400 space-y-1">
                {workout.note.map((note, noteIndex) => (
                  <li key={noteIndex} className="flex items-start space-x-2">
                    <span className="text-xs text-neutral-500">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const WorkoutScheda = () => {
  const [activeTab, setActiveTab] = useState("push")

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
                    ${activeTab === tab.id ? 'text-black' : 'hover:text-gray-400'}
                  `}
                  style={{WebkitTapHighlightColor: "transparent"}}
                >
                  {activeTab === tab.id && (
                    <motion.span
                      layoutId="bubble"
                      className="absolute inset-0 z-10 bg-white mix-blend-difference rounded-xl"
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