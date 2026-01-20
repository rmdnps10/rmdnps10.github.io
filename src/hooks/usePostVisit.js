import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { getPostVisitInfo } from "../lib/trackPostVisit"

/**
 * 게시물별 방문 정보를 가져오는 Hook
 * @param {string} postSlug - 게시물 slug
 */
export const usePostVisit = postSlug => {
  const [visitCount, setVisitCount] = useState(0)
  const [lastVisitedAt, setLastVisitedAt] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase || !postSlug) {
      setLoading(false)
      return
    }

    const fetchPostVisitInfo = async () => {
      try {
        const { visitCount, lastVisitedAt } = await getPostVisitInfo(postSlug)
        setVisitCount(visitCount)
        setLastVisitedAt(lastVisitedAt)
      } catch (error) {
        console.error("Error fetching post visit info:", error)
        setVisitCount(0)
        setLastVisitedAt(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPostVisitInfo()
  }, [postSlug])

  // 숫자를 포맷팅 (예: 1234 -> "1.2K")
  const formatCount = count => {
    if (count === null || count === undefined) return "0"
    if (count < 1000) return count.toString()
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`
    return `${(count / 1000000).toFixed(1)}M`
  }

  // 시간을 상대적 형식으로 포맷팅 (예: "2시간 전", "3일 전")
  const formatRelativeTime = dateString => {
    if (!dateString) return null

    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date

    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "방금 전"
    if (minutes < 60) return `${minutes}분 전`
    if (hours < 24) return `${hours}시간 전`
    if (days < 30) return `${days}일 전`
    if (days < 365) return `${Math.floor(days / 30)}개월 전`
    return `${Math.floor(days / 365)}년 전`
  }

  return {
    visitCount,
    lastVisitedAt,
    formattedCount: formatCount(visitCount),
    formattedTime: formatRelativeTime(lastVisitedAt),
    loading,
  }
}
