import type { PlasmoContentScript } from "plasmo"

import { useStorage } from "@plasmohq/storage"

import "./styles.css"

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

export const getRootContainer = () => {
  // Create a div for the banner
  const styles =
    "z-index: 99999999999; background: white; position: fixed; width: 100%;"
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div id="smdc-banner" style="${styles}"></div>`
  )

  return document.querySelector("#smdc-banner")
}

const DeathClockBanner = () => {
  const [birthDate] = useStorage("birthdate")

  return (
    <div className="text-center w-screen p-4 text-base">
      {!birthDate ? (
        <div>Set your birth date to use Social Media Death Clock</div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default DeathClockBanner
