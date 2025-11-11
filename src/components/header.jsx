import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
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
      <div className="flex h-full mx-auto max-w-wrapper items-center justify-between px-3">
        <h1 className="text-3 font-bold text-white m-0">
          <Link to="/" className="transition-colors hover:text-cyan-300">
            난너의오른팔 🧑‍💻
          </Link>
        </h1>

        {/* 오른쪽 링크들 */}
        <div className="flex items-center gap-2">
          {/* Me: 포트폴리오 */}
          <Link
            to="/portfolio"
            className="flex h-[27px] w-[27px] items-center justify-center rounded-full bg-white font-pretendard text-sm font-bold text-black transition-transform hover:scale-110 hover:text-gray-500"
          >
            Me
          </Link>

          {/* Github */}
          <a
            href="https://github.com/rmdnps10"
            className="text hover:text-gray-500 hover:scale-110 text-white block transition-all"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="xl" color="gray-500" />
          </a>

          {/* Linkedin */}
          <a
            href="https://www.linkedin.com/in/rmdnps10/"
            target="_blank"
            rel="noreferrer"
            className="text hover:text-gray-500 hover:scale-110 text-white block transition-all"
          >
            <FontAwesomeIcon icon={faLinkedin} size="xl" color="white" />
          </a>
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
