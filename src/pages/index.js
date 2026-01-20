import * as React from "react"
import { Link, graphql } from "gatsby"
import { useState, useEffect } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Bio from "../components/Bio"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getTagColor } from "../utils/tagColors"
import { usePostVisit } from "../hooks/usePostVisit"

//
//
//

const TagFilter = ({ tagList, selectedTag, setSelectedTag }) => (
  <div className="flex gap-1 md:gap-2 mb-2 items-center bg-gradient-to-r from-[#262626] to-[#212121] rounded-lg px-2 py-2 md:py-4 mt-2 overflow-x-auto w-full border border-[#52525B]">
    <button
      onClick={() => setSelectedTag("")}
      className={`px-1.5 md:px-2 py-0.5 border-2 text-xs md:text-sm ${
        selectedTag === ""
          ? "bg-white text-black font-bold"
          : "border-gray-500 text-gray-300 hover:border-white hover:text-white font-bold"
      } rounded-lg hover:scale-110 transition-all whitespace-nowrap flex-shrink-0`}
    >
      All
    </button>
    <div className="w-0.5 h-[20px] md:h-[30px] bg-gray-600 flex-shrink-0"></div>
    {[...tagList].map(tag => (
      <button
        key={tag}
        onClick={() => setSelectedTag(tag)}
        className={`px-1.5 md:px-2 py-0.5 border-2 text-xs md:text-sm font-bold rounded-lg hover:scale-110 transition-all whitespace-nowrap flex-shrink-0 ${
          selectedTag === tag ? "text-white" : "hover:border-opacity-80"
        }`}
        style={
          selectedTag === tag
            ? {
                color: "white",
                backgroundColor: getTagColor(tag),
                borderColor: getTagColor(tag),
                boxShadow: `0 0 12px ${getTagColor(tag)}40`,
              }
            : {
                color: getTagColor(tag),
                borderColor: getTagColor(tag),
                backgroundColor: `${getTagColor(tag)}15`,
                boxShadow: `inset 0 1px 2px rgba(0, 0, 0, 0.3)`,
              }
        }
      >
        {tag}
      </button>
    ))}
  </div>
)

//
//
//

const PostCard = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug
  const thumbnail = post.frontmatter.thumbnail
    ? getImage(post.frontmatter.thumbnail)
    : null
  const tags = post.frontmatter.tags
  const pointColor = post.frontmatter.pointColor
  const { formattedCount, formattedTime, loading } = usePostVisit(
    post.fields.slug
  )

  return (
    <div
      key={post.fields.slug}
      className="bg-gradient-to-br from-[#262626] to-[#212121] rounded-lg overflow-hidden hover:scale-105 transition-all w-full border border-[#52525B]"
      style={{
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      }}
    >
      <Link to={post.fields.slug} itemProp="url">
        <article className="p-0" itemScope itemType="http://schema.org/Article">
          {thumbnail && (
            <GatsbyImage
              image={thumbnail}
              alt={title}
              className="w-full h-40 md:h-60 object-cover"
            />
          )}

          <div className="px-3 md:px-5">
            <h2
              className={`text-lg md:text-2xl font-bold mt-3 md:mt-5 mb-0 border-none break-keep`}
              style={{ color: pointColor }}
            >
              {title}
            </h2>
            <div className="flex items-center justify-between mb-2">
              <small className="text-gray-400 text-xs md:text-sm">
                {post.frontmatter.date}
              </small>
              {!loading && (
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {formattedCount}
                  </span>
                  {formattedTime && (
                    <span className="text-[10px] md:text-xs">
                      · {formattedTime}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-1 md:gap-2 my-2 md:my-3 flex-wrap">
              {tags.map(tag => (
                <button
                  key={tag}
                  className="px-1.5 md:px-2 py-0.5 rounded-lg text-white font-bold text-xs md:text-sm border-2 hover:shadow-md transition-all"
                  style={{
                    color: getTagColor(tag),
                    borderColor: getTagColor(tag),
                    backgroundColor: `${getTagColor(tag)}15`,
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
            <section className="mt-2 md:pb-4">
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
                itemProp="description"
                className="text-gray-300 break-keep text-sm md:text-base"
              />
            </section>
          </div>
        </article>
      </Link>
    </div>
  )
}

//
//
//

const PostList = ({ posts }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-4 w-full">
    {posts.map(post => (
      <PostCard key={post.fields.slug} post={post} />
    ))}
  </div>
)

//
//
//

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.nodes

  const tagList = new Set()
  posts.forEach(post => {
    post.frontmatter.tags.forEach(tag => tagList.add(tag))
  })

  const [selectedTag, setSelectedTag] = useState(
    new URLSearchParams(location.search).get("tag") || ""
  )

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    if (selectedTag) {
      queryParams.set("tag", selectedTag)
    } else {
      queryParams.delete("tag")
    }
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${queryParams.toString()}`
    )
  }, [selectedTag, location.pathname, location.search])

  const filteredPosts = selectedTag
    ? posts.filter(post => post.frontmatter.tags.includes(selectedTag))
    : posts

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <p className="text-xl md:text-3xl font-bold text-white m-0 mt-5">
        {selectedTag === "" ? "All " : `${selectedTag} `}
        {filteredPosts.length} Posts
      </p>
      <TagFilter
        tagList={tagList}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <PostList posts={filteredPosts} />
    </Layout>
  )
}

export default BlogIndex

export const Head = () => (
  <Seo
    title="난너의오른팔"
    description="Web 기술과 AI 활용법을 공부하는 주니어 개발자, 커뮤니티 빌더의 기술 블로그"
    keywords="기술 블로그, 웹 개발, AI, 머신러닝, React, Gatsby, 프론트엔드, 백엔드, RAG, 프롬프트 엔지니어링, Flutter, 개발자 블로그"
  />
)

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
          pointColor
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 1000, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`
