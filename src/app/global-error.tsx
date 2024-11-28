'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import RootLayout from './(site)/layout'
import ErrorPage from './(site)/error-page'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <>
    <h1>Tada!</h1>
    {/* <RootLayout> */}
      {/* <ErrorPage /> */}
    {/* </RootLayout> */}
      </>
  )
}

