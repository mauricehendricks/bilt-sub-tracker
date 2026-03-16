import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import type { Transaction } from "@/types/transaction"

interface TransactionTableProps {
  transactions: Transaction[]
  onDelete: (id: string) => void
}

export function TransactionTable({
  transactions,
  onDelete,
}: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
        No transactions yet. Upload a CSV to get started.
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Merchant</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Eligible</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="font-medium">{t.date}</TableCell>
              <TableCell>{t.merchant}</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(t.amount)}
              </TableCell>
              <TableCell>{t.eligible ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Delete"
                  onClick={() => onDelete(t.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
