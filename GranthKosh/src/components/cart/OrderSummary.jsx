
import { useState } from "react"
import { Link } from "react-router-dom"

export default function OrderSummary({ subtotal }) {
  const [promoCode, setPromoCode] = useState("")

  return (
    <div className="border border-border rounded-lg bg-card p-6 h-fit sticky top-8">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Order Summary</h2>

      <div className="space-y-4 mb-6 pb-6 border-b border-border">
        <div className="flex justify-between">
          <span className="text-foreground">Subtotal</span>
          <span className="font-medium text-foreground">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground">Shipping</span>
          <span className="text-muted-foreground">Calculated at next step</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground">Taxes</span>
          <span className="text-muted-foreground">Calculated at next step</span>
        </div>
      </div>

      <div className="flex justify-between mb-6 pb-6 border-b border-border">
        <span className="text-lg font-bold text-foreground">Total</span>
        <span className="text-2xl font-bold text-foreground">₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Promo Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground"
            />
            <button className="px-6 py-2 font-semibold text-foreground hover:bg-muted rounded-lg">Apply</button>
          </div>
        </div>

        <Link to={'/checkout'} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
