import {Metadata} from "next"

export const metadata: Metadata = {
  title: {
    default: 'molovo. Design, Development, Branding',
    template: '%s | molovo. Design, Development, Branding',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
