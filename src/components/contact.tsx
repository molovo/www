'use client'

import useHeaderStyle from '@/hooks/use-header-style'
import useContactFormStateStore from '@/store/contact-form-state'
import { useEventListener } from '@superrb/react-addons/hooks'
import { ButtonHTMLAttributes, useEffect, useRef, useState } from 'react'
import { Form } from '@superrb/react-addons/components'
import * as Yup from 'yup'
import Button from './button'
import { FormRef } from '@superrb/react-addons/components/form'

const schema = Yup.object().shape({
  message: Yup.string()
    .meta({ textarea: true, placeholder: "I'd like to hire you to…" })
    .required('⚠️ Please enter your message')
    .label('Dear James,'),
  email: Yup.string()
    .email()
    .required('⚠️ Please enter your email address')
    .label('Your email address'),
  altchaToken: Yup.string(),
})

const AltchaComponent = ({
  name = 'altchaToken',
  error,
  onStateChange,
}: {
  name?: string
  error?: { message: string }
  onStateChange?: (payload: any) => void
}) => {
  const widgetRef = useRef<AltchaWidget & AltchaWidgetMethods & HTMLElement>(
    null,
  )

  useEffect(() => {
    const handleStateChange = (event: Event | CustomEvent) => {
      if ('detail' in event) {
        onStateChange?.(event)
      }
    }

    const { current } = widgetRef

    if (current) {
      current.addEventListener('statechange', handleStateChange)
      return () => current.removeEventListener('statechange', handleStateChange)
    }
  }, [onStateChange])

  useEffect(() => {
    import('altcha')
  }, [])

  return (
    <>
      <altcha-widget
        ref={widgetRef}
        challengeurl="/api/contact/altcha/challenge"
        auto="onfocus"
        hidefooter
        name={name}
      ></altcha-widget>
      {error && <span className="form__error">{error.message}</span>}
    </>
  )
}

const Contact = () => {
  const [opening, setOpening] = useState<boolean>(false)
  const ref = useRef<HTMLElement>(null)
  const formRef =
    useRef<FormRef<typeof schema, Yup.InferType<typeof schema>>>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const setRef = useHeaderStyle('white')
  const { isOpen, close } = useContactFormStateStore()

  useEffect(() => {
    if (isOpen) {
      setOpening(true)
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
      formRef.current?.fields.message?.focus()

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
      if (!ref.current) {
        return
      }

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
    if (!ref.current) {
      return
    }

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
        <button
          className="script-arrow contact__close"
          onClick={() => closeForm()}
          {...(!isOpen ? { tabIndex: -1 } : {})}
        >
          <span className="screenreader-text">Close form</span>
        </button>

        <Form
          name="contact"
          className="contact__form"
          schema={schema}
          action="/api/contact/submit"
          useRecaptcha={false}
          disabled={!isOpen}
          ref={formRef}
          renderSubmit={(
            props: { label?: string } & ButtonHTMLAttributes<HTMLButtonElement>,
          ) => (
            <button className="contact__submit" type="submit" {...props}>
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

              <Button onClick={() => closeForm(0)}>Back to site</Button>
            </div>
          )}
          renderers={{
            altchaToken: (props: Record<string, any>, error, schema) => (
              <AltchaComponent
                name={props.name}
                error={error as { message: string }}
                onStateChange={(event) => {
                  formRef.current?.setValue('altchaToken', event.detail.payload)
                }}
              />
            ),
          }}
        />
      </div>
    </section>
  )
}

export default Contact
