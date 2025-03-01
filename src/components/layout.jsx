import * as React from "react"
import { Link } from "gatsby"
import Header from "./header"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <>
      <Header />
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
        <footer className="text-center">
          © {new Date().getFullYear()}, 정인영, Built with Gatsby
        </footer>
      </div>
    </>
  )
}

export default Layout
