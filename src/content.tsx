import skull from "data-base64:~/../assets/skull.png"
import css from "data-text:~styles.css"
import type { PlasmoCSConfig } from "plasmo"
import { useState } from "react"

import { useDeathClock } from "~/useDeathClock"

export const config: PlasmoCSConfig = {
  matches: [
    "https://x.com/*",
    "https://www.facebook.com/*",
    "https://www.youtube.com/*",
    "https://www.instagram.com/*",
    "https://www.reddit.com/*",
    "https://www.linkedin.com/*",
    "https://vk.com/*"
  ],
  all_frames: true
}

const injectStyles = () => {
  const style = document.createElement("style")
  style.textContent = css
  document.body.insertAdjacentElement("beforebegin", style)
}

const injectContainer = () => {
  const container = document.createElement("div")
  container.classList.add("smdc")
  container.style.cssText = "z-index: 99999999999;"
  document.body.insertAdjacentElement("afterbegin", container)
}

export const getRootContainer = async () => {
  injectStyles()
  injectContainer()
  return document.querySelector(".smdc")
}

export default function DeathClockBanner() {
  const [showTimer, setShowTimer] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const { birthdate, timeLeft, setBirthdate } = useDeathClock()

  return (
    <div
      className="fixed bottom-0 left-0 right-0 m-4 font-sans flex justify-center items-center z-[999999999]"
      style={{ pointerEvents: "none" }}>
      <div
        className={`p-2 ${showTimer ? "px-8" : "px-4"} bg-black text-white rounded-full border border-zinc-800 shadow-2xl cursor-default relative hover:cursor-pointer`}
        style={{ pointerEvents: "auto" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => timeLeft && setShowTimer((currTimer) => !currTimer)}>
        {showTimer ? (
          <>
            {!birthdate && (
              <div className="">
                <div className="text-xs uppercase tracking-wider mb-2">
                  When were you born?
                </div>
                <input
                  type="date"
                  className="bg-black text-white text-sm rounded-full focus:outline-none w-full"
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
            )}

            {timeLeft && (
              <div className="relative">
                <div
                  className={`transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"}`}>
                  <div className="flex space-x-2 text-center font-mono">
                    <div className="text-sm w-8 inline-block tabular-nums">
                      {timeLeft.yearsLeft}
                    </div>
                    <div className="text-sm">:</div>
                    <div className="text-sm w-8 inline-block tabular-nums">
                      {timeLeft.daysLeft}
                    </div>
                    <div className="text-sm">:</div>
                    <div className="text-sm w-8 inline-block tabular-nums">
                      {timeLeft.hoursLeft}
                    </div>
                    <div className="text-sm">:</div>
                    <div className="text-sm w-8 inline-block tabular-nums">
                      {timeLeft.minutesLeft}
                    </div>
                    <div className="text-sm">:</div>
                    <div className="text-sm w-8 inline-block tabular-nums">
                      {timeLeft.secondsLeft}
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                  <div className="text-xs tracking-wider uppercase">
                    MAKE IT COUNT
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="cursor-pointer">
            <img src={skull} alt="Some pretty cool image" className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  )
}
