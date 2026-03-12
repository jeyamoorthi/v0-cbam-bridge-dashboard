import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, ArrowRight, Shield, Calculator, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
            <Leaf className="h-5 w-5 text-secondary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">CBAM-Bridge</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Indo-German Export
            <span className="block text-secondary">Carbon Tax Navigator</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground">
            Helping Indian exporters understand and predict EU Carbon Border Adjustment Mechanism (CBAM) tax when exporting goods to Germany and EU countries.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline">
                Sign In to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-20 grid max-w-5xl gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">Tax Predictor</h3>
            <p className="text-sm text-muted-foreground">
              Calculate your CBAM tax liability with our intelligent prediction engine
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-4 rounded-full bg-secondary/10 p-3">
              <Shield className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">Compliance Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Stay compliant with real-time monitoring and automated reporting
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">Trade Insights</h3>
            <p className="text-sm text-muted-foreground">
              Analyze export trends and optimize your carbon strategy
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        <p>CBAM-Bridge - Supporting sustainable Indo-German trade</p>
      </footer>
    </div>
  )
}
