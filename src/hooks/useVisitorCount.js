import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { trackVisitor } from "../lib/trackVisitor"

export const useVisitorCount = () => {
  const [todayCount, setTodayCount] = useState(null)
  const [totalCount, setTotalCount] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    const fetchVisitors = async () => {
      try {
        // 조회수 추적 (이미 추적되었으면 아무것도 하지 않음)
        await trackVisitor()

        // 오늘 날짜 (YYYY-MM-DD 형식)
        const today = new Date().toISOString().split("T")[0]

        // 오늘 방문자수 조회
        const { count: todayCount, error: todayError } = await supabase
          .from("visits")
          .select("*", { count: "exact", head: true })
          .eq("visit_date", today)

        if (todayError) throw todayError

        // 전체 방문자수 조회
        const { count: totalCount, error: totalError } = await supabase
          .from("visits")
          .select("*", { count: "exact", head: true })

        if (totalError) throw totalError

        setTodayCount(todayCount || 0)
        setTotalCount(totalCount || 0)
      } catch (error) {
        console.error("Error fetching visitors:", error)
        // 에러 발생 시 기본값 설정
        setTodayCount(0)
        setTotalCount(0)
      } finally {
        setLoading(false)
      }
    }

    fetchVisitors()
  }, [])

  // 숫자를 포맷팅 (예: 1234 -> "1.2K")
  const formatCount = count => {
    if (count === null || count === undefined) return "0"
    if (count < 1000) return count.toString()
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`
    return `${(count / 1000000).toFixed(1)}M`
  }

  return {
    todayCount,
    totalCount,
    formattedToday: formatCount(todayCount),
    formattedTotal: formatCount(totalCount),
    loading,
  }
}
