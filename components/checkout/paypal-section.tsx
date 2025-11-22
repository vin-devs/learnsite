"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, CheckCircle, XCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type PayPalStatus = "idle" | "pending" | "success" | "failed"

export function PayPalSection() {
  const [status, setStatus] = useState<PayPalStatus>("idle")
  const { toast } = useToast()

  const handlePayPalPayment = async () => {
    setStatus("pending")

    // Simulate PayPal payment process
    setTimeout(() => {
      // For demo purposes, randomly succeed or fail
      const success = Math.random() > 0.2 // 80% success rate
      setStatus(success ? "success" : "failed")

      if (success) {
        toast({
          title: "PayPal payment successful",
          description: "Your payment has been processed successfully",
        })
      } else {
        toast({
          title: "PayPal payment failed",
          description: "Please try again or use a different payment method",
          variant: "destructive",
        })
      }
    }, 3000)
  }

  const handleSimulateSuccess = () => {
    setStatus("success")
    toast({
      title: "PayPal payment successful (Simulated)",
      description: "This is a demo success for testing purposes",
    })
  }

  const handleSimulateFailure = () => {
    setStatus("failed")
    toast({
      title: "PayPal payment failed (Simulated)",
      description: "This is a demo failure for testing purposes",
      variant: "destructive",
    })
  }

  const resetStatus = () => {
    setStatus("idle")
  }

  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2 text-blue-700">
          <CreditCard className="h-5 w-5" />
          <span className="font-medium">PayPal Payment</span>
        </div>

        <div className="space-y-3">
          {status === "idle" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                You will be redirected to PayPal to complete your payment securely.
              </p>
              <Button type="button" onClick={handlePayPalPayment} className="w-full bg-blue-600 hover:bg-blue-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay with PayPal
              </Button>
            </div>
          )}

          {status === "pending" && (
            <div className="text-center py-4">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2 animate-spin" />
              <p className="font-medium text-blue-700">Processing Payment</p>
              <p className="text-sm text-muted-foreground">Please wait while we process your PayPal payment</p>
              <Badge variant="outline" className="mt-2">
                Redirecting to PayPal...
              </Badge>
            </div>
          )}

          {status === "success" && (
            <div className="text-center py-4">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-green-700">Payment Successful!</p>
              <p className="text-sm text-muted-foreground">Your PayPal payment has been processed successfully</p>
              <Badge className="mt-2 bg-green-100 text-green-800">Confirmed</Badge>
            </div>
          )}

          {status === "failed" && (
            <div className="text-center py-4">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="font-medium text-red-700">Payment Failed</p>
              <p className="text-sm text-muted-foreground">There was an issue processing your PayPal payment</p>
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
