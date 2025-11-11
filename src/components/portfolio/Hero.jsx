import React from "react"

const gradientStyle = {
  background:
    "radial-gradient(circle at 20% 20%, rgba(0,224,255,0.25) 0%, rgba(12,12,12,0.9) 45%), radial-gradient(circle at 80% 30%, rgba(192,132,252,0.25) 0%, rgba(12,12,12,0.95) 55%), #050505",
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
  marginRight: "calc(50% - 50vw)",
  marginTop: "calc(-1 * var(--spacing-10))",
}

export default function Hero() {
  return (
    <section
      className="portfolio-hero relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center text-white"
      style={gradientStyle}
    >
      <div className="relative z-10 max-w-4xl space-y-8">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-cyan-200">
          AI-Driven Developer
        </p>
        <h1 className="text-4xl font-black leading-tight md:text-6xl lg:text-7xl">
          CHUNG INYOUNG — <span className="text-white/80">Software Developer</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-white/70 md:text-2xl">
          I think, learn, and build with AI.
        </p>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,224,255,0.35),transparent_60%)] opacity-60 mix-blend-screen" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
    </section>
  )
}
