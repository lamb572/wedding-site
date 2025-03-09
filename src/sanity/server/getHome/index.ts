import { client, Home } from "@/sanity"

export async function getHome() {
  try {
    const home = await client().fetch<Home>('*[_type == "home"][0]', {})
    return home
  } catch (err) {
    console.warn(err)
    return undefined
  }
}
