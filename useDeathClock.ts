import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage"

import { TimeLeft, getDistanceUntilExpiry } from "~utils"

export const useDeathClock = () => {
  const [birthdate, setBirthdate] = useStorage("birthdate")
  const [timeLeft, setTimeLeft] = useState<TimeLeft>()

  useEffect(() => {
    if (birthdate) {
      setTimeLeft(getDistanceUntilExpiry(birthdate))

      const interval = setInterval(() => {
        setTimeLeft(getDistanceUntilExpiry(birthdate))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [birthdate])

  return { birthdate, setBirthdate, timeLeft }
}
