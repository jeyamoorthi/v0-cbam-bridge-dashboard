import { Globe, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ComplianceBanner() {
  return (
    <Card className="relative overflow-hidden border-border/50 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
      <CardContent className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/25">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-foreground">
                  Export Compliance Status
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400 ring-1 ring-green-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  READY FOR EU EXPORT
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xl">
                Your carbon reporting meets CBAM preliminary compliance requirements. 
                Continue monitoring emissions data to maintain export readiness.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="h-5 w-5" />
              <span className="text-sm">Germany</span>
            </div>
            <div className="h-8 w-px bg-border/50" />
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">Q1 2026</p>
              <p className="text-xs text-muted-foreground">Next Reporting Period</p>
            </div>
          </div>
        </div>
      </CardContent>
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
    </Card>
  )
}
