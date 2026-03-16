# BILT 2.0 Sign-up Bonus Tracker

A small web app to track your progress toward the BILT credit card sign-up bonus. Upload your transaction CSV from Bilt, set your card activation date, and see how much eligible spend you have and how much time you have left.

**Disclaimer:** This is an unofficial tracking tool and is not associated with BILT Rewards. Your data stays in your browser and is never sent to any server.

## Features

- **Progress tracking** – See your eligible spend vs the $4,000 target and a progress bar
- **CSV import** – Upload a transaction CSV exported from the Bilt app (Wallet → View Recent transactions → Download as CSV). Uses columns: Transaction Date, Description, Amount
- **Eligible spend only** – Automatically excludes Balance Transfers, Annual Fee, Bilt Rewards/Payment - Bilt Housing, and general Payment transactions
- **90-day deadline** – Set your card activation date and see days left until the 3-month bonus window ends
- **Bonus rewards preview** – 50,000 Bilt Points and Gold Status benefit cards once you have data
- **Celebration** – Confetti when you reach the $4,000 target
- **Privacy-first** – All data stored in your browser (localStorage). Clear everything anytime with the Clear all button

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (Radix), Lucide icons
- PapaParse (CSV), canvas-confetti

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

**Build for production:**

```bash
npm run build
npm run preview
```

## Project structure

- `src/App.tsx` – Main layout and state
- `src/components/dashboard/` – ProgressCard, TutorialCard, BenefitCards, TransactionTable, CsvUploader
- `src/components/ui/` – Card, Button, Input, Table, Tooltip, etc.
- `src/hooks/` – useTransactions, useActivationDate (localStorage persistence)
- `src/lib/` – csvParser, utils (cn, formatCurrency)
- `src/types/` – Transaction type

## License

Private / personal use.
