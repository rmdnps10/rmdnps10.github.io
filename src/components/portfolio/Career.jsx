import React from "react"
import roles from "../../data/career.json"

const formatPeriod = period => {
  if (!period) return ""
  const { start, end } = period
  return `${start.replace("-", ".")} – ${end.replace("-", ".")}`
}

const sectionStyle = {
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
  marginRight: "calc(50% - 50vw)",
}

export default function Career() {
  return (
    <section
      id="career"
      className="portfolio-section bg-[#080808] px-6 py-24 text-white"
      style={sectionStyle}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-200">
            Career
          </p>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            Experience that bridges product, people, and AI.
          </h2>
        </div>

        <ol className="relative border-l border-white/20 pl-10">
          {roles.map(role => (
            <li key={role.organization} className="mb-12 last:mb-0">
              <div className="absolute -left-[9px] mt-2 h-4 w-4 rounded-full border border-cyan-300 bg-black" />
              <span className="text-sm uppercase tracking-[0.2em] text-cyan-100/80">
                {formatPeriod(role.period)}
              </span>
              <h3 className="mt-2 text-2xl font-semibold">
                {role.organization}
              </h3>
              <p className="text-white/60">{role.position}</p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {role.highlights?.map(highlight => (
                  <li key={highlight} className="leading-relaxed">
                    • {highlight}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
