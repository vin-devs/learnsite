"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  purchases: string[]
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("learnhub-user")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        if (userData.email === "admin@learnhub.com" && (!userData.purchases || userData.purchases.length === 0)) {
          userData.purchases = ["course-1", "course-2", "book-1", "book-2"]
        }
        setUser(userData)
      } catch (error) {
        console.error("Failed to parse stored user data:", error)
        localStorage.removeItem("learnhub-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    if (userData.email === "admin@learnhub.com" && (!userData.purchases || userData.purchases.length === 0)) {
      userData.purchases = ["course-1", "course-2", "book-1", "book-2"]
    }
    setUser(userData)
    localStorage.setItem("learnhub-user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("learnhub-user")
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
