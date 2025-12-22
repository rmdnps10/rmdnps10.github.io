import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules"
import featuredProjects from "../../data/featured-projects.json"
import FeaturedProjectCard from "./_FeaturedProjectCard"

// Swiper 스타일 import
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function FeaturedProjects() {
  const featured = featuredProjects

  if (!featured.length) {
    return null
  }

  return (
    <section id="featured" className="pt-[100px] md:pt-[200px] pb-[50px] md:pb-[100px]">
      <div className="w-full">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-6 md:mb-12 mt-6 md:mt-12">
          <h2 className="font-bold mb-2 font-paperozi border-none text-[40px] md:text-[80px] text-stroke px-4">
            Featured Projects
          </h2>
        </div>

        {/* Fancy Carousel */}
        <div className="w-full py-12 overflow-hidden">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            }}
            navigation={false}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop={false}
            initialSlide={Math.floor(featured.length / 2)}
            watchSlidesProgress={true}
            speed={600}
            spaceBetween={30}
            modules={[EffectCoverflow, Navigation, Pagination]}
            className="featured-swiper"
            style={{
              paddingBottom: "60px",
            }}
          >
            {featured.map((project, index) => {
              // 각 프로젝트에 맞는 태그 텍스트 결정
              const tagText = project.domainTags?.includes("AI")
                ? "AI"
                : project.domainTags?.includes("Full-stack")
                ? "Full-stack"
                : project.domainTags?.includes("Front-end")
                ? "Frontend"
                : project.domainTags?.[0] || ""

              return (
                <SwiperSlide key={project.slug} className="!w-auto">
                  <div className="w-[600px] max-w-[90vw] relative">
                    {/* 카드 위 텍스트 */}
                    {tagText && (
                      <div
                        className="absolute -top-8 md:-top-12 left-1/2 transform -translate-x-1/2 z-20"
                        style={{
                          fontSize: "clamp(24px, 5vw, 48px)",
                          fontWeight: 700,
                          color: "rgba(255, 255, 255, 0.9)",
                          textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                          fontFamily: "Paperozi, sans-serif",
                        }}
                      >
                        {tagText}
                      </div>
                    )}
                    <FeaturedProjectCard {...project} colorIndex={index} />
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
