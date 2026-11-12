'use client'
import React, { useRef } from 'react'

/**
 * A plain HTML form that can only be submitted once per page load, so a
 * double-click on "Add note" doesn't add the note twice. The server handles
 * the post and redirects back.
 *
 * Inputs are deliberately not disabled while sending: disabled fields are
 * left out of the submitted data.
 */
export default function OnceForm({
  action,
  children,
  className,
}: {
  action: string
  children: React.ReactNode
  className?: string
}) {
  const sent = useRef(false)
  return (
    <form
      method='post'
      action={action}
      className={className}
      onSubmit={(e) => {
        if (sent.current) e.preventDefault()
        sent.current = true
      }}>
      {children}
    </form>
  )
}
