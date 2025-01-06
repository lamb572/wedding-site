import { MongoClient, ServerApiVersion, Document } from "mongodb"

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

interface ConnectParams {
  collection: string
  database: string
}
export const connect = async <TSchema extends Document = Document>({
  collection: collectionName,
  database: databaseName,
}: ConnectParams) => {
  const client = initClient()

  try {
    await client.connect()
    const database = client.db(databaseName)
    const collection = database.collection<TSchema>(collectionName)
    return collection
  } catch (err) {
    console.error(err)
    return undefined
  } finally {
    await client.close()
  }
}

const mongoDBService = {
  initClient,
  connect,
}

export default mongoDBService
