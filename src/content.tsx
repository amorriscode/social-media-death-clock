import clsx from "clsx"
import skull from "data-base64:~/../assets/skull.png"
import css from "data-text:~styles.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

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
  const [showTimer, setShowTimer] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { birthdate, timeLeft, setBirthdate } = useDeathClock()

  useEffect(() => {
    setTimeout(() => {
      setShowTimer(true)
    }, 1000)
  }, [timeLeft])

  return (
    <div
      className="fixed bottom-0 left-0 right-0 m-4 font-sans flex justify-center items-center z-[999999999]"
      style={{ pointerEvents: "none" }}>
      <div
        className={clsx(
          "h-[48px] bg-black text-white rounded-full border border-zinc-800 shadow-2xl cursor-default relative hover:cursor-pointer transition-all duration-700 overflow-hidden flex items-center justify-center",
          !showTimer ? "w-[48px]" : timeLeft ? "w-[280px]" : "w-[320px]"
        )}
        style={{ pointerEvents: "auto" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => timeLeft && setShowTimer((currTimer) => !currTimer)}>
        {showTimer && (
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
                  className={clsx(
                    "transition-opacity duration-500",
                    isHovered ? "opacity-0" : "opacity-100"
                  )}>
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
                  className={clsx(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-700",
                    isHovered ? "opacity-100" : "opacity-0"
                  )}>
                  <div className="text-xs tracking-wider uppercase">
                    MAKE IT COUNT
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <img
          src={skull}
          alt="Social Media Death Clock skull logo"
          className={clsx(
            "w-4 h-4 absolute top-0 right-0 bottom-0 left-0 m-auto transition-opacity duration-700",
            showTimer ? "opacity-0" : "opacity-100"
          )}
        />
      </div>
    </div>
  )
}
