import { connectMongo } from '../db/mongo.js'
import { agentDataCollection } from '../db/collections.js'

const BATCH_SIZE = 1000

function toAgentId(name) {
  return name.toLowerCase().replace(/\s+/g, '_')
}

async function run() {
  await connectMongo()

  const cursor = agentDataCollection().find({ agentId: { $exists: false } })

  let count = 0
  let bulkOps = []

  for await (const doc of cursor) {
    const agentId = toAgentId(doc.agentName)

    // await agentDataCollection().updateOne({ _id: doc._id }, { $set: { agentId } })
    bulkOps.push({
      updateOne: {
        filter: { _id: doc._id },
        update: {
          $set: { agentId },
        },
      },
    })

    count++
    if (bulkOps.length === BATCH_SIZE) {
      await agentDataCollection().bulkWrite(bulkOps, { ordered: false })
      bulkOps = []
    }
  }

  if (bulkOps.length > 0) {
    await agentDataCollection().bulkWrite(bulkOps, { ordered: false })
  }

  console.log(`Added agentId to ${count} documents`)
  process.exit(0)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
