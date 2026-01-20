import * as React from "react"
import { useEffect } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Comments from "../components/comment"
import TableOfContents from "../components/TableOfContents"
import { trackPostVisit } from "../lib/trackPostVisit"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  // 게시물 방문 추적
  useEffect(() => {
    if (post?.fields?.slug) {
      trackPostVisit(post.fields.slug)
    }
  }, [post?.fields?.slug])

  return (
    <Layout location={location} title={siteTitle}>
      <div className="blog-post-container">
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          <footer>
            <Comments />
          </footer>
        </article>
        <aside className="toc-sidebar">
          <TableOfContents html={post.html} />
        </aside>
      </div>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next" className="">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post, site } }) => {
  const siteUrl = site.siteMetadata.siteUrl
  const postUrl = `${siteUrl}${post.fields.slug}`

  // Gatsby가 처리한 실제 이미지 URL 사용
  let postImage = null
  if (post.frontmatter.thumbnail?.childImageSharp?.fixed?.src) {
    // fixed 레이아웃에서 실제 처리된 이미지 경로 사용
    postImage = `${siteUrl}${post.frontmatter.thumbnail.childImageSharp.fixed.src}`
  } else if (post.frontmatter.thumbnail?.publicURL) {
    // fallback: publicURL 사용
    postImage = `${siteUrl}${post.frontmatter.thumbnail.publicURL}`
  }

  const publishedTime = post.frontmatter.date
    ? new Date(post.frontmatter.date).toISOString()
    : null

  // keywords 생성: frontmatter의 keywords가 있으면 사용, 없으면 tags 사용
  const keywords = post.frontmatter.keywords
    ? post.frontmatter.keywords
    : post.frontmatter.tags?.join(", ")

  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
      image={postImage}
      imageAlt={post.frontmatter.title}
      type="article"
      url={postUrl}
      publishedTime={publishedTime}
      author={site.siteMetadata.author.name}
      keywords={keywords}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        siteUrl
        author {
          name
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        pointColor
        tags
        keywords
        thumbnail {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 1200, layout: FIXED)
            fixed(width: 1200) {
              src
            }
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
