import React from "react"
import {
  SiReact,
  SiNextdotjs,
  SiGatsby,
  SiExpress,
  SiFastapi,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiC,
  SiJava,
} from "react-icons/si"

export default function About() {
  return (
    <section id="about" className="portfolio-about">
      <div className="flex w-full justify-between">
        <div>
          <h1 className="text-[20px] font-semibold">Software Developer</h1>
          <div>
            <div className="flex gap-2">
              <p className="text-white font-semibold">Email.</p>
              <p className="text-white">rmdnps10@gmail.com</p>
            </div>
            <div className="flex gap-2">
              <p className="text-white font-semibold">Birth.</p>
              <p className="text-white">2001.12.15</p>
            </div>
            <div className="flex gap-2">
              <p className="text-white font-semibold">Residence.</p>
              <p className="text-white">Seoul, Yangcheon</p>
            </div>
            <div className="flex gap-2">
              <p className="text-white font-semibold">Degree.</p>
              <p className="text-white">
                Sogang Univ. Art&Technology, Software Convergence (double major)
              </p>
            </div>
          </div>
        </div>

        {/* tech stack */}
        <div className="flex flex-col gap-4 mt-6 items-end">
          <div className="flex flex-col">
            <p className="text-white font-semibold text-right m-1 text-[14px]">
              Frontend
            </p>
            <div className="flex gap-3">
              <SiReact size={24} title="React" />
              <SiNextdotjs size={24} title="Next.js" />
              <SiGatsby size={24} title="Gatsby.js" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-white font-semibold text-right m-1">Backend</p>
            <div className="flex gap-3 justify-end">
              <SiExpress size={24} title="Express.js" />
              <SiFastapi size={24} title="FastAPI" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-white font-semibold text-right m-1">Language</p>
            <div className="flex gap-3">
              <SiTypescript size={24} title="TypeScript" />
              <SiPython size={24} title="Python" />
              <SiC size={24} title="C" />
            </div>
          </div>
        </div>
      </div>

      {/* text-animation section*/}
      <div className="text-center mt-20 font-pretendard">
        <p>
          내 손으로 내 아이디어를 구현하자 라는 모토에서 프론트엔드 개발을
          시작했습니다.
        </p>
        <p>런칭한 서비스가 처음 수익화가 되었을 때의 희열감은,</p>
        <p>
          전공 지식 학습의 원천이자 지금까지 다양한 프로젝트에 참여하는데 큰
          동기부여가 되었습니다.
        </p>
        <p>
          최근에는 AI 툴 활용과 더불어 백엔드, 시스템 프로그래밍에 관심을 가지고
          <br /> 넓은 분야의 제너릴리스트가 되기 위해 노력하고 있습니다.
        </p>
      </div>
    </section>
  )
}
