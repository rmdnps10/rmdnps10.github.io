import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"

// 3개의 다른 포인트 컬러
const POINT_COLORS = [
  { color: "#4FC3F7", rgba: "rgba(79, 195, 247, 0.15)" }, // 시안
  { color: "#B39DDB", rgba: "rgba(179, 157, 219, 0.15)" }, // 보라
  { color: "#81C784", rgba: "rgba(129, 199, 132, 0.15)" }, // 그린
]

export default function FeaturedProjectCard({
  title,
  techStack = [],
  githubUrl,
  thumbnail,
  summaryList = [],
  role,
  domainTags = [],
  colorIndex = 0,
}) {
  // 프로젝트 라벨 (domainTags의 첫 번째 또는 role 사용)
  const projectLabel = domainTags?.[0] || role
  
  // 포인트 컬러 선택 (index에 따라)
  const pointColor = POINT_COLORS[colorIndex % POINT_COLORS.length]

  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noreferrer"
      className="group/card block w-full bg-[#252525] rounded-[14px] overflow-hidden relative flex flex-col"
      style={{
        boxShadow: `0 4px 20px ${pointColor.color}`,
        minHeight: "100%",
        border: `1px solid ${pointColor.color}`,
      }}
    >
      {/* 프로젝트 라벨 배지 - 오른쪽 상단 */}
      {projectLabel && (
        <div
          className="absolute top-6 right-6 px-[10px] py-1 rounded-lg text-[16px] z-10"
          style={{
            background: pointColor.rgba,
            color: pointColor.color,
          }}
        >
          {projectLabel}
        </div>
      )}
      {/* 상단 이미지 영역 - 80px 높이 */}
      {thumbnail && (
        <div 
          className="w-full h-[250px] relative"
          style={{
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
              {/* 이미지 상단 10% 그라데이션 오버레이 */}
          <div 
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: "70%",
                background: `linear-gradient(to bottom, #252525, transparent)`,
            }}
          />



          {/* 이미지 하단 10% 그라데이션 오버레이 */}
          <div 
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "70%",
              background: `linear-gradient(to top, #252525, transparent)`,
            }}
          />
            {/* 프로젝트명 */}
        <h3 className="font-bold mb-4 leading-tight mt-0 border-none absolute bottom-0 left-[24px]" style={{ fontSize: "26px", color: pointColor.color }}>
          {title}
        </h3>
        </div>
      )}

      {/* 카드 내용 - flex-grow로 공간 차지 */}
      <div className="relative flex-grow flex flex-col px-[24px] py-[15px] bg-[#252525]">

      
        {!!techStack.length && (
          <div className="flex flex-wrap gap-[6px] mb-3">
            {techStack.map(tech => (
              <span
                key={tech}
                className="inline-flex items-center px-[10px] py-1 rounded-lg text-[13px] font-normal"
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "#CFCFCF",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}


        {/* 설명 리스트 - flex-grow로 남은 공간 차지 */}
        {summaryList && Array.isArray(summaryList) && summaryList.length > 0 && (
          <div className="mb-6 flex-grow relative z-20" style={{ marginTop: "5px" }}>
            <ul className="list-none space-y-2.5 m-0 p-0">
              {summaryList.map((item, index) => (
                <li 
                  key={index} 
                  className="leading-relaxed m-0" 
                  style={{ 
                    fontSize: "15px", 
                    fontWeight: 400,
                    listStyleType: "none",
                    color: "white",
                    display: "flex",
                    alignItems: "flex-start",
                    lineHeight: "1.6"
                  }}
                >
                  <span className="mr-2 flex-shrink-0" style={{ color: pointColor.color, fontSize: "18px" }}>•</span>
                  <span style={{ flex: 1 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 아이콘 영역 - 항상 하단 고정 */}
        <div className="flex justify-end gap-3 mt-auto pt-4 relative z-10">
          <FontAwesomeIcon
            icon={faGithub}
            className="transition-colors duration-200"
            style={{
              fontSize: "36px",
              color: pointColor.color,
            }}
          />
          <FontAwesomeIcon
            icon={faExternalLinkAlt}
            className="transition-colors duration-200"
            style={{
              fontSize: "36px",
              color: pointColor.color,
            }}
          />
        </div>
      </div>
    </a>
  )
}

