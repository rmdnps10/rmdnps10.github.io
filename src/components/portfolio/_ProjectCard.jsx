import React from "react"

export default function ProjectCard({
  title,
  techStack = [],
  year,
  githubUrl,
  thumbnail,
  summary,
}) {
  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noreferrer"
      className="portfolio-project-card"
    >
      {thumbnail && (
        <div className="portfolio-project-thumbnail">
          <img
            src={thumbnail}
            alt={`${title} thumbnail`}
            className="w-full h-full object-cover"
          />
          {year && (
            <div className="absolute top-3 left-3 bg-cyan-500/80 text-white text-xs px-2 py-1 rounded">
              {year}
            </div>
          )}
        </div>
      )}
      <div className="portfolio-project-info">
        <h3>{title}</h3>
        {summary && <p className="text-gray-400">{summary}</p>}

        {!!techStack.length && (
          <div className="portfolio-tech-tags">
            {techStack.map(tech => (
              <span key={tech} className="portfolio-tech-tag">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
