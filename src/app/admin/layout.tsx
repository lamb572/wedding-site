export default async function AdminLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode
  auth: React.ReactNode
}>) {
  return (
    <>
      {auth}
      {children}
    </>
  )
}
