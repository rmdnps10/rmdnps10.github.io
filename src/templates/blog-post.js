import * as React from "react"
import { useEffect } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Comments from "../components/comment"
import TableOfContents from "../components/TableOfContents"
import { trackPostVisit } from "../lib/trackPostVisit"
import { usePostVisit } from "../hooks/usePostVisit"
import { getTagColor } from "../utils/tagColors"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post, allMarkdownRemark },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const {
    formattedCount,
    formattedTime,
    loading: visitLoading,
  } = usePostVisit(post.fields.slug)

  // 관련 글 찾기 (현재 글의 태그 중 하나라도 포함된 글들, 현재 글 제외)
  const relatedPosts = allMarkdownRemark.nodes
    .filter(node => {
      if (node.fields.slug === post.fields.slug) return false
      return post.frontmatter.tags?.some(tag =>
        node.frontmatter.tags?.includes(tag)
      )
    })
    .slice(0, 6) // 최대 6개까지만 표시

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
            <div className="flex gap-2 mb-3 flex-wrap">
              {post.frontmatter.tags?.map(tag => (
                <Link
                  key={tag}
                  to={`/?tag=${tag}`}
                  className="px-2 py-0.5 rounded-lg text-white font-bold text-xs md:text-sm border-2 hover:shadow-md transition-all"
                  style={{
                    color: getTagColor(tag),
                    borderColor: getTagColor(tag),
                    backgroundColor: `${getTagColor(tag)}15`,
                  }}
                >
                  #{tag}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3 text-gray-400 text-sm mb-4">
              <time>{post.frontmatter.date}</time>
              {!visitLoading && (
                <div className="flex items-center gap-3">
                  <span className="w-px h-3 bg-gray-700" />
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    {formattedCount} views
                  </span>
                  {formattedTime && (
                    <>
                      <span className="w-px h-3 bg-gray-700" />
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Last viewed {formattedTime}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          <footer className="mt-10">
            <Comments />
          </footer>
        </article>
        <aside className="toc-sidebar">
          <TableOfContents html={post.html} />
        </aside>
      </div>

      <nav className="blog-post-nav mt-10">
        <div className="flex justify-between items-center py-6 border-t border-gray-800">
          <div className="flex-1">
            {previous && (
              <Link
                to={previous.fields.slug}
                rel="prev"
                className="group flex flex-col gap-1"
              >
                <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                  ← 이전 글
                </span>
                <span className="text-sm md:text-base font-bold text-gray-300 group-hover:text-white transition-colors line-clamp-1">
                  {previous.frontmatter.title}
                </span>
              </Link>
            )}
          </div>
          <div className="w-px h-10 bg-gray-800 mx-4" />
          <div className="flex-1 text-right">
            {next && (
              <Link
                to={next.fields.slug}
                rel="next"
                className="group flex flex-col gap-1"
              >
                <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                  다음 글 →
                </span>
                <span className="text-sm md:text-base font-bold text-gray-300 group-hover:text-white transition-colors line-clamp-1">
                  {next.frontmatter.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {relatedPosts.length > 0 && (
        <div className="pt-10 border-t border-gray-800">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
            <span
              style={{
                color: getTagColor(post.frontmatter.tags?.[0]),
              }}
            >
              #{post.frontmatter.tags?.[0]}
            </span>{" "}
            관련 포스트
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedPosts.map(relatedPost => (
              <Link
                key={relatedPost.fields.slug}
                to={relatedPost.fields.slug}
                className="group p-4 rounded-xl bg-[#1a1a1a] border border-gray-800 hover:border-gray-600 transition-all flex flex-col justify-between h-full"
              >
                <div>
                  <h4
                    className="text-base font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2"
                    style={{ color: relatedPost.frontmatter.pointColor }}
                  >
                    {relatedPost.frontmatter.title}
                  </h4>
                </div>
                <time className="text-xs text-gray-500">
                  {relatedPost.frontmatter.date}
                </time>
              </Link>
            ))}
          </div>
        </div>
      )}
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
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          tags
          pointColor
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
