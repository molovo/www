'use client'

import { contactSubmit } from '@/actions'
import useHeaderStyle from '@/hooks/use-header-style'
import Send from '@/components/images/icons/send.svg'
import useContactFormStateStore from '@/store/contact-form-state'
import { useEventListener } from '@superrb/react-addons/hooks'
import { MutableRefObject, useEffect, useRef } from 'react'
import { useState } from 'reinspect'
import { Form } from '@superrb/react-addons/components'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  message: Yup.string()
    .meta({ textarea: true, placeholder: "I'd like to hire you to…" })
    .required('Please enter your message')
    .label('Dear James,'),
  email: Yup.string()
    .email()
    .required('Please enter your email address')
    .label('Your email address'),
})

const Contact = () => {
  const [opening, setOpening] = useState<boolean>(
    false,
    'Contact form opening animation',
  )
  const ref = useRef<HTMLElement | null>() as MutableRefObject<HTMLElement>
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

  const closeForm = (position?: number) => {
    window.scrollTo({
      top:
        position !== undefined
          ? position
          : document.documentElement.scrollHeight -
            window.innerHeight -
            ref.current?.clientHeight,
      behavior: 'smooth',
    })
    setTimeout(() => {
      close()
    }, 500)
  }

  return (
    <section className="contact" ref={ref} aria-hidden={!isOpen}>
      <div className="contact__inner">
        <button className="script-arrow contact__close" onClick={() => closeForm()} {...(!isOpen ? { tabIndex: -1 } : {})}>
          <span className="screenreader-text">Close form</span>
        </button>

        <Form
          name="contact"
          className="contact__form"
          schema={schema}
          action={contactSubmit}
          useRecaptcha={false}
          renderSubmit={() => (
            <button className="button button--alt" type="submit">
              Send message
            </button>
          )}
          renderSuccessMessage={() => (
            <div className="success-message">
              <h2 className="success-message__title">Thanks!</h2>
              <p className="success-message__text">
                Your message is on its way to me.
                <br />
                I&apos;ll get back to you as soon as I can.
              </p>

              <button
                className="button button--alt"
                onClick={() => closeForm(0)}
              >
                Back to site
              </button>
            </div>
          )}
        />
      </div>
    </section>
  )
}

export default Contact
