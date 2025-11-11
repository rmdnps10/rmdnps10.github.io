import React from "react"
import projects from "../../data/projects.json"
import ProjectCard from "./_ProjectCard"

export default function FeaturedProjects() {
  const featured = projects.filter(project => project.featured)

  if (!featured.length) {
    return null
  }

  const sectionStyle = {
    width: "100vw",
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
  }

  return (
    <section
      id="featured"
      className="portfolio-section bg-[#060606] px-6 py-24 text-white"
      style={sectionStyle}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-200">
            Featured Projects
          </p>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            Selected work exploring AI, product, and experience design.
          </h2>
          <p className="mt-4 text-base text-white/70">
            Each project blends technical precision with human-centered
            storytelling, and links directly to the GitHub repository.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map(project => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
