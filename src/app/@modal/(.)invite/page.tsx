import { Modal } from "./modal"

interface InviteModalProps {
  searchParams: Promise<{
    forward?: string
  }>
}
export default async function InviteModal({ searchParams }: InviteModalProps) {
  const search = await searchParams
  const forward = search.forward
  console.log("InviteModal", search)
  return <Modal forward={forward} />
}
