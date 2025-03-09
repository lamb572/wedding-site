import { twiml } from "twilio"

export async function POST(req: Request) {
  try {
    const requestBody = await req.json()
    console.log(requestBody)
    // send to webhook

    if (!process.env.MESSAGE_RESPONSE_WEBHOOK) {
      throw new Error("MESSAGE_RESPONSE_WEBHOOK is not set")
    }

    await fetch(process.env.MESSAGE_RESPONSE_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: requestBody,
      }),
    })

    //   Respond to user
    const messagingResponse = new twiml.MessagingResponse()
    messagingResponse.message("The Robots are coming! Head for the hills!")

    return new Response(messagingResponse.toString(), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response("An error occurred", {
      status: 500,
    })
  }
}
