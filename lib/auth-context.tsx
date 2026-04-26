"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { User, UserRole } from "./types"
import { adminUser, doctorUser } from "./data"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Demo login - in production, this would validate against a backend
    if (email === "admin@leocare.com" && password === "admin123") {
      setUser(adminUser)
      return true
    }
    if (email === "doctor@leocare.com" && password === "doctor123") {
      setUser(doctorUser)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
