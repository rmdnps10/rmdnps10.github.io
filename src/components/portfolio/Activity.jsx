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
  const groupOrder = ["Community", "Awards", "Certifications"]

  return (
    <section id="activity" className="portfolio-activity py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8">
          {groupOrder.map((label, index) => {
            const list = groupedActivities[label]
            if (!list) return null

            return (
              <div
                key={label}
                style={{ paddingTop: `${index * 30}vh`, minHeight: "120vh" }}
              >
                <div className="sticky top-20">
                  <h3 className="mb-4 font-paperozi border-none text-[40px]">
                    {label}
                  </h3>

                  <div className="flex flex-col gap-6">
                    {list.map(activity => (
                      <div
                        key={`${label}-${activity.title}`}
                        className="flex flex-col gap-0"
                      >
                        <p className="font-semibold text-whit font-paperozi m-0">
                          {activity.title}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          {activity.organization}
                        </p>
                        <p className="text-right">{activity.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
