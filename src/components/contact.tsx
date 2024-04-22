'use client'

import { contactSubmit } from '@/actions'
import useHeaderStyle from '@/hooks/use-header-style'
import useContactFormStateStore from '@/store/contact-form-state'
import { useEventListener } from '@superrb/react-addons/hooks'
import { MutableRefObject, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { useState } from 'reinspect'

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <button className="contact__submit" type="submit" disabled={pending}>
      Send
    </button>
  )
}

const Contact = () => {
  const [opening, setOpening] = useState<boolean>(
    false,
    'Contact form opening animation',
  )
  const ref = useRef<HTMLElement>() as MutableRefObject<HTMLElement>
  const inputRef =
    useRef<HTMLTextAreaElement>() as MutableRefObject<HTMLTextAreaElement>
  const setRef = useHeaderStyle('white')
  const { isOpen, close } = useContactFormStateStore()

  useEffect(() => {
    if (isOpen) {
      setOpening(true)
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
      inputRef.current?.focus()

      setTimeout(() => {
        setOpening(false)
      }, 500)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setRef(ref.current)
      return
    }

    setRef(null)
  }, [setRef, isOpen])

  useEventListener(
    'scroll',
    () => {
      console.log(
        window.scrollY,
        document.documentElement.scrollHeight,
        ref.current?.clientHeight,
        document.documentElement.scrollHeight -
          window.innerHeight -
          ref.current?.clientHeight -
          100,
      )

      if (
        window.scrollY <
        document.documentElement.scrollHeight -
          window.innerHeight -
          ref.current?.clientHeight -
          100
      ) {
        close()
      }
    },
    { passive: true },
    undefined,
    !opening && isOpen,
  )

  return (
    <section className="contact" ref={ref} aria-hidden={!isOpen}>
      <div className="contact__inner">
        <button
          className="script-arrow contact__close"
          onClick={() => {
            window.scrollTo({
              top:
                document.documentElement.scrollHeight -
                window.innerHeight -
                ref.current?.clientHeight,
              behavior: 'smooth',
            })
            setTimeout(() => {
              close()
            }, 500)
          }}
        >
          <span className="screenreader-text">Close form</span>
        </button>

        <form className="contact__form" action={contactSubmit}>
          <label htmlFor="message" className="contact__label">
            Dear James,
          </label>
          <textarea
            id="message"
            name="message"
            className="contact__message"
            placeholder="I'd like to hire you to&hellip;"
            ref={inputRef}
            required
          />
          <div className="contact__footer">
            <input
              type="email"
              name="email"
              className="contact__email"
              placeholder="Your email address"
              required
            />
            <SubmitButton />
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
