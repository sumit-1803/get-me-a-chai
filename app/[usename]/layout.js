import Head from "next/head"

export const metadata = {
  title: 'DevSponsor',
  description: 'DevSponsor is a platform that connects developers with sponsors for open source projects.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      </Head>
      <body>{children}</body>
    </html>
  )
}
