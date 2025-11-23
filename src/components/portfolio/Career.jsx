import React, { useRef, useEffect } from "react"
import roles from "../../data/career.json"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const formatPeriod = period => {
  if (!period) return ""
  const { start, end } = period
  return `${start.replace("-", ".")} – ${end.replace("-", ".")}`
}

// Hex 색상을 rgba로 변환
const hexToRgba = (hex, opacity = 0.12) => {
  if (!hex || !hex.startsWith("#")) {
    return `rgba(255, 255, 255, ${opacity})`
  }
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export default function Career() {
  const cardRefs = useRef([])

  useEffect(() => {
    cardRefs.current.forEach((cardRef, index) => {
      if (!cardRef) return

      const topBorder = cardRef.querySelector(".career-card-top-border")
      const rightBorder = cardRef.querySelector(".career-card-right-border")
      const leftBorder = cardRef.querySelector(".career-card-left-border")

      if (!topBorder || !rightBorder || !leftBorder) return

      // 위쪽 border 애니메이션
      gsap.fromTo(
        topBorder,
        { width: 0 },
        {
          width: "100%",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      )

      // 오른쪽과 왼쪽 border 동시 애니메이션 (위쪽 완료 후)
      const sideBorderTrigger = {
        trigger: cardRef,
        start: "top 50%",
        end: "top 30%",
        scrub: true,
      }

      gsap.fromTo(
        rightBorder,
        { height: 0 },
        {
          height: "100%",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: sideBorderTrigger,
        }
      )

      gsap.fromTo(
        leftBorder,
        { height: 0 },
        {
          height: "100%",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: sideBorderTrigger,
        }
      )

      // 마지막 요소의 아래쪽 border 애니메이션
      if (index === roles.length - 1) {
        const bottomBorder = cardRef.querySelector(".career-card-bottom-border")
        if (bottomBorder) {
          gsap.fromTo(
            bottomBorder,
            { width: 0 },
            {
              width: "100%",
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardRef,
                start: "top 30%",
                end: "top 10%",
                scrub: true,
              },
            }
          )
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section id="career" className="py-[500px]">
      <h2 className="text-[100px] font-bold text-center font-paperozi border-none mb-1 text-stroke">
        Internship
      </h2>

      <div className="relative max-w-4xl px-4 flex flex-col items-start w-full mt-[100px]">
        {/* 계단형 카드들 */}
        {roles.map((role, index) => {
          // 모든 카드를 2번째 요소(index 1)와 동일한 크기로 설정
          const orgFontSize = 28 // index 1의 값
          const periodFontSize = 15 // index 1의 값
          const positionFontSize = 19 // index 1의 값
          const highlightFontSize = 18 // index 1의 값
          const cardWidth = 450 // index 1의 값
          const positionPaddingX = 12 // index 1의 값
          const positionPaddingY = 5 // index 1의 값

          return (
            <div
              key={role.organization}
              ref={el => {
                cardRefs.current[index] = el
              }}
              className="relative py-[50px] px-[0px]"
              style={{
                paddingLeft: 5 + index * 30 + " ",
                width: `${cardWidth}px`,
                boxSizing: "content-box",
              }}
            >
              {/* 위쪽 border */}
              <div
                className="career-card-top-border absolute top-0 left-0 h-[4px]"
                style={{
                  width: 0,
                  backgroundColor: role.color || "#FFFFFF",
                }}
              />
              {/* 오른쪽 border */}
              <div
                className="career-card-right-border absolute top-0 right-0 w-[4px]"
                style={{
                  height: 0,
                  backgroundColor: role.color || "#FFFFFF",
                }}
              />
              {/* 왼쪽 border */}
              <div
                className="career-card-left-border absolute top-0 left-0 w-[4px]"
                style={{
                  height: 0,
                  backgroundColor: role.color || "#FFFFFF",
                }}
              />
              {/* 아래쪽 border (마지막 요소만) */}
              {index === roles.length - 1 && (
                <div
                  className="career-card-bottom-border absolute bottom-0 left-0 h-[4px]"
                  style={{
                    width: 0,
                    backgroundColor: role.color || "#FFFFFF",
                  }}
                />
              )}

              <div className="flex gap-6 pb-8 last:pb-0">
                <div className="flex-1 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className="mb-0 border-none mt-0 p-0"
                      style={{
                        color: role.color || "#FFFFFF",
                        fontSize: `${orgFontSize}px`,
                      }}
                    >
                      {role.organization}
                    </h3>
                    <span
                      className="career-period-badge inline-flex items-center px-2 py-0.5 rounded-md font-medium"
                      style={{
                        color: role.color || "#FFFFFF",
                        backgroundColor: hexToRgba(role.color, 0.15),
                        border: `1px solid ${hexToRgba(role.color, 0.3)}`,
                        fontSize: `${periodFontSize}px`,
                      }}
                    >
                      {formatPeriod(role.period)}
                    </span>
                  </div>

                  <span
                    className="career-position-button inline-flex items-center border-2 font-bold rounded-lg whitespace-nowrap mt-2 mb-3"
                    style={{
                      color: role.color || "#FFFFFF",
                      borderColor: role.color || "#FFFFFF",
                      backgroundColor: hexToRgba(role.color, 0.12),
                      boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 2px inset",
                      fontSize: `${positionFontSize}px`,
                      paddingLeft: `${positionPaddingX}px`,
                      paddingRight: `${positionPaddingX}px`,
                      paddingTop: `${positionPaddingY}px`,
                      paddingBottom: `${positionPaddingY}px`,
                    }}
                    onMouseEnter={e => {
                      const color = role.color || "#FFFFFF"
                      const rgba = hexToRgba(color, 0.8)
                      e.currentTarget.style.borderColor = rgba
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor =
                        role.color || "#FFFFFF"
                    }}
                  >
                    {role.position}
                  </span>
                  {role.highlights && role.highlights.length > 0 && (
                    <ul className="space-y-2 mb-0">
                      {role.highlights.map(highlight => (
                        <li
                          key={highlight}
                          className="text-gray-300 flex items-start gap-2"
                          style={{ fontSize: `${highlightFontSize}px` }}
                        >
                          <span className="text-white font-bold">›</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
