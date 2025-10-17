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

export const DEFAULT_WEBSITES = [
  "https://x.com/*",
  "https://www.facebook.com/*",
  "https://www.youtube.com/*",
  "https://www.instagram.com/*",
  "https://www.reddit.com/*",
  "https://www.linkedin.com/*",
  "https://vk.com/*"
]

export const matchesPattern = (url: string, pattern: string): boolean => {
  // Convert wildcard pattern to regex
  const regexPattern = pattern
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&") // Escape special regex chars
    .replace(/\*/g, ".*") // Convert * to .*

  const regex = new RegExp(`^${regexPattern}$`)
  return regex.test(url)
}

export const shouldShowOnCurrentSite = (
  currentUrl: string,
  websites: string[]
): boolean => {
  return websites.some((pattern) => matchesPattern(currentUrl, pattern))
}

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
    return undefined
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
