import { Navigation } from "@/components/dashboard/navigation"
import { ComplianceBanner } from "@/components/dashboard/compliance-banner"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { TaxPredictor } from "@/components/dashboard/tax-predictor"
import { ProfitImpactChart } from "@/components/dashboard/profit-impact-chart"
import { SectorImpactChart } from "@/components/dashboard/sector-impact-chart"
import { PolicyAdvisor } from "@/components/dashboard/policy-advisor"
import { ComplianceReport } from "@/components/dashboard/compliance-report"
import { Footer } from "@/components/dashboard/footer"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
          {/* Page Header */}
          <div className="space-y-1">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
              Export Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor your CBAM compliance and carbon tax liability for EU exports
            </p>
          </div>

          {/* Compliance Status Banner */}
          <ComplianceBanner />

          {/* Key Metrics */}
          <MetricCards />

          {/* Tax Predictor Tool */}
          <TaxPredictor />

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            <ProfitImpactChart />
            <SectorImpactChart />
          </div>

          {/* Policy & Compliance Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            <PolicyAdvisor />
            <ComplianceReport />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
