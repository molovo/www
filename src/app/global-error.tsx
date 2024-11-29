'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import RootLayout from './(site)/layout'
import NextError from 'next/error'
import ErrorPage from './(site)/error-page'
import Header from '@/components/header'

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
