import { Calendar, DollarSign, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface ProgressCardProps {
  totalSpend: number
  targetSpend: number
  remainingSpend: number
  percentProgress: number
  onClear: () => void
  hasTransactions: boolean
  activationDate: string
  onActivationDateChange: (date: string) => void
  deadline: string | null
  daysLeft: number | null
  isPastDeadline: boolean
}

export function ProgressCard({
  totalSpend,
  targetSpend,
  remainingSpend,
  percentProgress,
  onClear,
  hasTransactions,
  activationDate,
  onActivationDateChange,
  deadline,
  daysLeft,
  isPastDeadline,
}: ProgressCardProps) {
  const targetReached = totalSpend >= targetSpend

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <div className="flex flex-row items-center gap-2 min-w-0">
          <DollarSign className={cn("h-5 w-5 shrink-0", targetReached ? "text-[#d4af37]" : "text-muted-foreground")} />
          <CardTitle className="text-lg truncate">Intro Bonus Progress</CardTitle>
        </div>
        <div className="w-28 shrink-0 flex justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!hasTransactions && !activationDate}
                onClick={onClear}
                className="w-full min-w-0 text-muted-foreground hover:text-destructive disabled:hover:text-muted-foreground"
              >
                <Trash2 className="h-4 w-4 mr-1.5 shrink-0" />
                <span className="truncate">Clear all</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear all data from this site</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={cn("text-2xl font-semibold tabular-nums", targetReached && "text-[#d4af37]")}>
          {formatCurrency(totalSpend)} / {formatCurrency(targetSpend)}
        </div>
        <Progress
          value={percentProgress}
          max={100}
          className={cn("h-3", targetReached && "[&>div]:bg-[#d4af37]")}
        />
        <p className="text-sm text-muted-foreground">
          Remaining: {formatCurrency(remainingSpend)}
        </p>

        <div className="pt-3 border-t border-border space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Label htmlFor="activation-date" className="text-sm text-muted-foreground shrink-0">
              Card activated
            </Label>
            <Input
              id="activation-date"
              type="date"
              value={activationDate}
              onChange={(e) => onActivationDateChange(e.target.value)}
              className="w-auto max-w-[11rem]"
            />
          </div>
          <p className="text-sm text-muted-foreground min-h-[1.25rem]">
            {deadline ? (
              isPastDeadline ? (
                <>Deadline was {deadline}</>
              ) : daysLeft !== null && daysLeft <= 0 ? (
                <>Deadline: {deadline}</>
              ) : daysLeft !== null ? (
                <>
                  <span className="text-foreground font-medium">{daysLeft} days left</span>
                  {" "}(Deadline: {deadline})
                </>
              ) : (
                <>Deadline: {deadline}</>
              )
            ) : (
              <>Deadline is 90 days (3 months from activation)</>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
