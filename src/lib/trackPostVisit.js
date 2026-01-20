import { supabase } from "./supabase"

/**
 * 게시물별 조회수 추적 함수
 * 각 게시물의 방문을 기록하고 마지막 방문 시간을 업데이트합니다.
 */
export const trackPostVisit = async postSlug => {
  if (!supabase || !postSlug) {
    return
  }

  try {
    const now = new Date().toISOString()

    // 해당 게시물의 기존 레코드 확인
    const { data: existingPost, error: fetchError } = await supabase
      .from("post_visits")
      .select("*")
      .eq("post_slug", postSlug)
      .maybeSingle()

    if (fetchError) {
      throw fetchError
    }

    if (existingPost) {
      // 기존 레코드가 있으면 방문자 수 증가 및 마지막 방문 시간 업데이트
      const { error: updateError } = await supabase
        .from("post_visits")
        .update({
          visit_count: existingPost.visit_count + 1,
          last_visited_at: now,
        })
        .eq("post_slug", postSlug)

      if (updateError) throw updateError
    } else {
      // 새로운 레코드 생성
      const { error: insertError } = await supabase.from("post_visits").insert([
        {
          post_slug: postSlug,
          visit_count: 1,
          last_visited_at: now,
        },
      ])

      if (insertError) throw insertError
    }
  } catch (error) {
    console.error("Error tracking post visit:", error)
  }
}

/**
 * 게시물의 방문 정보를 가져오는 함수
 */
export const getPostVisitInfo = async postSlug => {
  if (!supabase || !postSlug) {
    return { visitCount: 0, lastVisitedAt: null }
  }

  try {
    const { data, error } = await supabase
      .from("post_visits")
      .select("visit_count, last_visited_at")
      .eq("post_slug", postSlug)
      .maybeSingle()

    if (error) {
      throw error
    }

    // 레코드가 없는 경우
    if (!data) {
      return { visitCount: 0, lastVisitedAt: null }
    }

    return {
      visitCount: data?.visit_count || 0,
      lastVisitedAt: data?.last_visited_at || null,
    }
  } catch (error) {
    console.error("Error fetching post visit info:", error)
    return { visitCount: 0, lastVisitedAt: null }
  }
}
