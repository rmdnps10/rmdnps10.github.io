import React, { useEffect, useState } from "react"

const TableOfContents = ({ html }) => {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    if (typeof window === "undefined") return

    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = html

    const headingElements = tempDiv.querySelectorAll("h1, h2, h3, h4")
    const headingsList = Array.from(headingElements).map(heading => ({
      id: heading.id,
      text: heading.textContent,
      level: parseInt(heading.tagName.charAt(1)),
    }))

    setHeadings(headingsList)

    // Intersection Observer로 현재 보이는 섹션 추적
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      }
    )

    // 실제 DOM의 헤딩 요소들 관찰
    const actualHeadings = document.querySelectorAll(
      ".blog-post h1, .blog-post h2, .blog-post h3, .blog-post h4"
    )
    actualHeadings.forEach(heading => observer.observe(heading))

    return () => {
      actualHeadings.forEach(heading => observer.unobserve(heading))
    }
  }, [html])

  const handleClick = (e, id) => {
    e.preventDefault()
    if (typeof window === "undefined") return

    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // 헤더 높이만큼 오프셋
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  if (headings.length === 0) return null

  return (
    <nav className="toc-container mt-5">
      <ul className="toc-list">
        {headings.map((heading, index) => (
          <li
            key={index}
            className={`toc-item toc-level-${heading.level} ${
              activeId === heading.id ? "active" : ""
            }`}
          >
            <a
              href={`#${heading.id}`}
              onClick={e => handleClick(e, heading.id)}
              className="toc-link"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents
