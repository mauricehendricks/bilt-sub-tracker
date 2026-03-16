import { Coins, Medal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    icon: Coins,
    title: "50,000 Bilt Points",
    description: "Earn bonus points after meeting the spend requirement",
  },
  {
    icon: Medal,
    title: "Gold Status",
    description:
      "Higher Rent Day bonuses, up to $100/mo hotel credits, and luxury hotel program access",
  },
] as const

export function BenefitCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {benefits.map(({ icon: Icon, title, description }) => (
        <Card
          key={title}
          className="flex flex-col items-center text-center p-4"
        >
          <CardContent className="p-0 flex flex-col items-center gap-2 w-full">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/80 text-muted-foreground shrink-0">
              <Icon className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <div className="space-y-0.5 min-w-0">
              <p className="font-medium text-foreground text-xs">{title}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">
                {description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
