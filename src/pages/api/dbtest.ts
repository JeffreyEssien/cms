import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/utils/mongodb'

type SuccessResponse = {
  connected: boolean
  collections?: string[]
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse>
) {
  try {
    const { db } = await connectToDatabase()
    // Try to list collections as a test
    const collections = await db.listCollections().toArray()
    res.status(200).json({ connected: true, collections: collections.map(c => c.name) })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    res.status(500).json({ connected: false, error: errorMessage })
  }
} 