import * as React from "react"
import Header from "./header"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <>
      <Header />
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>

        <footer className="text-center">
          © {new Date().getFullYear()}, 정인영, Design & Developed by 정인영
        </footer>
      </div>
    </>
  )
  
}

export default Layout
