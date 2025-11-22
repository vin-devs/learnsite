import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
          Unlock Your Potential with
          <span className="text-primary"> Digital Learning</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
          Discover thousands of high-quality courses and books from expert instructors. Start your learning journey
          today and advance your skills.
        </p>

        {/* Hero Search */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="What do you want to learn?" className="pl-10 h-12 text-base" />
          </div>
          <Button size="lg" className="h-12 px-8">
            Search
          </Button>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/books">Explore Books</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
