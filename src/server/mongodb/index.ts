import { MongoClient, ServerApiVersion } from "mongodb"

export const initClient = () => {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("MONGODB_URI is not set")
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })

  return client
}

const mongoDBService = {
  initClient,
}

export default mongoDBService
