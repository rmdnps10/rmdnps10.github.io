import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-[#fede22] to-[#3b82f6] bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-[#262626] to-[#212121] border border-[#52525B] rounded-lg text-white font-bold hover:scale-105 transition-all hover:border-[#fede22] hover:shadow-[0_0_12px_rgba(254,222,34,0.4)]"
          >
            홈으로 돌아가기
          </Link>
          <Link
            to="/portfolio"
            className="px-6 py-3 bg-gradient-to-r from-[#262626] to-[#212121] border border-[#52525B] rounded-lg text-white font-bold hover:scale-105 transition-all hover:border-[#3b82f6] hover:shadow-[0_0_12px_rgba(59,130,246,0.4)]"
          >
            포트폴리오 보기
          </Link>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          <p>혹시 링크가 잘못되었다면 알려주세요!</p>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="404: 페이지를 찾을 수 없습니다"
    description="요청하신 페이지를 찾을 수 없습니다."
  />
)

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
