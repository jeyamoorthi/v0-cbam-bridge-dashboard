"use client"

import { createContext, useContext, useState, ReactNode, useCallback } from "react"

export interface TaxPrediction {
  productType: string
  tonnage: number
  productionMethod: string
  carbonIntensity: number
  destinationCountry: string
  estimatedTax: number
  carbonCreditsApplied: number
}

export interface CarbonCredit {
  id: string
  source: string
  credits: number
  status: "available" | "applied" | "expired"
  dateIssued: string
}

interface DashboardState {
  // Tax predictor state
  taxPrediction: TaxPrediction
  setTaxPrediction: (prediction: TaxPrediction) => void
  
  // Carbon credits state
  carbonCredits: CarbonCredit[]
  applyCreditToShipment: (creditId: string) => void
  
  // Computed metrics
  projectedTax: number
  carbonIntensity: number
  availableCredits: number
  readinessScore: number
}

const defaultTaxPrediction: TaxPrediction = {
  productType: "steel",
  tonnage: 1000,
  productionMethod: "blast_furnace",
  carbonIntensity: 1.8,
  destinationCountry: "germany",
  estimatedTax: 0,
  carbonCreditsApplied: 0,
}

const defaultCarbonCredits: CarbonCredit[] = [
  { id: "CC-2024-001", source: "Solar Power Plant", credits: 250, status: "available", dateIssued: "2024-01-15" },
  { id: "CC-2024-002", source: "Wind Energy Project", credits: 180, status: "available", dateIssued: "2024-02-20" },
  { id: "CC-2024-003", source: "Reforestation Initiative", credits: 120, status: "applied", dateIssued: "2024-03-10" },
  { id: "CC-2023-045", source: "Methane Capture", credits: 90, status: "expired", dateIssued: "2023-08-05" },
]

const DashboardContext = createContext<DashboardState | undefined>(undefined)

// Carbon tax rates per tonne CO2 equivalent (EUR)
const carbonTaxRates: Record<string, number> = {
  steel: 95,
  aluminum: 85,
  cement: 75,
  fertilizers: 65,
  electricity: 55,
  hydrogen: 70,
}

// Production method multipliers
const productionMethodMultipliers: Record<string, number> = {
  blast_furnace: 1.0,
  electric_arc: 0.6,
  dri_process: 0.75,
  bayer_process: 1.0,
  hall_heroult: 0.85,
  green_hydrogen: 0.3,
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [taxPrediction, setTaxPredictionState] = useState<TaxPrediction>(defaultTaxPrediction)
  const [carbonCredits, setCarbonCredits] = useState<CarbonCredit[]>(defaultCarbonCredits)

  const calculateEstimatedTax = (prediction: TaxPrediction): number => {
    const baseRate = carbonTaxRates[prediction.productType] || 80
    const methodMultiplier = productionMethodMultipliers[prediction.productionMethod] || 1.0
    
    // Total tax = tonnage × carbon intensity × base rate × method multiplier
    const totalTax = prediction.tonnage * prediction.carbonIntensity * baseRate * methodMultiplier
    
    // Apply carbon credits reduction
    const creditsValue = prediction.carbonCreditsApplied * baseRate
    
    return Math.max(0, totalTax - creditsValue)
  }

  const setTaxPrediction = useCallback((prediction: TaxPrediction) => {
    setTaxPredictionState((prev) => {
      // Only update if values actually changed to prevent unnecessary re-renders
      if (
        prev.productType === prediction.productType &&
        prev.tonnage === prediction.tonnage &&
        prev.productionMethod === prediction.productionMethod &&
        prev.carbonIntensity === prediction.carbonIntensity &&
        prev.destinationCountry === prediction.destinationCountry &&
        prev.carbonCreditsApplied === prediction.carbonCreditsApplied
      ) {
        return prev
      }
      const estimatedTax = calculateEstimatedTax(prediction)
      return { ...prediction, estimatedTax }
    })
  }, [])

  const applyCreditToShipment = (creditId: string) => {
    setCarbonCredits((prev) =>
      prev.map((credit) =>
        credit.id === creditId && credit.status === "available"
          ? { ...credit, status: "applied" as const }
          : credit
      )
    )
  }

  const availableCredits = carbonCredits
    .filter((c) => c.status === "available")
    .reduce((sum, c) => sum + c.credits, 0)

  const appliedCredits = carbonCredits
    .filter((c) => c.status === "applied")
    .reduce((sum, c) => sum + c.credits, 0)

  // Calculate readiness score based on profile completeness and credits
  const readinessScore = Math.min(100, 65 + (availableCredits > 200 ? 20 : availableCredits / 10) + (appliedCredits > 0 ? 15 : 0))

  return (
    <DashboardContext.Provider
      value={{
        taxPrediction,
        setTaxPrediction,
        carbonCredits,
        applyCreditToShipment,
        projectedTax: taxPrediction.estimatedTax || calculateEstimatedTax(taxPrediction),
        carbonIntensity: taxPrediction.carbonIntensity,
        availableCredits,
        readinessScore,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}
