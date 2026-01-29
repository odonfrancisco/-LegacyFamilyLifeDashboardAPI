import dotenv from 'dotenv'

dotenv.config()

export const env = {
  prod: process.env.PROD,

  mongodbURI: process.env.MONGODB_URI,
  mongodbURILocal: process.env.MONGODB_URI_LOCAL,
  mongodbName: process.env.MONGODB_DB_NAME,
}
