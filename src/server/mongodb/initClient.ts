import { MongoClient, ServerApiVersion } from "mongodb"

declare global {
  let _mongoClientPromise: Promise<MongoClient>
}

let clientPromise: Promise<MongoClient> | null = null

export const client = () => {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("MONGODB_URI is not set")
  }

  if (clientPromise) {
    return clientPromise
  }

  clientPromise = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }).connect()

  if (process.env.NODE_ENV === "development") {
    ;(
      global as typeof global & { _mongoClientPromise: Promise<MongoClient> }
    )._mongoClientPromise = clientPromise
  }

  return clientPromise
}

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Closing MongoDB connection...")
  const client = await clientPromise
  await client?.close()
  process.exit(0)
})

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM. Closing MongoDB connection...")
  const client = await clientPromise
  await client?.close()
  process.exit(0)
})
