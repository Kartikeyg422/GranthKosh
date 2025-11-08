import {
  BookOpen,
  Rocket,
  MailMinus as MagnifyingGlass,
  Wand2,
  BookMarked,
  Clock,
  Lightbulb,
  MoreHorizontal,
} from "lucide-react"

export default function CategoryBrowser() {
  const categories = [
    { name: "Fiction", icon: BookOpen },
    { name: "Sci-Fi", icon: Rocket },
    { name: "Mystery", icon: MagnifyingGlass },
    { name: "Fantasy", icon: Wand2 },
    { name: "Biography", icon: BookMarked },
    { name: "History", icon: Clock },
    { name: "Self-Help", icon: Lightbulb },
    { name: "More", icon: MoreHorizontal },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.name}
              className="flex flex-col items-center justify-center p-6 md:p-8 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
            >
              <Icon className="w-12 h-12 text-amber-500 mb-3" />
              <span className="font-semibold text-gray-900 text-sm md:text-base">{category.name}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
