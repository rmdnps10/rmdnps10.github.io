import React, { useRef, useEffect } from "react"
import roles from "../../data/career.json"

// 이미지 import - 인덱스 순서대로
import careerImage1 from "../../images/career/1.png"
import careerImage2 from "../../images/career/2.png"
import careerImage3 from "../../images/career/3.png"

// 인덱스 기반 이미지 배열
const careerImages = [careerImage1, careerImage2, careerImage3]

const formatPeriod = period => {
  if (!period) return ""
  const { start, end } = period
  return `${start.replace("-", ".")} – ${end.replace("-", ".")}`
}

export default function Career() {
  return (
    <section id="career" className="py-[500px]">
      <h2 className="text-[100px] font-bold text-center font-paperozi border-none mb-1 text-stroke">
        Internship
      </h2>

      <div className="relative px-4 flex flex-col items-start w-full mt-[100px] gap-[100px]">
        {/* 계단형 카드들 */}
        {roles.map((role, index) => {
          return (
            <div
              key={role.organization}
              className="relative py-[50px] px-[0px]"
              style={{
                paddingLeft: 5 + index * 30 + " ",
                boxSizing: "content-box",
              }}
            >
              <div className="flex gap-6 pb-8 last:pb-0">
                {/* 이미지 섹션 */}
                {careerImages[index] && (
                  <div className="flex-shrink-0">
                    <img
                      src={careerImages[index]}
                      alt={role.organization}
                      className="w-[400px] h-[300px] object-cover border-2"
                      style={{
                        borderColor: role.color || "#FFFFFF",
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 transition-all">
                  <div className="flex items-center gap-3 mb-0">
                    <h3
                      className="mb-0 border-none mt-0 p-0"
                      style={{
                        color: role.color || "#FFFFFF",
                      }}
                    >
                      {role.organization}
                    </h3>
                    <span
                      className="career-period-badge inline-flex items-center px-2 py-0.5 rounded-md font-medium"
                      style={{
                        color: role.color || "#FFFFFF",
                      }}
                    >
                      {formatPeriod(role.period)}
                    </span>
                  </div>

                  <span
                    className="career-position-button inline-flex items-center border-2 font-bold rounded-lg whitespace-nowrap mt-2 mb-3 px-2 py-1"
                    style={{
                      color: role.color || "#FFFFFF",
                      borderColor: role.color || "#FFFFFF",
                      boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 2px inset",
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor =
                        role.color || "#FFFFFF"
                    }}
                  >
                    {role.position}
                  </span>

                  {role.highlights && role.highlights.length > 0 && (
                    <ul className="space-y-2 mb-0 mt-3 w-full">
                      {role.highlights.map(highlight => (
                        <li
                          key={highlight}
                          className="text-gray-300 flex items-start gap-2"
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
