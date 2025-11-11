import React, { useState } from "react"
import projects from "../../data/projects.json"
import ProjectCard from "./_ProjectCard"

const DOMAIN_ORDER = ["All", "Front-end", "Full-stack", "AI", "Art-Tech"]

export default function ProjectGrid() {
  const [selectedTag, setSelectedTag] = useState("All")

  const filteredProjects =
    selectedTag === "All"
      ? projects
      : projects.filter(project =>
          (project.domainTags || []).includes(selectedTag)
        )

  if (!projects.length) {
    return null
  }

  return (
    <section id="projects" className="py-16">
      <h2 className="text-4xl font-bold text-center mb-4 font-paperozi text-white pb-4 max-w-fit mx-auto px-4">
        All Projects
      </h2>

      <div className="max-w-7xl mx-auto px-4">
        {/* 태그 필터 */}
        <div className="flex gap-3 justify-center mb-12 flex-wrap">
          {DOMAIN_ORDER.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTag === tag
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-500"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* 3x3 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            No projects found for this category.
          </p>
        )}
      </div>
    </section>
  )
}
