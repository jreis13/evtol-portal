"use client"

export default function Link({ blank, children, to }) {
  const attrs = {}
  if (blank) {
    attrs.target = "_blank"
    attrs.rel = "noopener noreferrer"
  }

  return (
    <a href={to} className="link cursor-pointer no-underline" {...attrs}>
      {children}
    </a>
  )
}
