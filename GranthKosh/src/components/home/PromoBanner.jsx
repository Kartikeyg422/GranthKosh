export default function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="bg-amber-50 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Summer Reading Sale!</h2>
          <p className="text-gray-700">Get 20% off on all fiction bestsellers. Dive into a new adventure today.</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
          Shop the Sale
        </button>
      </div>
    </section>
  )
}
