import { useState, useCallback } from "react"

const STORAGE_KEY = "sub-tracker-activation-date"
const BONUS_MONTHS = 3

function parseDate(s: string): Date | null {
  if (!s || s.length < 10) return null
  const d = new Date(s + "T12:00:00")
  return Number.isNaN(d.getTime()) ? null : d
}

function addMonths(date: Date, months: number): Date {
  const out = new Date(date)
  out.setMonth(out.getMonth() + months)
  return out
}

function daysBetween(a: Date, b: Date): number {
  const start = new Date(a.getFullYear(), a.getMonth(), a.getDate())
  const end = new Date(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.ceil((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000))
}

function formatDeadline(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function loadActivationDate(): string {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw?.trim() ?? ""
}

export function useActivationDate() {
  const [activationDate, setActivationDateState] = useState<string>(loadActivationDate)

  const setActivationDate = useCallback((value: string) => {
    setActivationDateState(value)
    if (value) {
      localStorage.setItem(STORAGE_KEY, value)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const clearActivationDate = useCallback(() => {
    setActivationDateState("")
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const parsed = parseDate(activationDate)
  const deadline = parsed ? addMonths(parsed, BONUS_MONTHS) : null
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const daysLeft =
    deadline && deadline >= today
      ? daysBetween(today, deadline)
      : deadline
        ? daysBetween(deadline, today)
        : null

  return {
    activationDate,
    setActivationDate,
    clearActivationDate,
    deadline: deadline ? formatDeadline(deadline) : null,
    daysLeft,
    isPastDeadline: deadline ? deadline < today : false,
  }
}
