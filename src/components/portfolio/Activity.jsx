import React from "react"
import activities from "../../data/activity.json"

const GROUP_LABELS = {
  Award: "Awards",
  Certification: "Certifications",
  Community: "Community",
}

// Support two shapes for activities data:
// 1) Array of items with `type` field (legacy)
// 2) Object with grouped arrays: { Community: [...], Award: [...], Certification: [...] }
let groupedActivities = {}
if (Array.isArray(activities)) {
  groupedActivities = activities.reduce((acc, item) => {
    const key = item.type || "Other"
    acc[key] = acc[key] || []
    acc[key].push(item)
    return acc
  }, {})
} else if (activities && typeof activities === "object") {
  groupedActivities = activities
}

export default function Activity() {
  // Render in the requested order (Community, Award, Certification)
  const groupOrder = ["Community", "Award", "Certification"]

  return (
    <section id="activity" className="portfolio-activity py-16 mt-[200px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-[100px]">
          {groupOrder.map((label, index) => {
            const list = groupedActivities[label]
            if (!list) return null

            const heading = GROUP_LABELS[label] || label

            return (
              <div
                key={label}
                style={{ paddingTop: `${index * 40}vh`, minHeight: "200vh" }}
              >
                <div className="sticky top-20">
                  <h3 className="font-paperozi border-none text-[50px] font-bold mb-5 text-white">
                    {heading}
                  </h3>

                  <div className="flex flex-col gap-6">
                    {list.map(activity => (
                      <div
                        key={`${label}-${activity.title}`}
                        className="flex flex-col gap-0"
                      >
                        <p className="font-semibold text-[18px] font-paperozi m-0">
                          {activity.organization}
                        </p>
                        <p className="text-xs m-0 font-light font-paperozi text-[15px] mt-2">
                          {activity.title}
                        </p>
                        <p className="text-right">{String(activity.year)}</p>
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
