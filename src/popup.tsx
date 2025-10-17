import { createTheme, MantineProvider } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useStorage } from "@plasmohq/storage/hook"
import skull from "data-base64:~/../assets/skull.png"
import { useState } from "react"

import { useDeathClock } from "~/useDeathClock"
import { AVERAGE_LIFE_EXPETANCY, DEFAULT_WEBSITES } from "~/utils"

import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import "~/styles.css"

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  fontFamilyMonospace: "JetBrains Mono, monospace",
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px"
  },
  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "20px",
    xl: "24px"
  }
})

const padCalendarNum = (number) => number.toString().padStart(2, "0")

const getDefaultDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = padCalendarNum(now.getMonth())
  const day = padCalendarNum(now.getDay())

  return `${year}-${month}-${day}`
}

function IndexPopup() {
  const { birthdate, setBirthdate, timeLeft } = useDeathClock()
  const [view, setView] = useState<"main" | "settings">("main")
  const [websites, setWebsites] = useStorage<string[]>(
    "websites",
    DEFAULT_WEBSITES
  )
  const [newWebsite, setNewWebsite] = useState("")

  const handleAddWebsite = () => {
    if (newWebsite.trim() && !websites.includes(newWebsite.trim())) {
      setWebsites([...websites, newWebsite.trim()])
      setNewWebsite("")
    }
  }

  const handleRemoveWebsite = (index: number) => {
    setWebsites(websites.filter((_, i) => i !== index))
  }

  const handleResetWebsites = () => {
    setWebsites(DEFAULT_WEBSITES)
  }

  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      <div
        className="smdc"
        style={{ width: "420px", padding: "12px", background: "white" }}>
        <div className="p-12 bg-black rounded-xl">
          {/* Header with navigation */}
          <div className="flex justify-between items-center mb-6">
            <img src={skull} alt="Skull" className="w-8 h-8 m-0" />
            <div className="flex gap-2 text-xs">
              <button
                className={`px-3 py-1 rounded uppercase tracking-wider transition-colors ${
                  view === "main"
                    ? "bg-white text-black"
                    : "text-white hover:bg-stone-500/50"
                }`}
                onClick={() => setView("main")}>
                Clock
              </button>
              <button
                className={`px-3 py-1 rounded uppercase tracking-wider transition-colors ${
                  view === "settings"
                    ? "bg-white text-black"
                    : "text-white hover:bg-stone-500/50"
                }`}
                onClick={() => setView("settings")}>
                Settings
              </button>
            </div>
          </div>

          {/* Main View */}
          {view === "main" && (
            <>
              <section className="text-white text-center mb-12">
                <p>
                  The average human life lasts{" "}
                  <span className="font-bold">
                    {AVERAGE_LIFE_EXPETANCY} years
                  </span>
                  .
                </p>

                <p className="italic mt-2">
                  What will you do with what you have left?
                </p>
              </section>

              <div className="bg-black text-white text-center">
                {birthdate && timeLeft && (
                  <div className="text-2xl uppercase mb-8 font-mono">
                    <div className="flex space-x-2 text-center items-center">
                      <div className="w-16 inline-block tabular-nums">
                        {timeLeft.yearsLeft}
                      </div>
                      <div className="">:</div>
                      <div className="w-16 inline-block tabular-nums">
                        {timeLeft.daysLeft}
                      </div>
                      <div className="">:</div>
                      <div className="w-16 inline-block tabular-nums">
                        {timeLeft.hoursLeft}
                      </div>
                      <div className="">:</div>
                      <div className="w-16 inline-block tabular-nums">
                        {timeLeft.minutesLeft}
                      </div>
                      <div className="">:</div>
                      <div className="w-16 inline-block tabular-nums">
                        {timeLeft.secondsLeft}
                      </div>
                    </div>
                  </div>
                )}

                {!birthdate ? (
                  <div className="flex flex-col items-center">
                    <label
                      htmlFor="birthdate"
                      className="text-xs uppercase tracking-wider mb-2">
                      When were you born?
                    </label>

                    <DatePicker
                      value={birthdate}
                      onChange={setBirthdate}
                      className="mx-auto"
                    />
                  </div>
                ) : (
                  <div className="text-xs">
                    <button
                      className="mt-4 px-4 py-2 text-white rounded hover:bg-stone-500/50 transition-colors uppercase tracking-wider"
                      onClick={() => setBirthdate(undefined)}>
                      Reset birthdate
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Settings View */}
          {view === "settings" && (
            <div className="text-white">
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">
                Manage Websites
              </h2>

              <p className="text-xs mb-4 text-gray-300">
                Add or remove websites where the death clock should appear.
                Use * as wildcard (e.g., https://example.com/*).
              </p>

              {/* Add Website Form */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddWebsite()
                      }
                    }}
                    placeholder="https://example.com/*"
                    className="flex-1 px-3 py-2 bg-stone-900 text-white rounded text-sm border border-stone-700 focus:outline-none focus:border-white"
                  />
                  <button
                    onClick={handleAddWebsite}
                    className="px-4 py-2 bg-white text-black rounded text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors">
                    Add
                  </button>
                </div>
              </div>

              {/* Website List */}
              <div className="space-y-2 mb-6 max-h-[300px] overflow-y-auto">
                {websites.map((website, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-stone-900 px-3 py-2 rounded group">
                    <span className="text-sm font-mono truncate flex-1 mr-2">
                      {website}
                    </span>
                    <button
                      onClick={() => handleRemoveWebsite(index)}
                      className="text-xs px-2 py-1 text-red-400 hover:bg-red-500/20 rounded transition-colors">
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Reset Button */}
              <button
                onClick={handleResetWebsites}
                className="w-full px-4 py-2 text-white rounded hover:bg-stone-500/50 transition-colors text-xs uppercase tracking-wider border border-stone-700">
                Reset to Defaults
              </button>
            </div>
          )}
        </div>
      </div>
    </MantineProvider>
  )
}

export default IndexPopup
