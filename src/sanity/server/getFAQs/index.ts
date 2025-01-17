import { client, Faq } from "@/sanity"

export async function getFAQs() {
  try {
    const faqs = await client.fetch<Faq[]>('*[_type == "faq"]', {})

    return faqs
  } catch (err) {
    console.warn(err)
    return undefined
  }
}
