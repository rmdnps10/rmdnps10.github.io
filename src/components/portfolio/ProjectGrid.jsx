import React from "react"
import projects from "../../data/projects.json"
import ProjectCard from "./_ProjectCard"

const DOMAIN_ORDER = ["Front-end", "Full-stack", "AI", "Art-Tech"]

const groupByDomain = () => {
  const groups = DOMAIN_ORDER.map(tag => ({
    tag,
    items: projects.filter(project =>
      (project.domainTags || []).includes(tag)
    ),
  }))

  const remaining = projects.filter(project => {
    return !DOMAIN_ORDER.some(tag => (project.domainTags || []).includes(tag))
  })

  if (remaining.length) {
    groups.push({ tag: "Other", items: remaining })
  }

  return groups.filter(group => group.items.length > 0)
}

export default function ProjectGrid() {
  const groupedProjects = groupByDomain()

  if (!groupedProjects.length) {
    return null
  }

  const sectionStyle = {
    width: "100vw",
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
  }

  return (
    <section
      id="projects"
      className="portfolio-section bg-black px-6 py-24 text-white"
      style={sectionStyle}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-200">
            All Projects
          </p>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            Explore the full stack of experiments, products, and research.
          </h2>
        </div>

        <div className="space-y-16">
          {groupedProjects.map(group => (
            <div key={group.tag} className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-white/90">
                  {group.tag}
                </h3>
                <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                  {group.items.length} projects
                </span>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {group.items.map(project => (
                  <ProjectCard key={project.slug} {...project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
