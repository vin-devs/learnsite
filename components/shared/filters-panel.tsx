"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"
import { categories } from "@/data/seed"

export interface FilterState {
  type: "all" | "course" | "book"
  categories: string[]
  level: string[]
  priceRange: [number, number]
  rating: number
  sortBy: string
}

interface FiltersPanelProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  className?: string
}

const levels = ["Beginner", "Intermediate", "Advanced"]
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
]

export function FiltersPanel({ filters, onFiltersChange, className }: FiltersPanelProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...localFilters, ...updates }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      type: "all",
      categories: [],
      level: [],
      priceRange: [0, 200],
      rating: 0,
      sortBy: "popular",
    }
    setLocalFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const hasActiveFilters =
    localFilters.type !== "all" ||
    localFilters.categories.length > 0 ||
    localFilters.level.length > 0 ||
    localFilters.priceRange[0] > 0 ||
    localFilters.priceRange[1] < 200 ||
    localFilters.rating > 0

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Sort By</Label>
        <Select value={localFilters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Type Filter */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Type</Label>
        <div className="space-y-2">
          {[
            { value: "all", label: "All Products" },
            { value: "course", label: "Courses" },
            { value: "book", label: "Books" },
          ].map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type.value}`}
                checked={localFilters.type === type.value}
                onCheckedChange={() => updateFilters({ type: type.value as FilterState["type"] })}
              />
              <Label htmlFor={`type-${type.value}`} className="text-sm">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Categories</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={localFilters.categories.includes(category.id)}
                onCheckedChange={(checked) => {
                  const newCategories = checked
                    ? [...localFilters.categories, category.id]
                    : localFilters.categories.filter((c) => c !== category.id)
                  updateFilters({ categories: newCategories })
                }}
              />
              <Label htmlFor={`category-${category.id}`} className="text-sm flex-1">
                {category.name}
              </Label>
              <span className="text-xs text-muted-foreground">({category.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Level (for courses) */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Level</Label>
        <div className="space-y-2">
          {levels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={`level-${level}`}
                checked={localFilters.level.includes(level)}
                onCheckedChange={(checked) => {
                  const newLevels = checked
                    ? [...localFilters.level, level]
                    : localFilters.level.filter((l) => l !== level)
                  updateFilters({ level: newLevels })
                }}
              />
              <Label htmlFor={`level-${level}`} className="text-sm">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          Price Range: ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
        </Label>
        <Slider
          value={localFilters.priceRange}
          onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
          max={200}
          min={0}
          step={5}
          className="w-full"
        />
      </div>

      {/* Rating */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0, 0].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={localFilters.rating === rating}
                onCheckedChange={() => updateFilters({ rating })}
              />
              <Label htmlFor={`rating-${rating}`} className="text-sm">
                {rating > 0 ? `${rating}+ stars` : "Any rating"}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <div className={`hidden lg:block ${className}`}>
        <div className="sticky top-20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Filters</h3>
            {hasActiveFilters && (
              <Badge variant="secondary">
                {[
                  localFilters.type !== "all" ? 1 : 0,
                  localFilters.categories.length,
                  localFilters.level.length,
                  localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 200 ? 1 : 0,
                  localFilters.rating > 0 ? 1 : 0,
                ].reduce((a, b) => a + b, 0)}{" "}
                active
              </Badge>
            )}
          </div>
          <FiltersContent />
        </div>
      </div>

      {/* Mobile Filters */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {[
                  localFilters.type !== "all" ? 1 : 0,
                  localFilters.categories.length,
                  localFilters.level.length,
                  localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 200 ? 1 : 0,
                  localFilters.rating > 0 ? 1 : 0,
                ].reduce((a, b) => a + b, 0)}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FiltersContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
