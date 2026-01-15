"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Shield, CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import { piPaymentService, type PiPayment } from "@/lib/pi-payment"
import type { Property } from "@/lib/mock-data"

interface SmartInvoiceDialogProps {
  property: Property
  children: React.ReactNode
}

export function SmartInvoiceDialog({ property, children }: SmartInvoiceDialogProps) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<"details" | "processing" | "success" | "error">("details")
  const [buyerName, setBuyerName] = useState("")
  const [buyerEmail, setBuyerEmail] = useState("")
  const [transactionId, setTransactionId] = useState("")

  const handlePayment = async () => {
    setStep("processing")

    try {
      const payment: PiPayment = {
        amount: Number.parseFloat(property.price.replace(/[^0-9.]/g, "")),
        memo: `Payment for ${property.title}`,
        metadata: {
          propertyId: property.id,
          propertyTitle: property.title,
          buyerInfo: `${buyerName} (${buyerEmail})`,
        },
      }

      const result = await piPaymentService.createPayment(payment)

      if (result) {
        setTransactionId(result.identifier)
        setStep("success")
      } else {
        setStep("error")
      }
    } catch (error) {
      console.error("[v0] Payment failed:", error)
      setStep("error")
    }
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setStep("details")
      setBuyerName("")
      setBuyerEmail("")
      setTransactionId("")
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-2 border-primary/40">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-primary">
            <Shield className="h-5 w-5" />
            Smart Invoice System
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Secure Pi Blockchain payment with military-grade encryption
          </DialogDescription>
        </DialogHeader>

        {step === "details" && (
          <div className="space-y-6 py-4">
            <div className="rounded-lg border border-primary/30 bg-secondary/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">{property.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{property.location}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-primary">{property.price}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="buyer-name" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="buyer-name"
                  placeholder="Enter your full name"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="bg-background border-primary/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buyer-email" className="text-foreground">
                  Email Address
                </Label>
                <Input
                  id="buyer-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="bg-background border-primary/30"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-primary/10 border border-primary/30 p-3">
              <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-foreground mb-1">Blockchain Security</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Your transaction is secured by Pi Network blockchain with end-to-end encryption and smart contract
                  verification.
                </p>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={!buyerName || !buyerEmail}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Pay with Pi Network
            </Button>
          </div>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Processing Payment</h3>
            <p className="text-sm text-muted-foreground text-center">
              Securing transaction on Pi blockchain...
              <br />
              Please do not close this window.
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Payment Successful!</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Your transaction has been verified on the Pi blockchain.
            </p>
            <div className="w-full rounded-lg border border-primary/30 bg-secondary/50 p-4 mb-6">
              <p className="text-xs text-muted-foreground mb-1">Transaction ID</p>
              <p className="text-sm font-mono text-foreground break-all">{transactionId}</p>
            </div>
            <Button onClick={handleClose} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Close
            </Button>
          </div>
        )}

        {step === "error" && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-16 w-16 rounded-full bg-destructive/20 flex items-center justify-center mb-4">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Payment Failed</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              There was an issue processing your payment.
              <br />
              Please try again or contact support.
            </p>
            <div className="flex gap-3 w-full">
              <Button onClick={handleClose} variant="outline" className="flex-1 border-primary/30 bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={() => setStep("details")}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
