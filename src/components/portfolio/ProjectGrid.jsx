import React from "react"
import projects from "../../data/projects.json"
import ProjectCard from "./_ProjectCard"

const DOMAIN_ORDER = ["Front-end", "Full-stack", "AI", "Art-Tech"]

const groupByDomain = () => {
  const groups = DOMAIN_ORDER.map(tag => ({
    tag,
    items: projects.filter(project => (project.domainTags || []).includes(tag)),
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

  return (
    <section id="projects" className="portfolio-all-projects">
      <h2 className="portfolio-section-title text-center mb-4">All Projects</h2>
      <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        Explore the full stack of experiments, products, and research.
      </p>

      <div className="max-w-6xl mx-auto space-y-12">
        {groupedProjects.map(group => (
          <div key={group.tag}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-cyan-300 uppercase">
                {group.tag}
              </h3>
              <span className="text-xs uppercase tracking-widest text-gray-500">
                {group.items.length} project
                {group.items.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="portfolio-projects-grid">
              {group.items.map(project => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
