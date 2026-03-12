"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Steel", value: 45, color: "hsl(250, 60%, 45%)" },
  { name: "Aluminum", value: 25, color: "hsl(175, 80%, 50%)" },
  { name: "Cement", value: 15, color: "hsl(280, 60%, 55%)" },
  { name: "Fertilizers", value: 10, color: "hsl(145, 60%, 45%)" },
  { name: "Hydrogen", value: 5, color: "hsl(210, 70%, 55%)" },
]

export function SectorImpactChart() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary/60 shadow-lg">
            <TrendingUp className="h-5 w-5 text-secondary-foreground" />
          </div>
          <CardTitle className="text-lg">
            Indian Export Sectors Most Impacted by CBAM
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="h-[250px] w-full lg:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-border/50 bg-popover p-3 shadow-xl">
                          <p className="text-sm font-medium text-foreground">
                            {payload[0].payload.name}
                          </p>
                          <p className="text-lg font-bold text-secondary">
                            {payload[0].value}% of exports
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full lg:w-1/2 space-y-3">
            {data.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-muted-foreground">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
