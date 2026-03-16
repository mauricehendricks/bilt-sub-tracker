import { Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TutorialCard() {
  return (
    <Card className="border-border bg-muted/50">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
        <Info className="h-5 w-5 text-muted-foreground" />
        <CardTitle className="text-base font-medium">
          How to get your transaction data from Bilt
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-2">
        <ol className="list-decimal list-inside space-y-1.5">
          <li>Go to <strong className="text-foreground">Wallet</strong></li>
          <li>Tap <strong className="text-foreground">View Recent transactions</strong></li>
          <li>Click the <strong className="text-foreground">3 dots</strong> for more options</li>
          <li>Select <strong className="text-foreground">Download as CSV</strong></li>
          <li>Set custom range from when you activated the card (e.g. Feb 7th) to current date</li>
        </ol>
      </CardContent>
    </Card>
  )
}
