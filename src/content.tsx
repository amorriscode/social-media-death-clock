import { createTheme, MantineProvider } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import clsx from "clsx"
import skull from "data-base64:~/../assets/skull.png"
import css from "data-text:~styles.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"

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

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  fontFamilyMonospace: "JetBrains Mono, monospace"
})

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
  const [isHoverDisabled, setIsHoverDisabled] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowTimer(true)
    }, 1000)
  }, [])

  function getWidth() {
    if (isHovered && !isHoverDisabled) {
      return "w-[180px]"
    }

    if (!showTimer) {
      return "w-[48px]"
    }

    if (!birthdate) {
      return "w-[295px]"
    }

    if (timeLeft) {
      return "w-[280px]"
    }

    return "w-[320px]"
  }

  function getHeight() {
    if (isHovered && !isHoverDisabled) {
      return "h-[164px]"
    }

    if (showTimer && !birthdate) {
      return "h-[320px]"
    }

    return "h-[48px]"
  }

  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      <div
        className="fixed bottom-0 left-0 right-0 m-4 font-sans flex justify-center items-center z-[999999999]"
        style={{ pointerEvents: "none" }}>
        <div
          className={clsx(
            "bg-black text-white border border-white cursor-default relative transition-all duration-700 overflow-hidden flex items-center justify-center shadow-2xl",
            getWidth(),
            getHeight(),
            isHovered && !isHoverDisabled ? "rounded-xl" : "rounded-[24px]"
          )}
          style={{ pointerEvents: "auto" }}
          onMouseEnter={() => {
            if (!isHoverDisabled && !(showTimer && !birthdate)) {
              setIsHovered(true)
            }
          }}
          onMouseLeave={() => {
            setIsHovered(false)
            setIsHoverDisabled(false)
          }}
          onClick={() => timeLeft && setShowTimer((currTimer) => !currTimer)}>
          {showTimer && !isHovered && (
            <>
              {!birthdate && (
                <div className="">
                  <div className="text-xs uppercase tracking-wider mb-2 text-center">
                    When were you born?
                  </div>

                  <DatePicker value={birthdate} onChange={setBirthdate} />
                </div>
              )}

              {timeLeft && (
                <div className="relative">
                  <div
                    className={clsx(
                      "transition-opacity duration-500",
                      isHovered && !isHoverDisabled
                        ? "opacity-0"
                        : "opacity-100"
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
                </div>
              )}
            </>
          )}

          <div
            className={clsx(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-700",
              isHovered
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            )}
            onClick={(e) => e.stopPropagation()}>
            <div className="w-[140px] mx-auto flex flex-col items-center text-xs tracking-wider uppercase space-y-4 whitespace-nowrap">
              <img src={skull} alt="Skull" className="w-4 h-4 mx-auto" />

              <div className="h-px w-[98%] bg-zinc-800" />

              {showTimer ? (
                <button
                  className="px-4 py-2 text-white rounded hover:bg-stone-500/50 transition-colors uppercase tracking-wider"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowTimer(false)
                    setIsHovered(false)
                    setIsHoverDisabled(true)
                  }}>
                  HIDE TIMER
                </button>
              ) : (
                <button
                  className="px-4 py-2 text-white rounded hover:bg-stone-500/50 transition-colors uppercase tracking-wider"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowTimer(true)
                    setIsHovered(false)
                    setIsHoverDisabled(true)
                  }}>
                  SHOW TIMER
                </button>
              )}

              {birthdate && (
                <button
                  className="px-4 py-2 text-white rounded hover:bg-stone-500/50 transition-colors uppercase tracking-wider"
                  onClick={(e) => {
                    e.stopPropagation()
                    setBirthdate(undefined)
                    setShowTimer(true)
                    setIsHovered(false)
                    setIsHoverDisabled(true)
                  }}>
                  RESET BIRTHDATE
                </button>
              )}
            </div>
          </div>

          <img
            src={skull}
            alt="Social Media Death Clock skull logo"
            className={clsx(
              "w-4 h-4 absolute top-0 right-0 bottom-0 left-0 m-auto transition-opacity duration-700",
              isHovered || showTimer ? "opacity-0" : "opacity-100"
            )}
          />
        </div>
      </div>
    </MantineProvider>
  )
}
