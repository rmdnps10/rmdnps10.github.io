import React from "react"
import projects from "../../data/projects.json"
import ProjectCard from "./_ProjectCard"

export default function FeaturedProjects() {
  const featured = projects.filter(project => project.featured)

  if (!featured.length) {
    return null
  }

  return (
    <section id="featured" className="py-16">
      <h2 className="text-4xl font-bold text-center mb-4 font-paperozi text-white pb-4 max-w-fit mx-auto px-4">
        Featured Projects
      </h2>

      <div className="flex gap-8 max-w-7xl mx-auto px-4">
        {featured.map(project => (
          <div key={project.slug} className="flex-1">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  )
}
