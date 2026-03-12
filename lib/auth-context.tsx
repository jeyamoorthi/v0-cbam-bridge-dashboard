"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface User {
  id: string
  email: string
  fullName: string
  companyName: string
  exportIndustry: string
  annualExportVolume: string
  exportingCountry: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (data: SignUpData) => Promise<boolean>
  signOut: () => void
  updateProfile: (data: Partial<User>) => void
}

interface SignUpData {
  fullName: string
  companyName: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for existing session only on client
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("cbam_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch {
        // Ignore localStorage errors
      }
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Mock authentication - in production, this would call your API
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: "usr_" + Math.random().toString(36).substr(2, 9),
        email,
        fullName: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
        companyName: "Steel Industries Ltd.",
        exportIndustry: "steel",
        annualExportVolume: "10000",
        exportingCountry: "germany",
      }
      setUser(mockUser)
      localStorage.setItem("cbam_user", JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const signUp = async (data: SignUpData): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const newUser: User = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      email: data.email,
      fullName: data.fullName,
      companyName: data.companyName,
      exportIndustry: "",
      annualExportVolume: "",
      exportingCountry: "",
    }
    setUser(newUser)
    localStorage.setItem("cbam_user", JSON.stringify(newUser))
    return true
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("cbam_user")
  }

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("cbam_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading: isLoading || !mounted, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
