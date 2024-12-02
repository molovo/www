'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import NextError from 'next/error'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  )
}
