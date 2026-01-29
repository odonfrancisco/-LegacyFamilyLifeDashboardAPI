import { MongoClient } from 'mongodb'

import { log } from '../utils/logger.js'
import { env } from '../config/env.js'

const uri = env.prod ? env.mongodbURI : env.mongodbURILocal
const dbName = env.mongodbName

if (!uri) throw new Error('Missing MONGODB_URI')
if (!dbName) throw new Error('Missing MONGODB_DB_NAME')

let client
let db

export async function connectMongo() {
  if (db) return db

  client = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 1,
    retryWrites: true,
  })

  await client.connect()
  db = client.db(dbName)

  log('info', '🟢 MongoDB connected')

  return db
}

export function getDb() {
  if (!db) {
    throw new Error('MongoDB not connected. Call connectMongo() first.')
  }
  return db
}

export async function closeMongo() {
  if (client) {
    await client.close()
    client = null
    db = null
  }
}

process.on('SIGINT', async () => {
  log('info', '🔌 Closing MongoDB')
  await closeMongo()
  process.exit(0)
})
