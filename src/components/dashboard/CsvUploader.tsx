import { useRef } from "react"
import { Info, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { parseCsvToTransactions } from "@/lib/csvParser"
import type { Transaction } from "@/types/transaction"

interface CsvUploaderProps {
  onImport: (transactions: Transaction[]) => void
}

export function CsvUploader({ onImport }: CsvUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const transactions = await parseCsvToTransactions(file)
      onImport(transactions)
    } catch (err) {
      console.error("CSV parse error", err)
      alert("Could not parse CSV. Expected columns: Transaction Date, Description, Amount.")
    }
    e.target.value = ""
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-semibold mb-2">Import from Bilt CSV</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Uses <code className="rounded bg-muted border border-border px-1.5 py-0.5 text-foreground font-medium">Transaction Date</code>,{" "}
        <code className="rounded bg-muted border border-border px-1.5 py-0.5 text-foreground font-medium">Description</code>,{" and "}
        <code className="rounded bg-muted border border-border px-1.5 py-0.5 text-foreground font-medium">Amount</code>. Balance Transfers, Annual Fees, and Bilt Housing and Creidt Card payments are excluded from bonus progress.
      </p>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2.5 mb-4">
        <Info className="h-4 w-4 shrink-0 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          Tip: For the best experience when updating your data, use the clear all button above before re-uploading to avoid duplicate transactions, or upload a new CSV with dates after the latest transaction.
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload CSV
      </Button>
    </div>
  )
}
