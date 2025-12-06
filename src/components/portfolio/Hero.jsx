import React, { useState, useEffect } from "react"
import myImage from "../../images/hero/inyoung.png"

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
        <h1 className="absolute top-[10px] left-[10px] text-[5vw] text-white">
          소프트웨어 개발자, 정인영입니다.{" "}
        </h1>

        <h1 className="text-[3vw] text-white absolute bottom-[40px] right-[10px]">
          a.k.a 난너의오른팔{" "}
        </h1>

        <div
          className={`absolute bottom-[100px] left-[10px] w-[500px] h-[500px] z-10 bg-[#1e1e1d] transition-transform duration-1000 ease-out ${
            isMounted ? "translate-y-full" : "translate-y-0"
          }`}
        ></div>
        <img
          src={myImage}
          alt="myImage"
          className="absolute bottom-[100px] left-[10px] w-[500px] twinkle-effect"
        />
      </section>
    </>
  )
}
