"use server"
import { captureException } from "@sentry/nextjs"
import { DiscordMessage } from "./type"

export async function sendWebhook(
  webhookURL: string | undefined,
  message: DiscordMessage
) {
  try {
    if (!webhookURL) {
      throw new Error("URL is not set")
    }

    await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
  } catch (err: unknown) {
    captureException(err)
    console.error(err)
  }
}
