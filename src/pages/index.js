import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

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
        All {posts.length} Posts
      </p>
      <div className="flex flex-col gap-10 pt-4">
        {/* TODO: List 컴포넌트로 따로 분리 */}
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const thumbnail = post.frontmatter.thumbnail
            ? getImage(post.frontmatter.thumbnail)
            : null

          return (
            <div
              key={post.fields.slug}
              className="bg-darkBackground  shadow-md rounded-lg overflow-hidden"
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
                    <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
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

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
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
