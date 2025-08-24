import { createTheme, MantineProvider } from "@mantine/core"
import skull from "data-base64:~/../assets/skull.png"

import { useDeathClock } from "~/useDeathClock"
import { AVERAGE_LIFE_EXPETANCY } from "~/utils"

import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import "~/styles.css"

import { DatePicker } from "@mantine/dates"

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  fontFamilyMonospace: "JetBrains Mono, monospace"
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

  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      <div className="smdc" style={{ width: "420px", padding: "12px" }}>
        <div className="p-12 bg-black rounded-xl">
          <section className="text-white text-center mb-12">
            <img src={skull} alt="Skull" className="w-12 h-12 mx-auto mb-4" />

            <p>
              The average human life lasts{" "}
              <span className="font-bold">{AVERAGE_LIFE_EXPETANCY} years</span>.
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
        </div>
      </div>
    </MantineProvider>
  )
}

export default IndexPopup
