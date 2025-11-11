import React from "react"

const badgeClasses =
  "inline-flex items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100"

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
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101010] shadow-[0_20px_60px_-40px_rgba(0,224,255,0.6)] transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-[0_25px_70px_-40px_rgba(0,224,255,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
    >
      {thumbnail && (
        <div className="relative h-48 w-full overflow-hidden bg-black/60">
          <img
            src={thumbnail}
            alt={`${title} thumbnail`}
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
          {year && (
            <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
              {year}
            </div>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h4 className="text-xl font-bold text-white">{title}</h4>
          {summary && <p className="mt-2 text-sm text-white/70">{summary}</p>}
        </div>
        {!!techStack.length && (
          <div className="flex flex-wrap gap-2">
            {techStack.map(tech => (
              <span key={tech} className={badgeClasses}>
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
