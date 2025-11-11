import React from "react"
import profile from "../../data/profile.json"

const formatLabel = key =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^\w/, c => c.toUpperCase())
    .trim()

const sectionStyle = {
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
  marginRight: "calc(50% - 50vw)",
}

export default function About() {
  const { tagline, summary, education, skills } = profile

  return (
    <section
      id="about"
      className="portfolio-section bg-black/90 px-6 py-24 text-white"
      style={sectionStyle}
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr,1fr] md:gap-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-200">
            About
          </p>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">{tagline}</h2>
          <p className="mt-6 text-lg text-white/70 md:text-xl">{summary}</p>
          <p className="mt-6 text-base text-white/60">
            <span className="font-semibold text-white">{education}</span>
          </p>
        </div>
        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          {Object.entries(skills).map(([key, list]) => (
            <div key={key} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100/80">
                {formatLabel(key)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {list.map(item => (
                  <span
                    key={item}
                    className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-sm text-white/80"
                  >
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
