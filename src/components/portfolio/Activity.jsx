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

export default function Activity() {
  return (
    <section id="activity" className="portfolio-activity">
      <h2 className="portfolio-section-title text-center mb-8">Activity</h2>
      <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        Communities, awards, and certifications.
      </p>

      <div className="portfolio-activity-grid">
        {Object.entries(groupedActivities).map(([label, list]) => (
          <div key={label} className="portfolio-activity-card">
            <h3 className="text-cyan-300 uppercase text-xs tracking-widest">
              {label}
            </h3>
            <ul className="mt-4 space-y-3">
              {list.map(activity => (
                <li key={`${label}-${activity.title}`} className="text-sm">
                  <span className="font-semibold text-white">
                    {activity.title}
                  </span>
                  <p className="text-gray-400 text-xs mt-1">
                    {activity.organization}
                  </p>
                  {activity.year && (
                    <span className="inline-block mt-2 rounded-full bg-yellow-400/20 border border-yellow-400/30 px-2 py-0.5 text-[11px] uppercase tracking-wider text-yellow-300">
                      {activity.year}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
