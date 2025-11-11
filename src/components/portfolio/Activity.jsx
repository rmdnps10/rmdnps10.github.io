import React from "react"
import activities from "../../data/activity.json"

const GROUP_LABELS = {
  Community: "Community",
  Award: "Awards",
  Certification: "Certifications",
}

const groupedActivities = activities.reduce((acc, item) => {
  const key = GROUP_LABELS[item.type] || item.type
  acc[key] = acc[key] || []
  acc[key].push(item)
  return acc
}, {})

const sectionStyle = {
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
  marginRight: "calc(50% - 50vw)",
}

export default function Activity() {
  return (
    <section
      id="activity"
      className="portfolio-section bg-black px-6 py-24 text-white"
      style={sectionStyle}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-200">
            Activity
          </p>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            Communities, awards, and certifications.
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {Object.entries(groupedActivities).map(([label, list]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100/80">
                {label}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                {list.map(activity => (
                  <li key={`${label}-${activity.title}`}>
                    <span className="font-semibold text-white">
                      {activity.title}
                    </span>
                    <span className="text-white/60">{` — ${activity.organization}`}</span>
                    {activity.year && (
                      <span className="ml-1 rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] uppercase tracking-wider text-white/70">
                        {activity.year}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
