import {
  add,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInYears,
  startOfHour,
  startOfMinute,
  startOfTomorrow,
  startOfYear
} from "date-fns"

export const AVERAGE_LIFE_EXPETANCY = 72

export type TimeLeft = {
  secondsLeft: number
  minutesLeft: number
  hoursLeft: number
  daysLeft: number
  yearsLeft: number
}

const getExpiryDate = (birthdate) => {
  return add(new Date(birthdate), { years: AVERAGE_LIFE_EXPETANCY })
}

export const getDistanceUntilExpiry = (birthdate): TimeLeft => {
  if (!birthdate) {
    return
  }

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
