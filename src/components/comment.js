import React, { useEffect, useRef } from "react"

const Comments = () => {
  const commentRef = useRef(null)

  useEffect(() => {
    const giscus = document.createElement("script")

    const giscusConfig = {
      src: "https://giscus.app/client.js",
      "data-repo": "rmdnps10/rmdnps10.github.io",
      "data-repo-id": "R_kgDON4-0LA",
      "data-category": "Comments",
      "data-category-id": "DIC_kwDON4-0LM4Cm_Ns",
      "data-mapping": "pathname",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "bottom",
      "data-theme": "light",
      "data-lang": "ko",
      "data-loading": "lazy",
      crossorigin: "anonymous",
      async: true,
    }

    Object.entries(giscusConfig).forEach(([key, value]) => {
      giscus.setAttribute(key, value)
    })

    commentRef.current.appendChild(giscus)
  }, [])

  return <div ref={commentRef} />
}

export default Comments
