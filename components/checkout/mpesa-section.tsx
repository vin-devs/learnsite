"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, CheckCircle, XCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type MPesaStatus = "idle" | "pending" | "success" | "failed"

export function MPesaSection() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [status, setStatus] = useState<MPesaStatus>("idle")
  const { toast } = useToast()

  const handleSendSTKPush = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      })
      return
    }

    setStatus("pending")

    // Simulate STK push process
    setTimeout(() => {
      // For demo purposes, randomly succeed or fail
      const success = Math.random() > 0.3 // 70% success rate
      setStatus(success ? "success" : "failed")

      if (success) {
        toast({
          title: "Payment request sent",
          description: "Please check your phone and enter your M-Pesa PIN",
        })
      } else {
        toast({
          title: "Payment failed",
          description: "Please try again or use a different payment method",
          variant: "destructive",
        })
      }
    }, 2000)
  }

  const handleSimulateSuccess = () => {
    setStatus("success")
    toast({
      title: "Payment successful (Simulated)",
      description: "This is a demo success for testing purposes",
    })
  }

  const handleSimulateFailure = () => {
    setStatus("failed")
    toast({
      title: "Payment failed (Simulated)",
      description: "This is a demo failure for testing purposes",
      variant: "destructive",
    })
  }

  const resetStatus = () => {
    setStatus("idle")
  }

  return (
    <Card className="border-green-200 bg-green-50/50">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2 text-green-700">
          <Smartphone className="h-5 w-5" />
          <span className="font-medium">M-Pesa Payment</span>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+254712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={status === "pending" || status === "success"}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">Enter your M-Pesa registered phone number</p>
          </div>

          {status === "idle" && (
            <Button
              type="button"
              onClick={handleSendSTKPush}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!phoneNumber}
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Send STK Push
            </Button>
          )}

          {status === "pending" && (
            <div className="text-center py-4">
              <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2 animate-spin" />
              <p className="font-medium text-orange-700">Payment request sent</p>
              <p className="text-sm text-muted-foreground">Please check your phone and enter your M-Pesa PIN</p>
              <Badge variant="outline" className="mt-2">
                Waiting for confirmation...
              </Badge>
            </div>
          )}

          {status === "success" && (
            <div className="text-center py-4">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-green-700">Payment Successful!</p>
              <p className="text-sm text-muted-foreground">Transaction completed successfully</p>
              <Badge className="mt-2 bg-green-100 text-green-800">Confirmed</Badge>
            </div>
          )}

          {status === "failed" && (
            <div className="text-center py-4">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="font-medium text-red-700">Payment Failed</p>
              <p className="text-sm text-muted-foreground">Please try again or use a different payment method</p>
              <Button type="button" variant="outline" onClick={resetStatus} className="mt-2 bg-transparent">
                Try Again
              </Button>
            </div>
          )}

          {/* Development Testing Buttons */}
          <div className="border-t pt-3 mt-4">
            <p className="text-xs text-muted-foreground mb-2">Development Testing:</p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSimulateSuccess}
                className="text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
              >
                Simulate Success
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSimulateFailure}
                className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
              >
                Simulate Failure
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
