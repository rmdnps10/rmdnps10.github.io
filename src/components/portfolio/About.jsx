import React from "react"
import profile from "../../data/profile.json"

const formatLabel = key =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^\w/, c => c.toUpperCase())
    .trim()

export default function About() {
  const { tagline, summary, education, skills } = profile

  return (
    <section id="about" className="portfolio-about">
      <div className="portfolio-about-content">
        <div>
          <h2 className="portfolio-section-title">{tagline}</h2>
          <p className="portfolio-about-text">{summary}</p>
          <p className="portfolio-about-text mt-4">
            <span className="font-semibold text-cyan-300">📚 {education}</span>
          </p>
        </div>
        <div className="portfolio-skills-grid">
          {Object.entries(skills).map(([key, list]) => (
            <div key={key} className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-yellow-400 font-semibold">
                {formatLabel(key)}
              </p>
              <div className="flex flex-wrap gap-1">
                {list.map(item => (
                  <span key={item} className="portfolio-skill-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
