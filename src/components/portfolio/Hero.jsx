import React from "react"

export default function Hero() {
  return (
    <section className="portfolio-hero relative flex flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="relative z-10 max-w-4xl space-y-8">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-yellow-300">
          AI-Driven Developer
        </p>
        <h1 className="text-4xl font-black leading-tight md:text-6xl lg:text-7xl text-white">
          CHUNG INYOUNG —{" "}
          <span className="text-gray-400">Software Developer</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-2xl text-gray-400">
          I think, learn, and build with AI.
        </p>
      </div>
    </section>
  )
}
