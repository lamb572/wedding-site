import { client } from "@/sanity"

export async function getFAQs() {
  try {
    const faqs = await client.fetch<
      //   TODO add real one
      {
        _id: string
        question?: string
        answer?: string
        icon?: {
          _type: "iconPicker"
          provider?: string
          name?: string
          svg?: string
        }
      }[]
    >('*[_type == "faq"]', {})

    return faqs
  } catch (err) {
    console.warn(err)
    return undefined
  }
}
