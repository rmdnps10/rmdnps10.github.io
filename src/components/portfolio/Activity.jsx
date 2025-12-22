import React, { useState, useEffect } from "react"
import activities from "../../data/activity.json"

const GROUP_LABELS = {
  Award: "Awards",
  Certification: "Certifications",
  Leadership: "Leadership",
}

const useMediaQuery = query => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [matches, query])

  return matches
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

// Define responsive font sizes using CSS clamp()
// This ensures fonts scale smoothly across all viewport widths
const activityStyles = `
  .activity-heading {
    font-size: clamp(32px, 5vw, 50px);
  }
  .activity-title {
    font-size: clamp(16px, 2.5vw, 20px);
  }
  .activity-org {
    font-size: clamp(14px, 2vw, 18px);
  }
  .activity-year {
    font-size: clamp(10px, 1.5vw, 12px);
  }
`

export default function Activity() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  // Render in the requested order (Community, Award, Certification)
  const groupOrder = ["Leadership", "Award", "Certification"]

  return (
    <section
      id="activity"
      className="portfolio-activity py-8 md:py-16 mt-[100px] md:mt-[200px]"
    >
      <style>{activityStyles}</style>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[50px] md:gap-[100px]">
          {groupOrder.map((label, index) => {
            const list = groupedActivities[label]
            if (!list) return null

            const heading = GROUP_LABELS[label] || label

            return (
              <div
                key={label}
                className="md:min-h-[3000px]"
                style={{
                  paddingTop: isDesktop ? `${index * 40}vh` : 0,
                }}
              >
                <div className="md:sticky md:top-20 mb-[50px] md:mb-[500px]">
                  <h3 className="activity-heading font-paperozi border-none font-bold text-stroke mb-0">
                    {heading}
                  </h3>

                  <div className="flex flex-col gap-[10px] mt-[10px]">
                    {list.map(activity => (
                      <div
                        key={`${label}-${activity.title}`}
                        className="flex flex-col gap-0"
                      >
                        <p className="activity-title m-0 font-light font-paperozi mt-2">
                          {activity.title}
                        </p>
                        <p className="activity-org font-paperozi m-0">
                          {activity.organization}
                        </p>
                        <p className="activity-year text-right">
                          {String(activity.year)}
                        </p>
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
