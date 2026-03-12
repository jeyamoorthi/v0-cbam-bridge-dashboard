"use client"

import { useState, useMemo } from "react"
import { Calculator, TrendingUp, Leaf, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const productTypes = [
  { value: "steel", label: "Steel", baseEmission: 1.8 },
  { value: "aluminum", label: "Aluminum", baseEmission: 8.0 },
  { value: "cement", label: "Cement", baseEmission: 0.6 },
  { value: "fertilizer", label: "Fertilizer", baseEmission: 2.5 },
  { value: "hydrogen", label: "Hydrogen", baseEmission: 9.0 },
]

const productionMethods = [
  { value: "blast-furnace", label: "Blast Furnace", multiplier: 1.0 },
  { value: "electric-arc", label: "Electric Arc Furnace", multiplier: 0.65 },
  { value: "renewable", label: "Renewable Powered Furnace", multiplier: 0.35 },
]

const countries = [
  { value: "germany", label: "Germany", carbonPrice: 95 },
  { value: "france", label: "France", carbonPrice: 95 },
  { value: "italy", label: "Italy", carbonPrice: 95 },
  { value: "spain", label: "Spain", carbonPrice: 95 },
]

export function TaxPredictor() {
  const [productType, setProductType] = useState("steel")
  const [tonnage, setTonnage] = useState(2000)
  const [productionMethod, setProductionMethod] = useState("blast-furnace")
  const [country, setCountry] = useState("germany")
  const [carbonIntensity, setCarbonIntensity] = useState([2.1])

  const calculation = useMemo(() => {
    const product = productTypes.find((p) => p.value === productType)
    const method = productionMethods.find((p) => p.value === productionMethod)
    const targetCountry = countries.find((c) => c.value === country)

    if (!product || !method || !targetCountry) {
      return { perTonne: 0, total: 0, creditSavings: 0 }
    }

    const effectiveIntensity = carbonIntensity[0] * method.multiplier
    const perTonne = effectiveIntensity * targetCountry.carbonPrice
    const total = perTonne * tonnage
    const creditSavings = total * 0.15

    return { perTonne, total, creditSavings }
  }, [productType, tonnage, productionMethod, country, carbonIntensity])

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg">
            <Calculator className="h-5 w-5 text-primary-foreground" />
          </div>
          <CardTitle className="text-lg">CBAM Export Tax Predictor</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="product-type">Product Type</Label>
              <Select value={productType} onValueChange={setProductType}>
                <SelectTrigger id="product-type" className="w-full">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((product) => (
                    <SelectItem key={product.value} value={product.value}>
                      {product.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tonnage">Tonnage for Export (tonnes)</Label>
              <Input
                id="tonnage"
                type="number"
                value={tonnage}
                onChange={(e) => setTonnage(Number(e.target.value))}
                className="bg-muted/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="production-method">Production Method</Label>
              <Select
                value={productionMethod}
                onValueChange={setProductionMethod}
              >
                <SelectTrigger id="production-method" className="w-full">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {productionMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Destination Country</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="country" className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Carbon Intensity (kg CO₂ per tonne)</Label>
                <span className="text-sm font-medium text-secondary">
                  {carbonIntensity[0].toFixed(1)}
                </span>
              </div>
              <Slider
                value={carbonIntensity}
                onValueChange={setCarbonIntensity}
                min={0.5}
                max={10}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.5</span>
                <span>Low Carbon</span>
                <span>High Carbon</span>
                <span>10.0</span>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent p-6 border border-border/30">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Estimated CBAM Tax Liability
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Carbon Tax per Tonne
                  </span>
                  <div className="flex items-baseline gap-1">
                    <TrendingUp className="h-4 w-4 text-secondary mr-1" />
                    <span className="text-2xl font-bold text-foreground">
                      €{calculation.perTonne.toFixed(0)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      /tonne
                    </span>
                  </div>
                </div>
                <div className="h-px bg-border/50" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Estimated CBAM Tax
                  </span>
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    €{calculation.total.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-green-500/10 p-4 border border-green-500/20">
              <div className="flex items-start gap-3">
                <Leaf className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Potential Savings with Carbon Credits
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Using Indian carbon credits could reduce liability by up to{" "}
                    <span className="font-semibold text-green-400">15%</span>{" "}
                    under Article 6 cooperative mechanisms.
                  </p>
                  <p className="text-lg font-bold text-green-400 pt-1">
                    Save up to €
                    {calculation.creditSavings.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <p>
                Calculations based on current EU ETS carbon price of €95/tonne.
                Actual liability may vary based on verified emissions data.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
