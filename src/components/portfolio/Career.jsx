import React from "react"
import roles from "../../data/career.json"

const formatPeriod = period => {
  if (!period) return ""
  const { start, end } = period
  return `${start.replace("-", ".")} – ${end.replace("-", ".")}`
}

export default function Career() {
  return (
    <section id="career" className="py-16 mt-[200px]">
      <h2 className="text-[50px] font-bold text-center font-paperozi text-white border-none mb-10">
        Career
      </h2>
      <div className="max-w-4xl px-4 flex flex-col gap-[80px] items-start w-full">
        {roles.map((role, index) => (
          <div key={role.organization} className="relative w-[50%]">
            <div className="flex gap-6 pb-8 last:pb-0">
              {/* Card */}
              <div className="flex-1 transition-all">
                <h3
                  className="font-bold text-[22px] mb-0 border-none  mt-0 p-0"
                  style={{ color: role.color || "#FFFFFF" }}
                >
                  {role.organization}{" "}
                  <span className="text-[13px] pl-4 text-white/80">
                    {formatPeriod(role.period)}
                  </span>
                </h3>
                <p className="text-white font-semibold text-base mb-3">
                  {role.position}
                </p>
                {role.highlights && role.highlights.length > 0 && (
                  <ul className="space-y-2 mb-0">
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
              <div></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
