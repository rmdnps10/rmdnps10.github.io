import React from "react"

export default function FooterSignature() {
  const footerStyle = {
    width: "100vw",
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
  }

  return (
    <footer
      className="portfolio-footer bg-black px-6 pb-24 pt-16 text-center text-sm text-white/60"
      style={footerStyle}
    >
      Designed &amp; built by Chung Inyoung, 2025
      <br />
      <span className="text-white/40">
        Where AI meets Art &amp; Technology.
      </span>
    </footer>
  )
}
