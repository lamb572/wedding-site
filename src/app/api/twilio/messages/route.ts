import { twiml } from "twilio"

export async function POST() {
  const messagingResponse = new twiml.MessagingResponse()

  messagingResponse.message("The Robots are coming! Head for the hills!")

  return new Response(messagingResponse.toString(), {
    status: 200,
  })
}
