import { useEffect, useRef } from "react"
import confetti from "canvas-confetti"
import { useTransactions } from "@/hooks/useTransactions"
import { useActivationDate } from "@/hooks/useActivationDate"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ProgressCard } from "@/components/dashboard/ProgressCard"
import { TutorialCard } from "@/components/dashboard/TutorialCard"
import { BenefitCards } from "@/components/dashboard/BenefitCards"
import { TransactionTable } from "@/components/dashboard/TransactionTable"
import { CsvUploader } from "@/components/dashboard/CsvUploader"

function App() {
  const {
    transactions,
    deleteTransaction,
    importTransactions,
    clearTransactions,
    totalSpend,
    remainingSpend,
    percentProgress,
    targetSpend,
  } = useTransactions()
  const {
    activationDate,
    setActivationDate,
    clearActivationDate,
    deadline,
    daysLeft,
    isPastDeadline,
  } = useActivationDate()

  const confettiIntervalRef = useRef<number | null>(null)
  const shouldRunConfettiRef = useRef(false)

  const resetConfetti = () => {
    ;(confetti as unknown as { reset?: () => void }).reset?.()
  }

  const stopConfettiLoop = () => {
    if (confettiIntervalRef.current !== null) {
      clearInterval(confettiIntervalRef.current)
      confettiIntervalRef.current = null
    }
    resetConfetti()
  }

  const startConfettiLoop = () => {
    if (confettiIntervalRef.current !== null) return

    // Clear any leftover canvas before starting a new animation.
    resetConfetti()

    const CONFETTI_LOOP_MS = 900
    confettiIntervalRef.current = window.setInterval(() => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5 + 0.25,
        },
      })
    }, CONFETTI_LOOP_MS)
  }

  useEffect(() => {
    shouldRunConfettiRef.current = totalSpend >= targetSpend

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stopConfettiLoop()
        return
      }

      if (shouldRunConfettiRef.current) startConfettiLoop()
    }

    // Start/stop based on current target and visibility state.
    if (!shouldRunConfettiRef.current) {
      stopConfettiLoop()
    } else if (document.visibilityState === "visible") {
      startConfettiLoop()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      stopConfettiLoop()
    }
  }, [totalSpend, targetSpend])

  const handleClearAll = () => {
    clearTransactions()
    clearActivationDate()
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen bg-background">
        <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-center">
          💰 BILT 2.0 Sign-up Bonus Tracker
        </h1>
        <p className="text-xs text-muted-foreground text-center -mt-2 space-y-1">
          <span className="block">Disclaimer: This is just a tracking tool and not officially associated with BILT Rewards in any capacity.</span>
          <span className="block">Your data is stored only in the browser and is never collected. You can clear it at any time with the Clear all button.</span>
        </p>

        <ProgressCard
          totalSpend={totalSpend}
          targetSpend={targetSpend}
          remainingSpend={remainingSpend}
          percentProgress={percentProgress}
          onClear={handleClearAll}
          hasTransactions={transactions.length > 0}
          activationDate={activationDate}
          onActivationDateChange={setActivationDate}
          deadline={deadline}
          daysLeft={daysLeft}
          isPastDeadline={isPastDeadline}
        />

        {transactions.length === 0 ? (
          <TutorialCard />
        ) : (
          <div className="space-y-3">
            {totalSpend >= targetSpend && (
              <p className="text-center text-foreground font-medium">
                Congrats! You unlocked your rewards.
              </p>
            )}
            <h2 className="text-lg font-semibold">Bonus Rewards</h2>
            <BenefitCards />
          </div>
        )}

        <CsvUploader onImport={importTransactions} />

        <TransactionTable
          transactions={transactions}
          onDelete={deleteTransaction}
        />
      </main>
      </div>
    </TooltipProvider>
  )
}

export default App
