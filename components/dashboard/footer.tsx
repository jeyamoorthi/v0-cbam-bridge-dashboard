import { Globe, Leaf, BarChart3 } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur">
      <div className="px-4 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">CBAM-Bridge</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Helping Indian Exporters Navigate EU Carbon Regulations</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Globe className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Leaf className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <BarChart3 className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
