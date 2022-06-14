import { useDeathClock } from "~useDeathClock"
import { AVERAGE_LIFE_EXPETANCY } from "~utils"

import "./styles.css"

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
    <div className="w-[36rem]">
      <div className="bg-yellow-300 p-12">
        {timeLeft && (
          <div className="font-bold text-4xl uppercase mb-12">
            <div className="flex">
              <div className="w-1/6 text-right mr-2">{timeLeft.yearsLeft}</div>
              <div className="w-5/6 text-left ml-2">years</div>
            </div>
            <div className="flex">
              <div className="w-1/6 text-right mr-2">{timeLeft.daysLeft}</div>
              <div className="w-5/6 text-left ml-2">days</div>
            </div>
            <div className="flex">
              <div className="w-1/6 text-right mr-2">{timeLeft.hoursLeft}</div>
              <div className="w-5/6 text-left ml-2">hours</div>
            </div>
            <div className="flex">
              <div className="w-1/6 text-right mr-2">
                {timeLeft.minutesLeft}
              </div>
              <div className="w-5/6 text-left ml-2">minutes</div>
            </div>
            <div className="flex">
              <div className="w-1/6 text-right mr-2">
                {timeLeft.secondsLeft}
              </div>
              <div className="w-5/6 text-left ml-2">seconds</div>
            </div>
          </div>
        )}

        <label
          htmlFor="birthdate"
          className="uppercase text-lg font-bold tracking-widest">
          When were you born?
        </label>

        <input
          type="date"
          id="birthdate"
          className="mt-2 w-full border-2 border-black focus:border-black"
          onChange={({ target }) => setBirthdate(target.value)}
          value={birthdate || getDefaultDate()}
        />
      </div>

      <footer className="bg-black p-12 text-white">
        <p>
          The average human life lasts{" "}
          <span className="font-bold">{AVERAGE_LIFE_EXPETANCY} years</span>.
        </p>

        <p className="italic mt-2">What will you do with what you have left?</p>
      </footer>
    </div>
  )
}

export default IndexPopup
