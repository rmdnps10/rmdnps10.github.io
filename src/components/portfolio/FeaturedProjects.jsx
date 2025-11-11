import React from "react"
import projects from "../../data/projects.json"
import ProjectCard from "./_ProjectCard"

export default function FeaturedProjects() {
  const featured = projects.filter(project => project.featured)

  if (!featured.length) {
    return null
  }

  return (
    <section id="featured" className="portfolio-featured-projects">
      <h2 className="portfolio-section-title text-center mb-4">
        Featured Projects
      </h2>
      <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        Selected work exploring AI, product, and experience design.
      </p>

      <div className="portfolio-projects-grid">
        {featured.map(project => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </section>
  )
}
