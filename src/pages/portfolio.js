import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Hero from "../components/portfolio/Hero"
import About from "../components/portfolio/About"
import Career from "../components/portfolio/Career"
import Activity from "../components/portfolio/Activity"
import FeaturedProjects from "../components/portfolio/FeaturedProjects"
import ProjectGrid from "../components/portfolio/ProjectGrid"

const PortfolioPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query PortfolioPageQuery {
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
      <Hero />
      <About />
      <Career />
      <Activity />
      <FeaturedProjects />
      <ProjectGrid />
    </Layout>
  )
}

export default PortfolioPage

export const Head = () => (
  <Seo
    title="정인영 포트폴리오 (Chung Inyoung)"
    description="기록하며 성장하는 소프트웨어 개발자, 정인영입니다."
    keywords="정인영, Chung Inyoung, 포트폴리오, 개발자 포트폴리오, 웹 개발자, AI 개발자, 프론트엔드 개발자, 서강대학교, 카카오뱅크, 소프트웨어 개발자"
  />
)
