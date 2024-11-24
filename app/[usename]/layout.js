export const metadata = {
  title: 'DevSponsor',
  description: 'DevSponsor is a platform that connects developers with sponsors for open source projects.',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
