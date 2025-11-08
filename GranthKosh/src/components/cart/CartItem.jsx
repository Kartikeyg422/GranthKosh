
import { Minus, Plus } from "lucide-react"


export default function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <div className="flex gap-6 p-6 border border-border rounded-lg bg-card">
      {/* Product image */}
      <div className="w-24 h-32 flex-shrink-0">
        <img 
          src={item.image || "/placeholder.svg"} 
          alt={item.title} 
          className="w-full h-full object-cover rounded"
          onError={(e) => {
            e.target.src = "/placeholder.svg";
          }}
        />
      </div>

      {/* Product details */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">By {item.author}</p>
        <p className="text-lg font-semibold text-foreground mb-4">₹{item.price.toFixed(2)}</p>
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Save for Later</button>
          <button onClick={() => onRemove(item.id)} className="text-red-600 hover:text-red-700 text-sm font-medium">
            Remove
          </button>
        </div>
      </div>

      {/* Quantity and price */}
      <div className="flex flex-col items-end justify-between">
        <div className="flex items-center gap-4 bg-muted rounded-lg p-2">
          <button onClick={() => onQuantityChange(item.id, item.quantity - 1)} className="p-1 hover:bg-border rounded">
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button onClick={() => onQuantityChange(item.id, item.quantity + 1)} className="p-1 hover:bg-border rounded">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <p className="text-lg font-bold text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  )
}
