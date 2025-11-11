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
            university
          }
          social {
            instagram
          }
          description
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author
  const description = data.site.siteMetadata?.description

  return (
    <div className="mt-10 flex gap-2">
      <StaticImage
        className="bio-avatar flex-shrink-0 w-[120px] h-[120px] overflow-hidden rounded-full"
        imgClassName="w-full h-full object-cover rounded-full"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        width={120}
        height={120}
        quality={95}
        alt="Profile picture"
      />
      <div className="flex flex-col">
        <p className="text-white m-0 mt-3">
          Written by{" "}
          <span className="inline-block text-[1.1rem] font-bold px-2.5 py-0.3 ml-0.3 rounded-xl bg-[#444857] text-white">
            {author.name}
          </span>
        </p>
        <p className="text-gray-300 text-xs m-0 mt-1.5">
          {author?.summary || null}
        </p>

        {/* 학력 */}
        <div className="m-0 flex items-center gap-1">
          <StaticImage
            className="inline-block"
            src="../images/logo/sogang.png"
            layout="fixed"
            width={12}
            height={15}
            alt="서강대학교 로고"
          />
          <p className="text-gray-300 text-xs m-0 mt-1.5]">
            {author.university}
          </p>
        </div>

        {/* 구분선 */}
        <p className="text-white text-sm sm:text-base md:text-[14px] m-0 mt-2">
          {description}
        </p>
      </div>

      {/* 금일 방문자와 전체 방문자 수 */}
      <div className="ml-auto flex gap-6">
        <div className="text-center">
          <p className="text-gray-400 text-xs m-0">Today</p>
          <p className="text-white text-lg font-semibold m-0 mt-1">224</p>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-xs m-0">Total</p>
          <p className="text-white text-lg font-semibold m-0 mt-1">2.3K</p>
        </div>
      </div>
    </div>
  )
}

export default Bio
