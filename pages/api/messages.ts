import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri as string)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await client.connect()
    const database = client.db('adm_database')
    const messages = database.collection('messages')

    switch (req.method) {
      case 'GET':
        const userMessages = await messages.find({
          $or: [{ senderId: req.query.userId }, { receiverId: req.query.userId }]
        }).toArray()
        res.status(200).json(userMessages)
        break
      case 'POST':
        const newMessage = req.body
        const result = await messages.insertOne(newMessage)
        res.status(201).json(result)
        break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('Errore nel database:', error)
    res.status(500).json({ error: 'Errore del server' })
  } finally {
    await client.close()
  }
}