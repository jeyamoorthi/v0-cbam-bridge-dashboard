import { FileText, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ComplianceReport() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <CardTitle className="text-lg">Generate CBAM Compliance Report</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This report summarizes your emissions, projected CBAM liability, and carbon credit 
          offsets for EU export authorities.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg shadow-primary/25">
            <Download className="mr-2 h-4 w-4" />
            Download EU Carbon Compliance Report (PDF)
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="rounded-full bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
            Last generated: March 10, 2026
          </span>
          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
            Up to date
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
