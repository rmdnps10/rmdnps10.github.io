import * as React from "react"
import { Link, graphql } from "gatsby"
import { useState, useEffect } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Bio from "../components/Bio"

import { GatsbyImage, getImage } from "gatsby-plugin-image"

//
//
//

const TagFilter = ({ tagList, selectedTag, setSelectedTag }) => (
  <div className="flex gap-2 mb-2 items-center bg-darkBackground rounded-lg px-2 py-4 mt-2">
    <button
      onClick={() => setSelectedTag("")}
      className={`px-2 py-0.5 border-2 ${
        selectedTag === ""
          ? "bg-white text-black font-bold"
          : "border-white text-white hover:bg-[#383737] font-bold"
      } rounded-lg hover:scale-110 hover: transition-all`}
    >
      All
    </button>
    <div className="w-0.5 h-[30px] bg-white"></div>
    {[...tagList].map(tag => (
      <button
        key={tag}
        onClick={() => setSelectedTag(tag)}
        className={`px-2 py-0.5 border-2 ${
          selectedTag === tag
            ? "bg-white text-black font-bold"
            : "border-white text-white hover:bg-[#383737] font-bold"
        } rounded-lg hover:scale-110 hover: transition-all`}
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
      className="bg-darkBackground shadow-[rgba(100,_100,_111,_0.2)_0px_7px_29px_0px] rounded-lg overflow-hidden hover:scale-105 hover: transition-all "
    >
      <Link to={post.fields.slug} itemProp="url">
        <article className="p-0" itemScope itemType="http://schema.org/Article">
          {thumbnail && (
            <GatsbyImage
              image={thumbnail}
              alt={title}
              className="w-full h-60 object-cover"
            />
          )}

          <div className="px-5">
            <h2
              className={`text-2xl font-bold mt-5 mb-0 border-none break-keep`}
              style={{ color: pointColor }}
            >
              {title}
            </h2>
            <small className="text-[#B0B0B0]">{post.frontmatter.date}</small>

            <div className="flex gap-2 my-3">
              {tags.map(tag => (
                <button
                  key={tag}
                  className="px-2 py-0.5 border-2 border-white rounded-lg text-white hover:bg-[#383737] font-bold"
                >
                  {tag}
                </button>
              ))}
            </div>
            <section className="mt-2">
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
                itemProp="description"
                className="text-white break-keep"
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
  <div className="flex flex-col gap-10 pt-4">
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
      <p className="text-3xl font-bold text-white m-0 mt-5">
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

export const Head = () => <Seo title="🏠" />

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
