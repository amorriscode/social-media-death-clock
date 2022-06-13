import {
  add,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInYears,
  startOfTomorrow,
  startOfYear
} from "date-fns"
import { startOfHour, startOfMinute } from "date-fns/esm"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage"

import "./styles.css"

const AVERAGE_LIFE_EXPETANCY = 72

const getExpiryDate = (birthdate) => {
  return add(new Date(birthdate), { years: AVERAGE_LIFE_EXPETANCY })
}

type TimeLeft = {
  secondsLeft: number
  minutesLeft: number
  hoursLeft: number
  daysLeft: number
  yearsLeft: number
}

const getDistanceUntilExpiry = (birthdate): TimeLeft => {
  const now = new Date()
  const tomorrow = startOfTomorrow()
  const nextYear = startOfYear(add(now, { years: 1 }))
  const nextHour = startOfHour(add(now, { hours: 1 }))
  const nextMinute = startOfMinute(add(now, { minutes: 1 }))
  const expiryDate = getExpiryDate(birthdate)

  const secondsLeft = differenceInSeconds(nextMinute, now)
  const minutesLeft = differenceInMinutes(nextHour, now)
  const hoursLeft = differenceInHours(tomorrow, now)
  const daysLeft = differenceInDays(nextYear, now)
  const yearsLeft = differenceInYears(expiryDate, now)

  return { secondsLeft, minutesLeft, hoursLeft, daysLeft, yearsLeft }
}

function IndexPopup() {
  const [birthdate, setBirthdate] = useStorage("birthdate")
  const [timeLeft, setTimeLeft] = useState<TimeLeft>()

  useEffect(() => {
    setInterval(() => {
      if (birthdate) {
        setTimeLeft(getDistanceUntilExpiry(birthdate))
      }
    }, 1000)
  }, [birthdate])

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
          value={birthdate || "1900-05-06"}
        />
      </div>

      <footer className="bg-black p-12 text-white">
        <p>
          The average human life lasts{" "}
          <span className="font-bold">{AVERAGE_LIFE_EXPETANCY} years</span>.
          Time is our non-renewable resource.
        </p>

        <p className="italic mt-2">What will you do with what you have left?</p>
      </footer>
    </div>
  )
}

export default IndexPopup
