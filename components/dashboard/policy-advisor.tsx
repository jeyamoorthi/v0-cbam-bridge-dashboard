import { Globe, Scale, Leaf, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PolicyAdvisor() {
  return (
    <Card className="border-border/50 bg-gradient-to-br from-secondary/10 to-transparent">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary/60 shadow-lg">
            <Lightbulb className="h-5 w-5 text-secondary-foreground" />
          </div>
          <CardTitle className="text-lg">Policy Advisor AI</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl bg-muted/30 p-4 border border-border/30">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Tip:</span> Germany{"'"}s carbon price is currently around{" "}
            <span className="font-semibold text-secondary">€95 per tonne</span> under EU ETS. 
            Exporters using low-carbon production methods such as Electric Arc Furnaces can 
            significantly reduce CBAM liabilities. Leveraging Indian carbon credit markets may 
            offset up to <span className="font-semibold text-secondary">15%</span> of tax obligations.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2 text-xs">
            <Globe className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">EU ETS Compliant</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2 text-xs">
            <Scale className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Article 6 Eligible</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2 text-xs">
            <Leaf className="h-4 w-4 text-secondary" />
            <span className="text-muted-foreground">Carbon Credits Available</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
