import { useState, useEffect, useCallback } from "react"
import type { Transaction } from "@/types/transaction"

const STORAGE_KEY = "sub-tracker-transactions"
const TARGET_SPEND = 4000

function loadFromStorage(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Transaction[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveToStorage(transactions: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(loadFromStorage)

  useEffect(() => {
    saveToStorage(transactions)
  }, [transactions])

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((x) => x.id !== id))
  }, [])

  const importTransactions = useCallback((newOnes: Transaction[]) => {
    setTransactions((prev) => [...newOnes, ...prev])
  }, [])

  const clearTransactions = useCallback(() => {
    setTransactions([])
  }, [])

  const totalSpend = transactions
    .filter((t) => t.eligible)
    .reduce((sum, t) => sum + t.amount, 0)

  const remainingSpend = Math.max(0, TARGET_SPEND - totalSpend)
  const percentProgress = Math.min(100, (totalSpend / TARGET_SPEND) * 100)

  return {
    transactions,
    deleteTransaction,
    importTransactions,
    clearTransactions,
    totalSpend,
    remainingSpend,
    percentProgress,
    targetSpend: TARGET_SPEND,
  }
}
