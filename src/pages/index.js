import * as React from "react"
import { Link, graphql } from "gatsby"
import { useState, useEffect } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Bio from "../components/Bio"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getTagColor } from "../utils/tagColors"
import { usePostVisit } from "../hooks/usePostVisit"
import { getTopVisitedPosts } from "../lib/trackPostVisit"

//
//
//

const HotPostCardSkeleton = () => (
  <div
    className="relative bg-gradient-to-br from-[#262626] to-[#212121] rounded-lg overflow-hidden border border-[#52525B] h-[160px] md:h-[240px] flex flex-col animate-pulse"
    aria-hidden="true"
  >
    <div className="w-full h-32 md:h-40 bg-[#3f3f46] flex-shrink-0" />
    <div className="p-3 flex-1 flex flex-col justify-between">
      <div className="h-4 md:h-5 bg-[#3f3f46] rounded w-4/5 mb-2" />
      <div className="flex items-center gap-1">
        <div className="h-3 w-3 bg-[#3f3f46] rounded" />
        <div className="h-3 w-8 bg-[#3f3f46] rounded" />
      </div>
    </div>
  </div>
)

const HotPostCard = ({ post, rank }) => {
  const title = post.frontmatter.title || post.fields.slug
  const thumbnail = post.frontmatter.thumbnail
    ? getImage(post.frontmatter.thumbnail)
    : null
  const pointColor = post.frontmatter.pointColor
  const { formattedCount } = usePostVisit(post.fields.slug)

  return (
    <Link to={post.fields.slug} className="block h-full">
      <div className="relative bg-gradient-to-br from-[#262626] to-[#212121] rounded-lg overflow-hidden hover:scale-105 transition-all border border-[#52525B] group h-[160px] md:h-[240px] flex flex-col">
        {thumbnail && (
          <GatsbyImage
            image={thumbnail}
            alt={title}
            className="w-full h-32 md:h-40 object-cover flex-shrink-0"
          />
        )}

        <div className="p-3 flex-1 flex flex-col justify-between">
          <h3
            className="text-sm md:text-lg font-bold mb-2 truncate pt-0 mt-0"
            style={{ color: pointColor }}
          >
            {title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold">{formattedCount}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

const HotSection = ({ posts }) => {
  const [hotPosts, setHotPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHotPosts = async () => {
      try {
        const topVisited = await getTopVisitedPosts(3)
        const hotPostsData = topVisited
          .map(visitData =>
            posts.find(post => post.fields.slug === visitData.post_slug)
          )
          .filter(Boolean)
        setHotPosts(hotPostsData)
      } catch (error) {
        console.error("Error fetching hot posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHotPosts()
  }, [posts])

  if (!loading && hotPosts.length === 0) return null

  return (
    <div className="mt-5 md:block hidden">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🔥</span>
        <h2 className="text-xl md:text-2xl font-bold text-white m-0">
          Hot Posts
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading
          ? [1, 2, 3].map(i => <HotPostCardSkeleton key={i} />)
          : hotPosts.map((post, index) => (
              <HotPostCard
                key={post.fields.slug}
                post={post}
                rank={index + 1}
              />
            ))}
      </div>
    </div>
  )
}

//
//
//

const SearchAndSort = ({ searchQuery, setSearchQuery, sortBy, setSortBy }) => (
  <div className="flex gap-3 items-center w-full mt-5">
    {/* 검색창 */}
    <div className="flex-1 relative">
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="w-full bg-[#2a2a2a] border border-[#52525B] rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-gray-500 transition-colors"
      />
    </div>

    {/* 정렬 드롭다운 */}
    <div className="relative">
      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        className="bg-[#2a2a2a] border border-[#52525B] rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gray-500 transition-colors appearance-none pr-8 cursor-pointer"
      >
        <option value="date-desc">최신순</option>
        <option value="date-asc">오래된순</option>
        <option value="views-desc">조회수 높은순</option>
        <option value="views-asc">조회수 낮은순</option>
        <option value="title-asc">제목순 (A-Z)</option>
      </select>
      <svg
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
)

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
      className="bg-gradient-to-br from-[#262626] to-[#212121] rounded-lg overflow-hidden hover:scale-105 transition-all w-full border border-[#52525B] mt-1"
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
              className={`text-lg md:text-2xl font-bold mt-3 md:mt-5 border-none break-keep line-clamp-2 pb-0 md:h-[64px] h-[30px] md:mb-3 mb-1`}
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
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-4 w-full">
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
  const postsCountRef = React.useRef(null)

  const tagList = new Set()
  posts.forEach(post => {
    post.frontmatter.tags.forEach(tag => tagList.add(tag))
  })

  const [selectedTag, setSelectedTag] = useState(
    new URLSearchParams(location.search).get("tag") || ""
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date-desc")

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    if (selectedTag) {
      queryParams.set("tag", selectedTag)
      // 태그가 선택되었을 때 스크롤 이동
      if (postsCountRef.current) {
        postsCountRef.current.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      queryParams.delete("tag")
    }
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${queryParams.toString()}`
    )
  }, [selectedTag, location.pathname, location.search])

  // 필터링 및 검색
  let filteredPosts = selectedTag
    ? posts.filter(post => post.frontmatter.tags.includes(selectedTag))
    : posts

  if (searchQuery) {
    filteredPosts = filteredPosts.filter(
      post =>
        post.frontmatter.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        post.frontmatter.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        post.frontmatter.tags.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
  }

  // 정렬
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
      case "date-asc":
        return new Date(a.frontmatter.date) - new Date(b.frontmatter.date)
      case "title-asc":
        return a.frontmatter.title.localeCompare(b.frontmatter.title)
      case "views-desc":
      case "views-asc":
        // 조회수 정렬은 클라이언트에서는 정확하지 않을 수 있음 (비동기 로딩)
        return 0
      default:
        return 0
    }
  })

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
      <HotSection posts={posts} />

      <p
        ref={postsCountRef}
        className="text-xl md:text-3xl font-bold text-white m-0 mt-5 scroll-mt-10"
      >
        {selectedTag === "" ? "All " : `${selectedTag} `}
        {sortedPosts.length} Posts
      </p>
      <TagFilter
        tagList={tagList}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <SearchAndSort
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <PostList posts={sortedPosts} />
    </Layout>
  )
}

export default BlogIndex

export const Head = () => (
  <Seo
    title="난너의오른팔 기술블로그"
    author="정인영"
    description="Web 기술과 AI에 관심있는 개발자, 정인영 기술 블로그"
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
