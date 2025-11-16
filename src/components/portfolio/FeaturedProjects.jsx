import React from "react"
import featuredProjects from "../../data/featured-projects.json"
import FeaturedProjectCard from "./_FeaturedProjectCard"

export default function FeaturedProjects() {
  const featured = featuredProjects

  if (!featured.length) {
    return null
  }

  return (
    <section id="featured mt-[100px]">
      <div className="w-full">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-12" style={{ marginTop: "48px" }}>
          <h2 className="text-white font-bold mb-2 font-paperozi border-none text-[50px]" >
            Featured Projects
          </h2>
 
        </div>

        {/* 좌우 교차 배치 - Zigzag Layout (3개의 프로젝트) */}
        <div className="flex flex-col gap-[120px] mt-[100px] w-full">
          {featured.map((project, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={project.slug}
                className={`flex ${isEven ? 'justify-start' : 'justify-end'}`}
              >
                <div className="w-full max-w-[60%]">
                  <FeaturedProjectCard {...project} colorIndex={index} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
