'use client'

import NextError from 'next/error'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <html>
      <body>
        <NextError statusCode={0} displayName={error} />
      </body>
    </html>
  )
}
