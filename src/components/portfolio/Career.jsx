import React from "react"
import roles from "../../data/career.json"

const formatPeriod = period => {
  if (!period) return ""
  const { start, end } = period
  return `${start.replace("-", ".")} – ${end.replace("-", ".")}`
}

export default function Career() {
  return (
    <section id="career" className="portfolio-career">
      <h2 className="portfolio-section-title text-center mb-8">Career</h2>
      <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        Experience that bridges product, people, and AI.
      </p>

      <div className="portfolio-timeline">
        {roles.map(role => (
          <div key={role.organization} className="portfolio-career-item">
            <div className="portfolio-career-date">
              {formatPeriod(role.period)}
            </div>
            <div className="portfolio-career-card">
              <h3 className="text-purple-300">{role.organization}</h3>
              <p className="text-yellow-400 font-semibold">{role.position}</p>
              <ul className="mt-3 space-y-1">
                {role.highlights?.map(highlight => (
                  <li key={highlight} className="text-gray-300 text-sm">
                    • {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
