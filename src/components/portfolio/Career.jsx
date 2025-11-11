import React from "react"
import roles from "../../data/career.json"

const formatPeriod = period => {
  if (!period) return ""
  const { start, end } = period
  return `${start.replace("-", ".")} – ${end.replace("-", ".")}`
}

export default function Career() {
  return (
    <section id="career" className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12 font-paperozi text-white pb-4 max-w-fit mx-auto px-4">
        Career
      </h2>
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4">
        {roles.map((role, index) => (
          <div key={role.organization} className="relative">
            <div className="flex gap-6 pb-8 last:pb-0">
              {/* Timeline dot and date */}
              <div className="relative flex flex-col items-center flex-shrink-0">
                <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-900 relative z-10"></div>
                {/* Timeline line - positioned absolutely from dot center */}
                {index !== roles.length - 1 && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-600"></div>
                )}
                <p className="text-gray-400 font-semibold text-sm mt-0 text-center w-24 bg-darkMain relative z-10">
                  {formatPeriod(role.period)}
                </p>
              </div>

              {/* Card */}
              <div className="flex-1 border border-gray-700 rounded-lg p-5 hover:border-gray-500 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                <h3 className="text-white font-bold text-lg mb-1 border-none mt-2 font-paperozi">
                  {role.organization}
                </h3>
                <p className="text-white font-semibold text-base mb-3 font-paperozi">
                  {role.position}
                </p>
                {role.highlights && role.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {role.highlights.map(highlight => (
                      <li
                        key={highlight}
                        className="text-gray-300 text-sm flex items-start gap-2"
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
        ))}
      </div>
    </section>
  )
}
