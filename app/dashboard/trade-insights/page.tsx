"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart,
} from "recharts"

const sectorImpactData = [
  { name: "Iron & Steel", value: 35, color: "#3b82f6" },
  { name: "Aluminum", value: 25, color: "#10b981" },
  { name: "Cement", value: 20, color: "#6366f1" },
  { name: "Fertilizers", value: 12, color: "#f59e0b" },
  { name: "Hydrogen", value: 8, color: "#ef4444" },
]

const carbonPriceTrendData = [
  { month: "Jan 2024", euPrice: 65, indiaPrice: 8 },
  { month: "Feb 2024", euPrice: 68, indiaPrice: 10 },
  { month: "Mar 2024", euPrice: 72, indiaPrice: 12 },
  { month: "Apr 2024", euPrice: 78, indiaPrice: 14 },
  { month: "May 2024", euPrice: 82, indiaPrice: 15 },
  { month: "Jun 2024", euPrice: 85, indiaPrice: 16 },
  { month: "Jul 2024", euPrice: 88, indiaPrice: 18 },
  { month: "Aug 2024", euPrice: 92, indiaPrice: 20 },
  { month: "Sep 2024", euPrice: 95, indiaPrice: 22 },
  { month: "Oct 2024", euPrice: 98, indiaPrice: 24 },
  { month: "Nov 2024", euPrice: 102, indiaPrice: 26 },
  { month: "Dec 2024", euPrice: 105, indiaPrice: 28 },
]

const profitabilityData = [
  { sector: "Steel", preCABAM: 15, postCBAM: 8, taxImpact: -7 },
  { sector: "Aluminum", preCABAM: 18, postCBAM: 11, taxImpact: -7 },
  { sector: "Cement", preCABAM: 12, postCBAM: 6, taxImpact: -6 },
  { sector: "Fertilizers", preCABAM: 20, postCBAM: 14, taxImpact: -6 },
  { sector: "Hydrogen", preCABAM: 22, postCBAM: 18, taxImpact: -4 },
]

const exportVolumeData = [
  { year: "2020", steel: 8.2, aluminum: 3.1, cement: 1.8, fertilizers: 2.5 },
  { year: "2021", steel: 9.5, aluminum: 3.5, cement: 2.0, fertilizers: 2.8 },
  { year: "2022", steel: 10.8, aluminum: 4.0, cement: 2.3, fertilizers: 3.2 },
  { year: "2023", steel: 11.5, aluminum: 4.3, cement: 2.5, fertilizers: 3.5 },
  { year: "2024", steel: 12.2, aluminum: 4.6, cement: 2.7, fertilizers: 3.8 },
]

const customTooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  padding: "12px",
}

export default function TradeInsightsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">Trade Insights</h1>
        <p className="text-muted-foreground">
          Analyze CBAM impact on Indian exports and carbon market trends
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pricing">Carbon Pricing</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
          <TabsTrigger value="exports">Export Trends</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Sector Impact Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Indian Sectors Impacted by CBAM</CardTitle>
                <CardDescription>Distribution of carbon-intensive exports to EU</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorImpactData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {sectorImpactData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={customTooltipStyle} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Carbon Price Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Carbon Price Trends</CardTitle>
                <CardDescription>EU ETS vs India carbon pricing (EUR/tCO₂)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={carbonPriceTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="month" 
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fontSize: 11 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip contentStyle={customTooltipStyle} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="euPrice" 
                        name="EU ETS Price"
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="indiaPrice" 
                        name="India Carbon Price"
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Indian Exports to EU</p>
                <p className="mt-2 text-2xl font-bold text-foreground">€8.2B</p>
                <p className="mt-1 text-xs text-green-500">+12% YoY</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Estimated CBAM Liability</p>
                <p className="mt-2 text-2xl font-bold text-foreground">€1.4B</p>
                <p className="mt-1 text-xs text-amber-500">Projected 2026</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Average Carbon Intensity</p>
                <p className="mt-2 text-2xl font-bold text-foreground">2.1 tCO₂/t</p>
                <p className="mt-1 text-xs text-muted-foreground">Indian steel</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">EU Benchmark</p>
                <p className="mt-2 text-2xl font-bold text-foreground">1.3 tCO₂/t</p>
                <p className="mt-1 text-xs text-muted-foreground">Steel production</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Carbon Pricing Tab */}
        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>EU vs India Carbon Price Gap</CardTitle>
              <CardDescription>Monthly comparison of carbon pricing mechanisms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={carbonPriceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 11 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={customTooltipStyle} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="euPrice" 
                      name="EU ETS Price (€/tCO₂)"
                      stroke="#3b82f6" 
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="indiaPrice" 
                      name="India Carbon Price (€/tCO₂)"
                      stroke="#10b981" 
                      fill="#10b981"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="border-primary/30">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Current EU ETS Price</p>
                <p className="mt-2 text-3xl font-bold text-primary">€105/tCO₂</p>
                <p className="mt-1 text-xs text-green-500">+4.3% this month</p>
              </CardContent>
            </Card>
            <Card className="border-secondary/30">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">India Carbon Price</p>
                <p className="mt-2 text-3xl font-bold text-secondary">€28/tCO₂</p>
                <p className="mt-1 text-xs text-green-500">+8.5% this month</p>
              </CardContent>
            </Card>
            <Card className="border-amber-500/30">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Price Gap</p>
                <p className="mt-2 text-3xl font-bold text-amber-500">€77/tCO₂</p>
                <p className="mt-1 text-xs text-muted-foreground">CBAM adjustment</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profitability Tab */}
        <TabsContent value="profitability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Profitability vs CBAM Impact</CardTitle>
              <CardDescription>Profit margin comparison before and after CBAM (percentage points)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitabilityData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="sector" type="category" width={100} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={customTooltipStyle} />
                    <Legend />
                    <Bar 
                      dataKey="preCABAM" 
                      name="Pre-CBAM Margin (%)" 
                      fill="#3b82f6" 
                      radius={4}
                    />
                    <Bar 
                      dataKey="postCBAM" 
                      name="Post-CBAM Margin (%)" 
                      fill="#10b981" 
                      radius={4}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Export Trends Tab */}
        <TabsContent value="exports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Indian Export Volumes to EU</CardTitle>
              <CardDescription>Annual export volumes by sector (Million Tonnes)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={exportVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={customTooltipStyle} />
                    <Legend />
                    <Bar dataKey="steel" name="Steel" fill="#3b82f6" radius={4} />
                    <Bar dataKey="aluminum" name="Aluminum" fill="#10b981" radius={4} />
                    <Bar dataKey="cement" name="Cement" fill="#6366f1" radius={4} />
                    <Bar dataKey="fertilizers" name="Fertilizers" fill="#f59e0b" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
