import { BarChart3, Factory, Leaf, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const metrics = [
  {
    title: "Projected EU Carbon Tax (2026)",
    value: "€420,000",
    subtitle: "Estimated annual liability for exports to Germany",
    icon: BarChart3,
    iconBg: "from-primary to-primary/60",
  },
  {
    title: "Embedded Carbon Intensity",
    value: "2.1 kg CO₂",
    unit: "/ tonne",
    subtitle: "Based on current production data",
    icon: Factory,
    iconBg: "from-secondary to-secondary/60",
  },
  {
    title: "Available Indian Carbon Credits",
    value: "12,500",
    unit: "credits",
    subtitle: "Potential offset for EU carbon tax",
    icon: Leaf,
    iconBg: "from-green-500 to-green-600",
  },
  {
    title: "Export Readiness Score",
    value: "87%",
    subtitle: "Based on compliance and emissions reporting",
    icon: CheckCircle,
    iconBg: "from-primary to-secondary",
  },
]

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card
          key={metric.title}
          className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-foreground">
                    {metric.value}
                  </span>
                  {metric.unit && (
                    <span className="text-sm text-muted-foreground">
                      {metric.unit}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {metric.subtitle}
                </p>
              </div>
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${metric.iconBg} shadow-lg`}
              >
                <metric.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Card>
      ))}
    </div>
  )
}
