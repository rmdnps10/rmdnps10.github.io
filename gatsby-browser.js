// custom typefaces
import "@fontsource-variable/montserrat"
import "@fontsource/merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "prismjs/themes/prism-twilight.css"
import "./src/global.css"
import "./src/styles/code-highlight.css"
import "./src/styles/image.css"
import "./src/styles/sidebar.css"
import "./src/styles/table.css"
import "./src/styles/typography.css"

// Highlighting for code blocks
import "remark-admonitions/styles/classic.css"

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { trackVisitor } from "./src/lib/trackVisitor"
config.autoAddCss = false

// 조회수 추적

/**
 * 초기 페이지 로드 시 조회수 추적
 */
export const onInitialClientRender = () => {
  trackVisitor()
}

/**
 * 페이지 이동 시 조회수 추적
 */
export const onRouteUpdate = () => {
  trackVisitor()
}
