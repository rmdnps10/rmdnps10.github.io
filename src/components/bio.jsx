/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            instagram
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author
  const description = data.site.siteMetadata?.description

  return (
    <div className="mt-8 flex gap-2">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.jpg"
        width={120}
        height={120}
        quality={95}
        alt="Profile picture"
      />
      <div className="flex flex-col">
        <p className="text-white m-0 mt-3">
          Written by{" "}
          <span className="inline-block text-[1.1rem] font-bold px-2.5 py-0.3 ml-0.3 rounded-xl bg-[#2d3748]">
            {author.name}
          </span>
        </p>
        <p className="text-gray-300 text-sm m-0 mt-1.5]">
          {author?.summary || null}{" "}
        </p>
        <p className="m-0">
          <StaticImage
            src="../images/logo/sogang.png"
            width={15}
            height={18}
            alt="서강대학교 로고"
          />
          {author.university}
        </p>
        <p className="text-gray-300 text-[1.1rem] m-0 mt-auto">
          {description ?? "Learning by Sharing. 배우고 느낀 점을 공유합니다."}
        </p>
      </div>
    </div>
  )
}

export default Bio
