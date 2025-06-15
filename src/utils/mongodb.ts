import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI as string
if (!uri) throw new Error('Please add your MongoDB URI to .env.local as MONGODB_URI')

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so the value is preserved across module reloads
  if (!(global as { _mongoClientPromise?: Promise<MongoClient> })._mongoClientPromise) {
    client = new MongoClient(uri)
    ;(global as { _mongoClientPromise?: Promise<MongoClient> })._mongoClientPromise = client.connect()
  }
  clientPromise = (global as { _mongoClientPromise?: Promise<MongoClient> })._mongoClientPromise!
} else {
  // In production, create a new client for every connection
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise
  return client.db()
}

export async function connectToDatabase(): Promise<{ db: Db }> {
  const db = await getDb()
  return { db }
}

export default clientPromise 