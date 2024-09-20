import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await client.connect()
    const database = client.db('adm_database')
    const exercises = database.collection('exercises')

    switch (req.method) {
      case 'GET':
        const userExercises = await exercises.find({ userId: req.query.userId }).toArray()
        res.status(200).json(userExercises)
        break
      case 'POST':
        const newExercise = req.body
        const result = await exercises.insertOne(newExercise)
        res.status(201).json(result)
        break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    res.status(500).json({ error: 'Errore del server' })
  } finally {
    await client.close()
  }
}