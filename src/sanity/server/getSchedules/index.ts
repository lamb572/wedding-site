import { client } from "@/sanity"
import { Schedule } from "@/sanity/types"

export async function getSchedules() {
  try {
    const faqs = await client().fetch<Schedule[]>(
      '*[_type == "schedule"]| order(time asc)',
      {}
    )

    return faqs
  } catch (err) {
    console.warn(err)
    return undefined
  }
}
