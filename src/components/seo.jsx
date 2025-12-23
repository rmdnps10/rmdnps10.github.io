/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({
  description,
  title,
  image,
  imageAlt,
  type = "website",
  url,
  publishedTime,
  modifiedTime,
  author,
  keywords,
  children,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author {
              name
            }
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata.title
  const siteUrl = site.siteMetadata.siteUrl
  const fullTitle = defaultTitle ? `${title} | ${defaultTitle}` : title
  const canonicalUrl = url || siteUrl
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`
    : null
  const ogImageAlt = imageAlt || title

  // 구조화된 데이터 (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "BlogPosting" : "WebSite",
    name: fullTitle,
    description: metaDescription,
    url: canonicalUrl,
    ...(type === "article" && {
      headline: title,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      author: {
        "@type": "Person",
        name: author || site.siteMetadata.author.name,
      },
      publisher: {
        "@type": "Person",
        name: site.siteMetadata.author.name,
      },
      ...(ogImage && { image: ogImage }),
    }),
    ...(type === "website" && {
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/?tag={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    }),
  }

  return (
    <>
      <html lang="ko" />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* 검색 엔진 검증 */}
      <meta
        name="google-site-verification"
        content="qF0J_4XAYAbU9SwIaK0vZrv0zfjMDParCNbO-CwMCow"
      />
      <meta
        name="naver-site-verification"
        content="6b66d2dd57797b90627f661b558aca36ceac6104"
      />

      {/* Google AdSense */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1707103676035407"
        crossOrigin="anonymous"
      />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:alt" content={ogImageAlt} />
        </>
      )}
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:locale" content="ko_KR" />
      {type === "article" && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
        </>
      )}

      {/* Twitter Card */}
      <meta
        name="twitter:card"
        content={image ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {image && <meta name="twitter:image" content={ogImage} />}
      {site.siteMetadata?.social?.twitter && (
        <meta
          name="twitter:creator"
          content={site.siteMetadata.social.twitter}
        />
      )}

      {/* 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {children}
    </>
  )
}

export default Seo
