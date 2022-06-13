import css from "data-text:~styles.css"
import type { PlasmoContentScript } from "plasmo"
import { useState } from "react"

import { Storage, useStorage } from "@plasmohq/storage"

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

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = css
  return style
}

const DeathClockBanner = () => {
  const [showBanner, setShowBanner] = useState(true)
  const [birthdate] = useStorage("birthdate")
  console.log("AM: ", birthdate)

  chrome.storage.sync.get(["birthdate"], ({ birthdate }) => {
    if (birthdate) {
      console.log("AM: ", birthdate)
    }
  })

  return (
    <div className="fixed bottom-0 text-center m-4 font-sans flex items-center">
      {showBanner && (
        <>
          <div className="p-8 bg-yellow-300 text-black font-bold border-2 border-black uppercase">
            {!birthdate ? <div>Set your birthdate</div> : <div></div>}
          </div>

          <div
            className="text-sm font-bold text-yellow-300 bg-black p-2 -ml-4 hover:cursor-pointer"
            onClick={() => setShowBanner(false)}>
            &lt;
          </div>
        </>
      )}

      {!showBanner && (
        <div
          className="text-lg font-bold bg-yellow-300 p-2 border-2 border-black hover:cursor-pointer"
          onClick={() => setShowBanner(true)}>
          &gt;
        </div>
      )}
    </div>
  )
}

export default DeathClockBanner
