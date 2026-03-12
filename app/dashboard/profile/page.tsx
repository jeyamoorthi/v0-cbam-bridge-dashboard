"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { User, Building, Globe, Package, Save, Check } from "lucide-react"

const exportIndustries = [
  { value: "steel", label: "Steel & Iron" },
  { value: "aluminum", label: "Aluminum" },
  { value: "cement", label: "Cement" },
  { value: "fertilizers", label: "Fertilizers" },
  { value: "chemicals", label: "Chemicals" },
  { value: "textiles", label: "Textiles" },
  { value: "other", label: "Other" },
]

const exportVolumes = [
  { value: "1000", label: "Less than 1,000 tonnes" },
  { value: "5000", label: "1,000 - 5,000 tonnes" },
  { value: "10000", label: "5,000 - 10,000 tonnes" },
  { value: "50000", label: "10,000 - 50,000 tonnes" },
  { value: "100000", label: "More than 50,000 tonnes" },
]

const exportingCountries = [
  { value: "germany", label: "Germany" },
  { value: "france", label: "France" },
  { value: "italy", label: "Italy" },
  { value: "spain", label: "Spain" },
  { value: "netherlands", label: "Netherlands" },
  { value: "belgium", label: "Belgium" },
  { value: "multiple", label: "Multiple EU Countries" },
]

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [fullName, setFullName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [exportIndustry, setExportIndustry] = useState("")
  const [annualExportVolume, setAnnualExportVolume] = useState("")
  const [exportingCountry, setExportingCountry] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "")
      setCompanyName(user.companyName || "")
      setExportIndustry(user.exportIndustry || "")
      setAnnualExportVolume(user.annualExportVolume || "")
      setExportingCountry(user.exportingCountry || "")
    }
  }, [user])

  const calculateCompletion = () => {
    const fields = [fullName, companyName, exportIndustry, annualExportVolume, exportingCountry]
    const filledFields = fields.filter((f) => f && f.length > 0).length
    return (filledFields / fields.length) * 100
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaved(false)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    updateProfile({
      fullName,
      companyName,
      exportIndustry,
      annualExportVolume,
      exportingCountry,
    })
    
    setIsSaving(false)
    setSaved(true)
    
    setTimeout(() => setSaved(false), 3000)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const completionPercentage = calculateCompletion()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account information and export preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Completion Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Profile Completion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                  {getInitials(fullName || "User")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-semibold text-foreground">{fullName || "Your Name"}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completion</span>
                <span className="font-medium text-foreground">{completionPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>

            <div className="space-y-2 rounded-lg bg-muted/30 p-4">
              <p className="text-sm font-medium text-foreground">Why complete your profile?</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Get accurate CBAM tax calculations</li>
                <li>• Receive personalized compliance advice</li>
                <li>• Track industry-specific updates</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Update your business details for accurate CBAM assessments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <User className="h-4 w-4" />
                Personal Information
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-muted/50"
                  />
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Building className="h-4 w-4" />
                Company Details
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exportIndustry">Export Industry</Label>
                  <Select value={exportIndustry} onValueChange={setExportIndustry}>
                    <SelectTrigger id="exportIndustry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {exportIndustries.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          {industry.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Export Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Package className="h-4 w-4" />
                Export Information
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="annualExportVolume">Annual Export Volume</Label>
                  <Select value={annualExportVolume} onValueChange={setAnnualExportVolume}>
                    <SelectTrigger id="annualExportVolume">
                      <SelectValue placeholder="Select volume" />
                    </SelectTrigger>
                    <SelectContent>
                      {exportVolumes.map((volume) => (
                        <SelectItem key={volume.value} value={volume.value}>
                          {volume.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exportingCountry">Primary Export Destination</Label>
                  <Select value={exportingCountry} onValueChange={setExportingCountry}>
                    <SelectTrigger id="exportingCountry">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {exportingCountries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end gap-4 border-t border-border pt-6">
              {saved && (
                <span className="flex items-center gap-2 text-sm text-green-500">
                  <Check className="h-4 w-4" />
                  Profile saved successfully
                </span>
              )}
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
