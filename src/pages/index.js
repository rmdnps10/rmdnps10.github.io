import * as React from "react"
import { Link, graphql } from "gatsby"
import { useState, useEffect } from "react"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `난너의오른팔's dev blog`
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
      <div className="flex gap-2 pt-2 items-center">
        <button
          onClick={() => setSelectedTag("")}
          className={`px-2 py-0.5 border-2 ${
            selectedTag === ""
              ? "bg-white text-black"
              : "border-white text-white"
          } rounded-lg hover:bg-red hover:text-black`}
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
                ? "bg-white text-black"
                : "border-white text-white"
            } rounded-lg hover:scale-110 transition-all`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-10 pt-4">
        {filteredPosts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const thumbnail = post.frontmatter.thumbnail
            ? getImage(post.frontmatter.thumbnail)
            : null

          return (
            <div
              key={post.fields.slug}
              className="bg-darkBackground shadow-md rounded-lg overflow-hidden"
            >
              <Link to={post.fields.slug} itemProp="url">
                <article
                  className="p-0"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  {thumbnail && (
                    <GatsbyImage
                      image={thumbnail}
                      alt={title}
                      className="w-full h-60 object-cover"
                    />
                  )}

                  <div className="px-5">
                    <h2 className="text-xl font-bold mb-2 text-white">
                      {title}
                    </h2>
                    <small className="text-gray-500">
                      {post.frontmatter.date}
                    </small>
                    <section className="mt-2">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                        className="text-gray-700"
                      />
                    </section>
                  </div>
                </article>
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const Head = () => <Seo title="All posts" />

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
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 300, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`
