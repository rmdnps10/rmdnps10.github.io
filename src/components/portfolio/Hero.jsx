import React, { useState, useEffect } from "react"
import myImage from "../../images/hero/inyoung.png"
import GhostCursor from "../animation/GhostCursor"

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% {
            filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3)) 
                    drop-shadow(0 0 6px rgba(255, 255, 255, 0.2));
            opacity: 1;
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5)) 
                    drop-shadow(0 0 12px rgba(255, 255, 255, 0.3));
            opacity: 1;
          }
        }
        
        .twinkle-effect {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
      <section
        id="hero"
        className="relative overflow-hidden w-full h-[calc(100vh_-_53px)]"
      >
        <h1 className="absolute top-[10px] left-[10px] text-[24px] md:text-[5vw] text-white">
          소프트웨어 개발자, 정인영입니다.{" "}
        </h1>

        <p className="hidden md:block absolute bottom-[100px] right-[10px] text-white text-[14px]">
          위에 빈 공간에 커서를 올려주세요.
        </p>
        <h1 className="text-[16px] md:text-[3vw] text-white absolute bottom-[20px] left-[10px] md:left-auto md:right-[10px]">
          a.k.a 난너의오른팔{" "}
        </h1>
        <div
          className="hidden md:block"
          style={{
            width: "50%",
            height: "250px",
            position: "absolute",
            top: "200px",
            right: 0,
          }}
        >
          <GhostCursor
            // Visuals
            className={"h-full"}
            color="#000000"
            brightness={6}
            edgeIntensity={0}
            // Trail and motion
            trailLength={100}
            inertia={0.5}
            // Post-processing
            grainIntensity={0.05}
            bloomStrength={0.3}
            bloomRadius={1.0}
            bloomThreshold={0.025}
            // Fade-out behavior
            fadeDelayMs={1000}
            fadeDurationMs={1500}
          />

          <div className="absolute top-[30px] left-[30px] ">
            <p className="text-[#1e1e1d] text-[20px]">
              전공수업, 대외활동에서의 풍부한 개발 협업 경험 (Fe/Be)
            </p>
            <p className="text-[#1e1e1d] text-[20px]">
              1년동안 2번의 서비스 개발 인턴 경험
            </p>
            <p className="text-[#1e1e1d] text-[20px]">
              스스로 글을 작성하며 CS 기초를 다집니다.
            </p>
            <p className="text-[#1e1e1d] text-[20px]">
              Cursor, Windsurf와 같은 AI 툴을 잘 사용하기 위해 노력합니다.
            </p>
          </div>
        </div>
        <div
          className={`absolute bottom-[100px] left-[10px] w-[250px] h-[250px] md:w-[500px] md:h-[500px] z-10 bg-[#1e1e1d] transition-transform duration-1000 ease-out ${
            isMounted ? "translate-y-full" : "translate-y-0"
          }`}
        ></div>
        <img
          src={myImage}
          alt="myImage"
          className="absolute bottom-[100px] left-[10px] w-[350px] md:w-[500px] twinkle-effect"
        />
      </section>
    </>
  )
}
