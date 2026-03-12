"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useDashboard } from "@/lib/dashboard-store"
import { useAuth } from "@/lib/auth-context"
import { AnimatedCounter } from "@/components/animated-counter"
import {
  Euro,
  Leaf,
  Coins,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Calculator,
  FileText,
} from "lucide-react"
import Link from "next/link"
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
} from "recharts"

const profitImpactData = [
  { category: "Steel", withCBAM: 85, withoutCBAM: 100 },
  { category: "Aluminum", withCBAM: 78, withoutCBAM: 100 },
  { category: "Cement", withCBAM: 72, withoutCBAM: 100 },
  { category: "Fertilizers", withCBAM: 88, withoutCBAM: 100 },
  { category: "Electricity", withCBAM: 92, withoutCBAM: 100 },
]

const sectorImpactData = [
  { name: "Iron & Steel", value: 35, color: "#3b82f6" },
  { name: "Aluminum", value: 25, color: "#10b981" },
  { name: "Cement", value: 20, color: "#6366f1" },
  { name: "Fertilizers", value: 12, color: "#f59e0b" },
  { name: "Hydrogen", value: 8, color: "#ef4444" },
]

export default function DashboardPage() {
  const { projectedTax, carbonIntensity, availableCredits, readinessScore } = useDashboard()
  const { user } = useAuth()

  const getReadinessColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getReadinessStatus = (score: number) => {
    if (score >= 80) return "Compliant"
    if (score >= 60) return "Partial"
    return "At Risk"
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user?.fullName?.split(" ")[0] || "User"}
        </h1>
        <p className="text-muted-foreground">
          Monitor your CBAM compliance status and carbon tax projections
        </p>
      </div>

      {/* Compliance Banner */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className={`rounded-full p-3 ${readinessScore >= 60 ? "bg-secondary/20" : "bg-destructive/20"}`}>
              {readinessScore >= 60 ? (
                <ShieldCheck className="h-6 w-6 text-secondary" />
              ) : (
                <AlertCircle className="h-6 w-6 text-destructive" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">CBAM Compliance Status</h3>
              <p className="text-sm text-muted-foreground">
                {readinessScore >= 80
                  ? "Your exports are fully compliant with EU CBAM regulations"
                  : readinessScore >= 60
                    ? "Partial compliance - some actions required"
                    : "Immediate action required to meet compliance"}
              </p>
            </div>
          </div>
          <Badge
            variant={readinessScore >= 80 ? "default" : readinessScore >= 60 ? "secondary" : "destructive"}
            className="text-sm"
          >
            {getReadinessStatus(readinessScore)}
          </Badge>
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all hover:border-primary/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projected EU Carbon Tax
            </CardTitle>
            <Euro className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              <AnimatedCounter value={projectedTax || 162000} prefix="€" decimals={0} />
            </div>
            <p className="text-xs text-muted-foreground">Based on current shipment data</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:border-primary/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Embedded Carbon Intensity
            </CardTitle>
            <Leaf className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              <AnimatedCounter value={carbonIntensity || 1.8} decimals={2} suffix=" tCO₂/t" />
            </div>
            <p className="text-xs text-muted-foreground">Per tonne of product</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:border-primary/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available Carbon Credits
            </CardTitle>
            <Coins className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              <AnimatedCounter value={availableCredits || 430} suffix=" tCO₂" />
            </div>
            <p className="text-xs text-muted-foreground">Ready to offset</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:border-primary/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Export Readiness Score
            </CardTitle>
            <TrendingUp className={`h-4 w-4 ${getReadinessColor(readinessScore)}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getReadinessColor(readinessScore)}`}>
              <AnimatedCounter value={readinessScore || 78} suffix="%" />
            </div>
            <Progress value={readinessScore || 78} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profit Impact Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Export Profitability Impact</CardTitle>
            <CardDescription>Comparison with and without CBAM taxation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitImpactData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="category" type="category" width={80} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="withoutCBAM" name="Without CBAM" fill="hsl(var(--muted))" radius={4} />
                  <Bar dataKey="withCBAM" name="With CBAM" fill="hsl(var(--primary))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sector Impact Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Indian Sectors Impacted by CBAM</CardTitle>
            <CardDescription>Distribution of carbon-intensive exports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorImpactData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {sectorImpactData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all hover:border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5 text-primary" />
              Tax Predictor
            </CardTitle>
            <CardDescription>Calculate your CBAM tax liability</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/tax-predictor">
                Open Calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="transition-all hover:border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Coins className="h-5 w-5 text-amber-500" />
              Carbon Credits
            </CardTitle>
            <CardDescription>Manage and apply your carbon credits</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/carbon-credits">
                Manage Credits
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="transition-all hover:border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-secondary" />
              Compliance Report
            </CardTitle>
            <CardDescription>Generate your CBAM compliance report</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/compliance-report">
                Generate Report
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
