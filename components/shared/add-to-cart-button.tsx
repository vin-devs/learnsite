"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCartStore } from "@/store/cart"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function AddToCartButton({ product, variant = "default", size = "default", className }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const { addItem, setIsOpen } = useCartStore()
  const { toast } = useToast()

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const cartItem = {
      productId: product.id,
      kind: product.kind,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    }

    addItem(cartItem)

    // Show success state
    setJustAdded(true)
    setIsAdding(false)

    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
      action: (
        <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
          View Cart
        </Button>
      ),
    })

    // Reset success state after 2 seconds
    setTimeout(() => setJustAdded(false), 2000)
  }

  if (justAdded) {
    return (
      <Button variant="outline" size={size} className={className} disabled>
        <Check className="h-4 w-4 mr-2" />
        Added!
      </Button>
    )
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleAddToCart} disabled={isAdding}>
      <ShoppingCart className="h-4 w-4 mr-2" />
      {isAdding ? "Adding..." : product.kind === "course" ? "Enroll Now" : "Buy Now"}
    </Button>
  )
}
