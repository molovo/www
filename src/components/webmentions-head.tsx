const WebmentionsHead = () => (
  <>
    <link rel="dns-prefetch" href="https://webmention.io" />
    <link rel="preconnect" href="https://webmention.io" />
    <link rel="preconnect" href="ws://webmention.io:8080" />
    <link rel="pingback" href="https://webmention.io/molovo.co/xmlrpc" />
    <link rel="webmention" href="https://webmention.io/molovo.co/webmention" />
  </>
)

export default WebmentionsHead
