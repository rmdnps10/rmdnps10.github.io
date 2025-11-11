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
      className="block border border-gray-700 rounded-lg overflow-hidden hover:border-gray-500 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 bg-transparent"
    >
      {thumbnail && (
        <div className="relative aspect-video overflow-hidden bg-gray-800">
          <img
            src={thumbnail}
            alt={`${title} thumbnail`}
            className="w-full h-full object-cover"
          />
          {year && (
            <div className="absolute top-3 right-3 bg-cyan-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {year}
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-white font-bold text-xl mb-3 border-none">
          {title}
        </h3>
        {summary && (
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            {summary}
          </p>
        )}

        {!!techStack.length && (
          <div className="flex flex-wrap gap-2">
            {techStack.map(tech => (
              <span
                key={tech}
                className="inline-block px-3 py-1 text-xs font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
