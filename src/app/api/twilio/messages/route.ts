import { twiml } from "twilio"

export async function POST(req: Request) {
  const requestBody = await req.json()
  console.log(requestBody)
  const messagingResponse = new twiml.MessagingResponse()

  messagingResponse.message("The Robots are coming! Head for the hills!")

  return new Response(messagingResponse.toString(), {
    status: 200,
  })
}
