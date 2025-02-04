export interface Companion {
  name?: string
}

export interface Guest {
  _id: string
  name: string
  inviteId: string
  companions: Companion[]
}
