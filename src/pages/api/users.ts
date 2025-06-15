import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'

type User = {
  fullName: string
  email: string
  password: string
  referralCode?: string
  createdAt: Date
}

type ApiResponse<T = unknown> = {
  success: boolean
  error?: string
  user?: T
  id?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection<User>('users')

    if (req.method === 'POST') {
      // Signup: create a new user
      try {
        const { fullName, email, password, referralCode } = req.body
        if (!fullName || !email || !password) {
          return res.status(400).json({ success: false, error: 'Missing required fields' })
        }
        // Check if user already exists
        const existing = await collection.findOne({ email })
        if (existing) {
          return res.status(409).json({ success: false, error: 'User already exists' })
        }
        const result = await collection.insertOne({ 
          fullName,
          email,
          password,
          referralCode,
          createdAt: new Date()
        })
        res.status(201).json({ success: true, id: result.insertedId.toString() })
      } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).json({ success: false, error: 'Failed to create user' })
      }
    } else if (req.method === 'GET') {
      // Login: validate user
      try {
        const { email, password } = req.query
        if (!email || !password) {
          return res.status(400).json({ success: false, error: 'Missing email or password' })
        }
        const user = await collection.findOne({ email, password })
        if (user) {
          res.status(200).json({ 
            success: true, 
            user: { 
              fullName: user.fullName, 
              email: user.email,
              referralCode: user.referralCode 
            } 
          })
        } else {
          res.status(401).json({ success: false, error: 'Invalid credentials' })
        }
      } catch (error) {
        console.error('Error validating user:', error)
        res.status(500).json({ success: false, error: 'Failed to validate user' })
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('Database connection error:', error)
    res.status(500).json({ success: false, error: 'Database connection failed' })
  }
} 