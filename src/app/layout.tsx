import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br UTF-8">
      <body>{children}</body>
    </html>
  )
}
