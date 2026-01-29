// src/server.js
import app from './app.js'
import { connectMongo } from './db/mongo.js'
import { initIndexes } from './db/initIndexes.js'

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await connectMongo()
    await initIndexes()

    // Start Express
    app.listen(PORT, () => {
      console.log(`🚀 API server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

startServer()
