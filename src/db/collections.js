import { getDb } from './mongo.js'

export function agentDataCollection() {
  return getDb().collection('agents')
}

export function companyDataCollection() {
  return getDb().collection('company')
}
