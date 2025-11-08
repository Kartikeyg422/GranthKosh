export default function Hero() {
  return (
    <section
      className="relative h-80 md:h-96 bg-cover bg-center rounded-2xl mx-4 md:mx-6 my-8 overflow-hidden"
      style={{
        backgroundImage: "url(/placeholder.svg?height=400&width=1200&query=library bookshelf interior dark wood)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Discover Your Next Great Read</h1>
        <p className="text-gray-100 text-sm md:text-base mb-8 max-w-2xl text-balance">
          Explore our curated collection of new arrivals, timeless classics, and hidden gems. Your next adventure is
          just a page away.
        </p>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          Shop New Arrivals
        </button>
      </div>
    </section>
  )
}
