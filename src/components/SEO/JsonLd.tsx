import React from "react"

/**
 * Emits a schema.org JSON-LD block. Rendered from a server component so the
 * markup is present in the static HTML crawlers receive.
 */
const JsonLd = ({ data }: { data: object }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
)

export default JsonLd
