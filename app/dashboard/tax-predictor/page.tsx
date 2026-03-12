"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDashboard } from "@/lib/dashboard-store"
import { AnimatedCounter } from "@/components/animated-counter"
import { Calculator, Euro, Leaf, TrendingDown, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const productTypes = [
  { value: "steel", label: "Steel & Iron", rate: 95 },
  { value: "aluminum", label: "Aluminum", rate: 85 },
  { value: "cement", label: "Cement", rate: 75 },
  { value: "fertilizers", label: "Fertilizers", rate: 65 },
  { value: "electricity", label: "Electricity", rate: 55 },
  { value: "hydrogen", label: "Hydrogen", rate: 70 },
]

const productionMethods: Record<string, { value: string; label: string; multiplier: number }[]> = {
  steel: [
    { value: "blast_furnace", label: "Blast Furnace (BF-BOF)", multiplier: 1.0 },
    { value: "electric_arc", label: "Electric Arc Furnace (EAF)", multiplier: 0.6 },
    { value: "dri_process", label: "Direct Reduced Iron (DRI)", multiplier: 0.75 },
  ],
  aluminum: [
    { value: "bayer_process", label: "Bayer Process", multiplier: 1.0 },
    { value: "hall_heroult", label: "Hall-Héroult Process", multiplier: 0.85 },
  ],
  cement: [
    { value: "dry_process", label: "Dry Process", multiplier: 0.9 },
    { value: "wet_process", label: "Wet Process", multiplier: 1.0 },
  ],
  fertilizers: [
    { value: "haber_bosch", label: "Haber-Bosch Process", multiplier: 1.0 },
    { value: "green_ammonia", label: "Green Ammonia", multiplier: 0.4 },
  ],
  electricity: [
    { value: "coal", label: "Coal Power", multiplier: 1.0 },
    { value: "gas", label: "Natural Gas", multiplier: 0.6 },
    { value: "renewable", label: "Renewable", multiplier: 0.1 },
  ],
  hydrogen: [
    { value: "grey_hydrogen", label: "Grey Hydrogen (SMR)", multiplier: 1.0 },
    { value: "blue_hydrogen", label: "Blue Hydrogen (CCS)", multiplier: 0.4 },
    { value: "green_hydrogen", label: "Green Hydrogen", multiplier: 0.1 },
  ],
}

const destinationCountries = [
  { value: "germany", label: "Germany" },
  { value: "france", label: "France" },
  { value: "italy", label: "Italy" },
  { value: "spain", label: "Spain" },
  { value: "netherlands", label: "Netherlands" },
  { value: "belgium", label: "Belgium" },
  { value: "poland", label: "Poland" },
  { value: "austria", label: "Austria" },
]

export default function TaxPredictorPage() {
  const { setTaxPrediction, availableCredits } = useDashboard()
  
  const [productType, setProductType] = useState("steel")
  const [tonnage, setTonnage] = useState(1000)
  const [productionMethod, setProductionMethod] = useState("blast_furnace")
  const [carbonIntensity, setCarbonIntensity] = useState([1.8])
  const [destinationCountry, setDestinationCountry] = useState("germany")
  const [applyCredits, setApplyCredits] = useState(false)

  const [estimatedTax, setEstimatedTax] = useState(0)
  const [taxSavings, setTaxSavings] = useState(0)

  // Calculate tax whenever inputs change
  useEffect(() => {
    const product = productTypes.find((p) => p.value === productType)
    const method = productionMethods[productType]?.find((m) => m.value === productionMethod)
    
    const baseRate = product?.rate || 80
    const methodMultiplier = method?.multiplier || 1.0
    
    // Total tax = tonnage × carbon intensity × base rate × method multiplier
    const totalTax = tonnage * carbonIntensity[0] * baseRate * methodMultiplier
    
    // Calculate savings from carbon credits
    const creditsToApply = applyCredits ? Math.min(availableCredits, tonnage * carbonIntensity[0]) : 0
    const creditsSavings = creditsToApply * baseRate
    
    const finalTax = Math.max(0, totalTax - creditsSavings)
    
    setEstimatedTax(finalTax)
    setTaxSavings(creditsSavings)
    
    // Update global state
    setTaxPrediction({
      productType,
      tonnage,
      productionMethod,
      carbonIntensity: carbonIntensity[0],
      destinationCountry,
      estimatedTax: finalTax,
      carbonCreditsApplied: creditsToApply,
    })
  }, [productType, tonnage, productionMethod, carbonIntensity, destinationCountry, applyCredits, availableCredits, setTaxPrediction])

  // Reset production method when product type changes
  useEffect(() => {
    const methods = productionMethods[productType]
    if (methods && methods.length > 0) {
      setProductionMethod(methods[0].value)
    }
  }, [productType])

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-foreground">CBAM Tax Predictor</h1>
          <p className="text-muted-foreground">
            Calculate your estimated EU Carbon Border Adjustment Mechanism tax liability
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Input Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Tax Calculator
              </CardTitle>
              <CardDescription>
                Enter your export details to calculate CBAM tax
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Type */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="productType">Product Type</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select the category of goods being exported to the EU</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select value={productType} onValueChange={setProductType}>
                  <SelectTrigger id="productType">
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((product) => (
                      <SelectItem key={product.value} value={product.value}>
                        {product.label} (€{product.rate}/tCO₂)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tonnage */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="tonnage">Export Tonnage</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total tonnes of product to be exported</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="tonnage"
                  type="number"
                  min={1}
                  value={tonnage}
                  onChange={(e) => setTonnage(Number(e.target.value) || 1)}
                  placeholder="Enter tonnage"
                />
              </div>

              {/* Production Method */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="productionMethod">Production Method</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Manufacturing process affects carbon intensity</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select value={productionMethod} onValueChange={setProductionMethod}>
                  <SelectTrigger id="productionMethod">
                    <SelectValue placeholder="Select production method" />
                  </SelectTrigger>
                  <SelectContent>
                    {productionMethods[productType]?.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label} ({(method.multiplier * 100).toFixed(0)}% intensity)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Carbon Intensity Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label>Carbon Intensity (tCO₂ per tonne product)</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Embedded emissions per unit of product</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="font-semibold text-primary">{carbonIntensity[0].toFixed(2)} tCO₂/t</span>
                </div>
                <Slider
                  value={carbonIntensity}
                  onValueChange={setCarbonIntensity}
                  min={0.1}
                  max={3.0}
                  step={0.01}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low (0.1)</span>
                  <span>Medium (1.5)</span>
                  <span>High (3.0)</span>
                </div>
              </div>

              {/* Destination Country */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="destinationCountry">Destination Country</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>EU member state for import declaration</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select value={destinationCountry} onValueChange={setDestinationCountry}>
                  <SelectTrigger id="destinationCountry">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinationCountries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Apply Carbon Credits */}
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
                <div>
                  <p className="font-medium text-foreground">Apply Carbon Credits</p>
                  <p className="text-sm text-muted-foreground">
                    Use {availableCredits} available credits to offset tax
                  </p>
                </div>
                <Button
                  variant={applyCredits ? "default" : "outline"}
                  onClick={() => setApplyCredits(!applyCredits)}
                >
                  {applyCredits ? "Applied" : "Apply Credits"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <div className="space-y-4">
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Euro className="h-5 w-5 text-primary" />
                  Estimated CBAM Tax
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">
                  <AnimatedCounter value={estimatedTax} prefix="€" decimals={0} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  For {tonnage.toLocaleString()} tonnes to {destinationCountries.find(c => c.value === destinationCountry)?.label}
                </p>
              </CardContent>
            </Card>

            {applyCredits && taxSavings > 0 && (
              <Card className="border-secondary/30 bg-gradient-to-br from-secondary/5 to-secondary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingDown className="h-5 w-5 text-secondary" />
                    Tax Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">
                    <AnimatedCounter value={taxSavings} prefix="-€" decimals={0} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    From carbon credit offsets
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Leaf className="h-5 w-5 text-secondary" />
                  Carbon Emissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  <AnimatedCounter 
                    value={tonnage * carbonIntensity[0]} 
                    suffix=" tCO₂" 
                    decimals={0} 
                  />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Total embedded emissions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Rate</span>
                    <span className="font-medium">€{productTypes.find(p => p.value === productType)?.rate || 80}/tCO₂</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method Multiplier</span>
                    <span className="font-medium">
                      {((productionMethods[productType]?.find(m => m.value === productionMethod)?.multiplier || 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Carbon Intensity</span>
                    <span className="font-medium">{carbonIntensity[0].toFixed(2)} tCO₂/t</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-medium">
                      <span>Total Tax</span>
                      <span className="text-primary">€{estimatedTax.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
