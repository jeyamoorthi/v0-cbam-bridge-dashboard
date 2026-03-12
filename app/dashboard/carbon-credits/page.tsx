"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDashboard } from "@/lib/dashboard-store"
import { AnimatedCounter } from "@/components/animated-counter"
import { Coins, Check, Clock, AlertTriangle, Plus, Download } from "lucide-react"

export default function CarbonCreditsPage() {
  const { carbonCredits, applyCreditToShipment, availableCredits } = useDashboard()

  const usedCredits = carbonCredits
    .filter((c) => c.status === "applied")
    .reduce((sum, c) => sum + c.credits, 0)

  const expiredCredits = carbonCredits
    .filter((c) => c.status === "expired")
    .reduce((sum, c) => sum + c.credits, 0)

  const totalCredits = carbonCredits.reduce((sum, c) => sum + c.credits, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge variant="default" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Available</Badge>
      case "applied":
        return <Badge variant="secondary">Applied</Badge>
      case "expired":
        return <Badge variant="destructive" className="bg-red-500/20 text-red-400">Expired</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <Check className="h-4 w-4 text-green-500" />
      case "applied":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">Carbon Credits Management</h1>
        <p className="text-muted-foreground">
          Manage your carbon credits and apply them to reduce CBAM tax liability
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-green-500/10">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Coins className="h-4 w-4 text-green-500" />
              Available Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              <AnimatedCounter value={availableCredits} suffix=" tCO₂" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Ready to apply</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Check className="h-4 w-4 text-primary" />
              Credits Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              <AnimatedCounter value={usedCredits} suffix=" tCO₂" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Applied to shipments</p>
          </CardContent>
        </Card>

        <Card className="border-amber-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Expired Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">
              <AnimatedCounter value={expiredCredits} suffix=" tCO₂" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">No longer valid</p>
          </CardContent>
        </Card>
      </div>

      {/* Credits Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Credit Portfolio</CardTitle>
              <CardDescription>All your carbon credits and their status</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Purchase Credits
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Credit ID</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Credits (tCO₂)</TableHead>
                <TableHead>Date Issued</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carbonCredits.map((credit) => (
                <TableRow key={credit.id}>
                  <TableCell className="font-mono text-sm">{credit.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(credit.status)}
                      {credit.source}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">{credit.credits}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(credit.dateIssued).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{getStatusBadge(credit.status)}</TableCell>
                  <TableCell className="text-right">
                    {credit.status === "available" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => applyCreditToShipment(credit.id)}
                      >
                        Apply to Shipment
                      </Button>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Credit Portfolio</p>
              <p className="text-2xl font-bold text-foreground">
                {totalCredits.toLocaleString()} tCO₂
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-lg font-semibold text-green-500">{((availableCredits / totalCredits) * 100).toFixed(0)}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Applied</p>
                <p className="text-lg font-semibold text-primary">{((usedCredits / totalCredits) * 100).toFixed(0)}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Expired</p>
                <p className="text-lg font-semibold text-amber-500">{((expiredCredits / totalCredits) * 100).toFixed(0)}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
