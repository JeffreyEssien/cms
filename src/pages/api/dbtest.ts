import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/utils/mongodb'

type ErrorResponse = {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | ErrorResponse>
) {
  try {
    const { db } = await connectToDatabase()
    // Try to list collections as a test
    const collections = await db.listCollections().toArray()
    res.status(200).json({ connected: true, collections: collections.map(c => c.name) })
  } catch (error: any) {
    res.status(500).json({ connected: false, error: error.message })
  }
} 