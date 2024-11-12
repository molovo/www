'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { ocean } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import useHeaderStyle from '@/hooks/use-header-style'
import swash from '@/utils/swash'

const OpenSource = () => {
  const setRef = useHeaderStyle('red')

  return (
    <section
      className="homepage-section homepage-section--open-source open-source"
      ref={setRef}
    >
      <header className="homepage-section__header">
        <span
          className="homepage-section__pre-title"
          dangerouslySetInnerHTML={{
            __html: swash(`Some things are too good to keep to _myself_`, 'N'),
          }}
        />
        <h2 className="homepage-section__title">
          I build open source tools, because good ideas are better when shared.
        </h2>
      </header>

      <div className="open-source__projects">
        <div className="open-source__project">
          <SyntaxHighlighter language="javascript" style={ocean}>
            {`/**
 * LiveNodeList
 *
 * An alternative to document.querySelector
 * that monitors the DOM for changes
 */
import { LiveNodeList } from 'live-node-list'

const items = new LiveNodeList('.my-selector')

// Attach an event listener to each item
// in the node list. The listener will automatically
// be attached to any new elements matching the
// selector when they are added to the DOM
items.addEventListener('click', (e) => {
  alert(\`Clicked! \${e.target.id}\`)
})

// Listen for changes to the node list
// (e.g. when elements are added or removed)
// and apply updates to the new items
items.on('update', (newItems, oldItems) => {
  newItems.forEach((item) => {
    item.setAttribute('aria-label', 'New item')
  })
})
`}
          </SyntaxHighlighter>
        </div>

        <div className="open-source__project">
          <SyntaxHighlighter language="javascript" style={ocean}>
            {`/**
 * Consumer
 *
 * A simple and lightweight tool to create an
 * ORM-like consumer for any REST API
 */
import consume from 'api-consumer'

const api = consume('https://api.example.com')

// GET https://api.example.com/users/123/comments
const userComments = await api.users[123].comments.all()

// POST https://api.example.com/users
const user = await api.users.create({
  name: 'Joe Bloggs',
  email: 'joe@bloggs.com'
})

// GET https://api.example.com/users/1
const user = await api.users.find(1)
user.name = 'Joseph Bloggs'

// PUT https://api.example.com/users/1
await user.save()
`}
          </SyntaxHighlighter>
        </div>

        <div className="open-source__project">
          <SyntaxHighlighter language="shell" style={ocean}>
            {`###
 # ZUnit
 #
 # A powerful testing framework for ZSH projects
 ##`}
          </SyntaxHighlighter>
        </div>
      </div>
    </section>
  )
}

export default OpenSource
