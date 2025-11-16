import React from "react"
import {
  SiReact,
  SiNextdotjs,
  SiGatsby,
  SiExpress,
  SiFastapi,
  SiTypescript,
  SiPython,
  SiC,
} from "react-icons/si"
import { useInView } from "react-intersection-observer"
import { motion } from "motion/react"
import DecryptedText from "../animation/DecryptedText"

// Fade Up 효과가 적용된 텍스트 컴포넌트
function FadeUpBlurText({ text, delay, className }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
    rootMargin: "-50px 0px",
  })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{
        duration: 5,
        ease: [0.16, 1, 0.3, 1],
        delay: delay / 1000,
      }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {text}
    </motion.p>
  )
}

export default function About() {
  return (
    <section id="about" className="w-full">
      <div className="flex w-full justify-between">
        <div>
          <h1 className="text-[24px] font-semibold">Software Developer</h1>
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

      {/* 랜덤 애니메이션 효과 추가 */}
      <div className="text-center mt-[400px]">
        <DecryptedText
          text="안녕하세요, 소프트웨어 개발을 하고 있는 정인영입니다."
          revealDirection="start"
          sequential={true}
          animateOn="view"
          speed={100}
          className="text-white"
          parentClassName="text-[40px]"
        />
      </div>
      {/* text-animation section*/}
      <div className="text-center mt-[200px] font-extralight">
        <FadeUpBlurText
          text="내 손으로 내 아이디어를 구현하자 라는 모토에서 프론트엔드 개발을 시작했습니다."
          delay={0}
          className="w-full flex justify-center text-[24px]"
        />

        <FadeUpBlurText
          text="런칭한 서비스가 처음 수익화가 되었을 때의 희열감은,"
          delay={30}
          className="w-full flex justify-center text-[24px] "
        />

        <FadeUpBlurText
          text="전공 지식 학습의 원천이자 지금까지 다양한 프로젝트에 참여하는데 큰 동기부여가 되었습니다."
          delay={30}
          className="w-full flex justify-center text-[24px] "
        />

        <FadeUpBlurText
          text="최근에는 AI 툴 활용과 더불어 백엔드, 시스템 프로그래밍에 관심을 가지고"
          delay={30}
          className="w-full flex justify-center text-[24px] mt-[300px]"
        />

        <FadeUpBlurText
          text="넓은 분야의 제너릴리스트가 되기 위해 노력하고 있습니다."
          delay={30}
          className="w-full flex justify-center text-[24px]"
        />
      </div>
    </section>
  )
}
