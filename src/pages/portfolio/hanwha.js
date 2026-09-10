import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const IMAGE_COUNT = 9

const HanwhaPortfolioPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query HanwhaPortfolioPageQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata?.title || "Portfolio"

  return (
    <Layout location={location} title={siteTitle}>
      <div>
        {Array.from({ length: IMAGE_COUNT }, (_, index) => (
          <img
            key={index + 1}
            src={`/images/hanwha-portfolio/${index + 1}.png`}
            alt={`한화금융 포트폴리오 ${index + 1}페이지`}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              margin: 0,
              padding: 0,
              border: "none",
              boxShadow: "none",
              borderRadius: 0,
            }}
          />
        ))}
      </div>
    </Layout>
  )
}

export default HanwhaPortfolioPage

export const Head = () => (
  <Seo
    title="정인영 한화금융 포트폴리오"
    description="정인영 한화금융 포트폴리오입니다."
  />
)
