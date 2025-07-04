import { PropsWithChildren } from 'react'

const Main = async ({ children }: PropsWithChildren) => (
  <main className="main" id="content">
    {children}
  </main>
)

export default Main
