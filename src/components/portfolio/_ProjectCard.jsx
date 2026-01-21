import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"

export default function ProjectCard({
  title,
  techStack = [],
  year,
  githubUrl,
  liveUrl,
  thumbnail,
  summary,
  role,
  domainTags = [],
  featured = false,
}) {
  const projectLabel = domainTags?.[0] || role

  return (
    <div
      className="group/card block w-full bg-[#252525] rounded-[14px] overflow-hidden relative flex flex-col"
      style={{
        boxShadow: "0 4px 18px rgba(0,0,0,0.28)",
        minHeight: "100%",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* 상단 이미지 영역 - 250px 높이 */}
      {thumbnail && (
        <div
          className="w-full h-[180px] relative"
          style={{
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* 이미지 상단 그라데이션 오버레이 */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: "70%",
              background: `linear-gradient(to bottom, #252525, transparent)`,
            }}
          />

          {/* 이미지 하단 그라데이션 오버레이 */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "70%",
              background: `linear-gradient(to top, #252525, transparent)`,
            }}
          />

          {/* 프로젝트명 */}
          <h3
            className="font-bold mb-4 leading-tight mt-0 border-none absolute bottom-0 left-[24px]"
            style={{ fontSize: "20px", color: "#FFFFFF" }}
          >
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

        {/* 설명 - flex-grow로 남은 공간 차지 */}
        {summary && (
          <div
            className="mb-6 flex-grow relative z-20"
            style={{ marginTop: "5px" }}
          >
            <p
              className="leading-relaxed m-0"
              style={{
                fontSize: "15px",
                fontWeight: 400,
                color: "white",
                lineHeight: "1.6",
              }}
            >
              {summary}
            </p>
          </div>
        )}

        {/* 아이콘 영역 - 항상 하단 고정 */}
        {(githubUrl || liveUrl) && (
          <div className="flex justify-end gap-3 mt-auto pt-4 relative z-10">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:opacity-70"
                style={{
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  style={{
                    fontSize: "20px",
                    color: "#AFAFAF",
                  }}
                />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:opacity-70"
                style={{
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  style={{
                    fontSize: "20px",
                    color: "#AFAFAF",
                  }}
                />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
