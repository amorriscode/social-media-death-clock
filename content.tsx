import css from "data-text:~styles.css"
import type { PlasmoContentScript } from "plasmo"
import { useState } from "react"

import { useDeathClock } from "~useDeathClock"

export const config: PlasmoContentScript = {
  matches: [
    "https://twitter.com/*",
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

const DeathClockBanner = () => {
  const [showBanner, setShowBanner] = useState(true)
  const { birthdate, timeLeft } = useDeathClock()

  return (
    <div className="fixed bottom-0 m-4 font-sans flex items-center z-[999999999]">
      {showBanner && (
        <>
          <div className="p-6 pr-8 bg-yellow-300 text-black font-bold border-solid border-2 border-black uppercase">
            {!birthdate && <div>Set your birthdate</div>}

            {timeLeft && (
              <div>
                <div className="tracking-widest text-xs mb-2">Time Left</div>

                <div className="flex space-x-6 text-center">
                  <div>
                    <div className="text-2xl">{timeLeft.yearsLeft}</div>
                    <div className="text-xs">years</div>
                  </div>
                  <div>
                    <div className="text-2xl">{timeLeft.daysLeft}</div>
                    <div className="text-xs">days</div>
                  </div>
                  <div>
                    <div className="text-2xl">{timeLeft.hoursLeft}</div>
                    <div className="text-xs">hours</div>
                  </div>
                  <div>
                    <div className="text-2xl">{timeLeft.minutesLeft}</div>
                    <div className="text-xs">minutes</div>
                  </div>
                  <div>
                    <div className="text-2xl">{timeLeft.secondsLeft}</div>
                    <div className="text-xs">seconds</div>
                  </div>
                </div>

                <div></div>
              </div>
            )}
          </div>

          <div
            className="font-bold text-yellow-300 bg-black p-2 -ml-4 hover:cursor-pointer"
            onClick={() => setShowBanner(false)}>
            &lt;
          </div>
        </>
      )}

      {!showBanner && (
        <div
          className="font-bold bg-yellow-300 p-2 border-solid border-2 border-black hover:cursor-pointer"
          onClick={() => setShowBanner(true)}>
          &gt;
        </div>
      )}
    </div>
  )
}

export default DeathClockBanner
