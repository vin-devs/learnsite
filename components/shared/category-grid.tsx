import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, BarChart, Camera, Briefcase, Heart } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Programming",
    icon: Code,
    count: 245,
    href: "/catalog?category=programming",
  },
  {
    name: "Design",
    icon: Palette,
    count: 189,
    href: "/catalog?category=design",
  },
  {
    name: "Business",
    icon: Briefcase,
    count: 156,
    href: "/catalog?category=business",
  },
  {
    name: "Data Science",
    icon: BarChart,
    count: 98,
    href: "/catalog?category=data-science",
  },
  {
    name: "Photography",
    icon: Camera,
    count: 67,
    href: "/catalog?category=photography",
  },
  {
    name: "Health & Wellness",
    icon: Heart,
    count: 134,
    href: "/catalog?category=health",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Explore Categories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover courses and books across various subjects and skill levels
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="group hover:shadow-md transition-all hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{category.count} items</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
