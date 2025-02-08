export interface MaskStringOptions {
  mask?: string
  noneMaskedLength?: number
}

export function maskString<R extends string>(
  str: R,
  options?: MaskStringOptions
) {
  if (!str) {
    return str
  }
  const mask = options?.mask ?? "*"
  const noneMaskedLength = options?.noneMaskedLength ?? 5

  const maskedString = mask.repeat(Math.max(0, str.length - noneMaskedLength))
  const unMaskedString = noneMaskedLength ? str.slice(-noneMaskedLength) : ""

  return maskedString + unMaskedString
}
