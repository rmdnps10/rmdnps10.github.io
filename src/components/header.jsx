import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollPosition(scrollPercent)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className="fixed top-0 w-full h-[54px] m-0 p-0 border-bottom-2 z-50 bg-darkMain border-b border-zinc-600">
      <div className="flex h-full mx-auto max-w-wrapper items-center justify-between">
        <h1 className="text-3 font-bold text-white m-0 px-3">
          <a href="/">Dev.In_young</a>
        </h1>
        {/* icon */}
        <div className="flex gap-3 px-2">
          <div id="github">
            <a
              href="https://github.com/rmdnps10"
              className="text hover:text-gray-500 hover:scale-110 text-white block transition-all"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithub} size="xl" />
            </a>
          </div>
          <div id="linkedin">
            <a
              href="https://www.linkedin.com/in/rmdnps10/"
              target="_blank"
              className="text hover:text-gray-500 hover:scale-110 text-white block transition-all"
            >
              <FontAwesomeIcon icon={faLinkedin} size="xl" color="white" />
            </a>
          </div>
        </div>
      </div>
      {/* Progressbar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-yellow"
        style={{ width: `${scrollPosition}%` }}
      ></div>
    </header>
  )
}

export default Header
