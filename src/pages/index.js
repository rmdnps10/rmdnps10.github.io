import * as React from "react"
import { Link, graphql } from "gatsby"
import { useState, useEffect } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Bio from "../components/Bio"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getTagColor } from "../utils/tagColors"

//
//
//

const TagFilter = ({ tagList, selectedTag, setSelectedTag }) => (
  <div className="flex gap-1 md:gap-2 mb-2 items-center bg-darkBackground rounded-lg px-2 py-2 md:py-4 mt-2 overflow-x-auto w-full">
    <button
      onClick={() => setSelectedTag("")}
      className={`px-1.5 md:px-2 py-0.5 border-2 text-xs md:text-sm ${
        selectedTag === ""
          ? "bg-white text-black font-bold"
          : "border-white text-white hover:bg-[#383737] font-bold"
      } rounded-lg hover:scale-110 hover: transition-all whitespace-nowrap flex-shrink-0`}
    >
      All
    </button>
    <div className="w-0.5 h-[20px] md:h-[30px] bg-white flex-shrink-0"></div>
    {[...tagList].map(tag => (
      <button
        key={tag}
        onClick={() => setSelectedTag(tag)}
        className={`px-1.5 md:px-2 py-0.5 border-2 text-xs md:text-sm ${
          selectedTag === tag
            ? "text-white font-bold"
            : "border-white text-white hover:bg-[#383737] font-bold"
        } rounded-lg hover:scale-110 hover: transition-all whitespace-nowrap flex-shrink-0`}
        style={
          selectedTag === tag
            ? { backgroundColor: getTagColor(tag), borderColor: getTagColor(tag) }
            : {}
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
  return (
    <div
      key={post.fields.slug}
      className="bg-darkBackground shadow-[rgba(100,_100,_111,_0.2)_0px_7px_29px_0px] rounded-lg overflow-hidden hover:scale-105 hover: transition-all w-full"
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
            <small className="text-[#B0B0B0] text-xs md:text-sm">
              {post.frontmatter.date}
            </small>

            <div className="flex gap-1 md:gap-2 my-2 md:my-3 flex-wrap">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="px-1.5 md:px-2 py-0.5 rounded-lg text-white font-bold text-xs md:text-sm"
                  style={{ backgroundColor: getTagColor(tag) }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <section className="mt-2 md:pb-0">
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
                itemProp="description"
                className="text-white break-keep text-sm md:text-base"
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
  <div className="flex flex-col gap-6 md:gap-10 pt-4 w-full">
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

export const Head = () => <Seo title="기술 블로그 🏠" />

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
