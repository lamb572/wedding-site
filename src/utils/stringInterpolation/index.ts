export default function stringInterpolation(
  str?: string,
  data?: Record<string, string>
) {
  if (!str || !data) return str
  return str.replace(/\${{(.*?)}}/g, (match, key) => {
    return data[key]
  })
}
