import Papa from "papaparse"
import type { Transaction } from "@/types/transaction"

/** Supported CSV column names (actual export uses "Transaction Date", "Description", "Amount"). */
const DATE_KEYS = ["Transaction Date", "Posted Date", "date"]
const DESCRIPTION_KEYS = ["Description", "description"]
const AMOUNT_KEYS = ["Amount", "amount"]

function getCell(row: Record<string, string>, keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const val = row[key]
    if (val !== undefined && val !== null && String(val).trim() !== "") return String(val).trim()
  }
  return undefined
}

/** Merchant descriptions that do not count toward the intro bonus. */
export const NON_ELIGIBLE_MERCHANT_PATTERNS = [
  "Balance Transfer",
  "Annual Fee",
  "Bilt Rewards",
  "Payment - Bilt Housing",
  "Payment",
] as const

function isEligibleMerchant(merchant: string): boolean {
  const lower = merchant.toLowerCase()
  return !NON_ELIGIBLE_MERCHANT_PATTERNS.some((pattern) =>
    lower.includes(pattern.toLowerCase())
  )
}

/**
 * Parse CSV file and map to Transaction[].
 * Supports columns: "Transaction Date" or "Posted Date", "Description", "Amount".
 * Rows matching non-eligible patterns (e.g. Balance Transfer, Annual Fee) are set eligible=false.
 */
export function parseCsvToTransactions(
  file: File
): Promise<Transaction[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete(results: Papa.ParseResult<Record<string, string>>) {
        const errors = results.errors.filter((e: Papa.ParseError) => e.type === "Quotes")
        if (errors.length > 0) {
          reject(new Error("CSV parse error"))
          return
        }
        const transactions: Transaction[] = results.data
          .filter((row) => {
            const date = getCell(row, DATE_KEYS)
            const merchant = getCell(row, DESCRIPTION_KEYS)
            const amount = getCell(row, AMOUNT_KEYS)
            return date != null && merchant != null && amount != null
          })
          .map((row) => {
            const date = getCell(row, DATE_KEYS) ?? ""
            const merchant = getCell(row, DESCRIPTION_KEYS) ?? ""
            return {
              id: crypto.randomUUID(),
              date,
              merchant,
              amount: parseAmount(getCell(row, AMOUNT_KEYS) ?? "0"),
              eligible: isEligibleMerchant(merchant),
            }
          })
        resolve(transactions)
      },
      error(err: Error) {
        reject(err)
      },
    })
  })
}

function parseAmount(value: string): number {
  const cleaned = value.replace(/[$,]/g, "").trim()
  const n = Number.parseFloat(cleaned)
  return Number.isFinite(n) ? Math.abs(n) : 0
}
