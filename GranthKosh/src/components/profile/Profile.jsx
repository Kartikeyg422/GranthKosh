import { useState } from "react"
import Sidebar from "./Sidebar"
import OrderHistory from "./pages/OrderHistory"
import Addresses from "./pages/Addresses"
import PaymentMethods from "./pages/PaymentMethods"
import Settings from "./pages/Settings"
import ProfileForm from "./ProfileForm"

export default function Profile() {
  const [activeSection, setActiveSection] = useState("profile")

  const renderSection = () => {
    switch (activeSection) {
      case "orders":
        return <OrderHistory />
      case "addresses":
        return <Addresses />
      case "payments":
        return <PaymentMethods />
      case "settings":
        return <Settings />
      default:
        return <ProfileForm />
    }
  }

  return (
    <div className="bg-gray-50 h-[calc(100dvh-100px)]">
      <div className="flex">
        <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
        <main className="flex-1 p-8 h-[calc(100dvh-70px)] overflow-y-scroll scrollbar-hide">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}
