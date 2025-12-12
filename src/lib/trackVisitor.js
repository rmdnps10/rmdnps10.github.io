import { supabase } from "./supabase"

/**
 * 조회수 추적 함수
 * 하루에 한 번만 추적하도록 localStorage를 사용합니다.
 */
export const trackVisitor = async () => {
  if (!supabase) {
    return
  }

  try {
    // 오늘 날짜 (YYYY-MM-DD 형식)
    const today = new Date().toISOString().split("T")[0]
    const storageKey = `visit_tracked_${today}`

    // 오늘 이미 방문 추적했는지 확인 (localStorage 사용)
    const alreadyTracked =
      typeof window !== "undefined" && localStorage.getItem(storageKey)

    // 오늘 첫 방문인 경우에만 기록 추가
    if (!alreadyTracked) {
      await supabase.from("visits").insert([{ visit_date: today }])

      // localStorage에 기록
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, "true")
      }
    }
  } catch (error) {
    console.error("Error tracking visitor:", error)
  }
}
