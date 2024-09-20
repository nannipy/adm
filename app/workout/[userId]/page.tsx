'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'


export default function UserWorkout({ params }: { params: { userId: string } }) {
  const { user } = useUser()
  const [exercises, setExercises] = useState<Exercise[]>([])

  useEffect(() => {
    // Implementa la logica per recuperare gli esercizi dell'utente dal database
  }, [params.userId])

  if (user?.id !== params.userId) {
    return <div>Accesso non autorizzato</div>
  }

  return (
    <div>
      <h1>Il tuo allenamento</h1>
      {exercises.map((exercise) => (
        <div key={exercise.id}>
          <h2>{exercise.dayOfWeek}: {exercise.workoutType}</h2>
          <h3>{exercise.name}</h3>
          <p>{exercise.description}</p>
          <video src={exercise.videoUrl} controls />
          <p>Serie: {exercise.sets}, Ripetizioni: {exercise.reps}, Riposo: {exercise.restSeconds}s</p>
        </div>
      ))}
    </div>
  )
}