"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const data = [
  { name: "Export Revenue", value: 2500000, color: "hsl(175, 80%, 50%)" },
  { name: "Production Cost", value: 1600000, color: "hsl(250, 60%, 45%)" },
  { name: "Carbon Tax", value: 420000, color: "hsl(0, 70%, 55%)" },
  { name: "Net Profit After CBAM", value: 480000, color: "hsl(145, 60%, 45%)" },
]

export function ProfitImpactChart() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <CardTitle className="text-lg">Carbon Tax vs Net Profit Impact</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={60}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
                tickFormatter={(value) => `€${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-border/50 bg-popover p-3 shadow-xl">
                        <p className="text-sm font-medium text-foreground">
                          {payload[0].payload.name}
                        </p>
                        <p className="text-lg font-bold text-secondary">
                          €{Number(payload[0].value).toLocaleString()}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
