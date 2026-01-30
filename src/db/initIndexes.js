import { agentDataCollection, companyDataCollection } from './collections.js'

export async function initIndexes() {
  await agentDataCollection().createIndexes([
    {
      key: { agentId: 1, businessDate: 1 },
      unique: true,
    },
    {
      key: { businessDate: 1 },
    },
  ])

  await companyDataCollection().createIndexes([
    {
      key: { businessDate: 1 },
      unique: true,
    },
  ])
}
