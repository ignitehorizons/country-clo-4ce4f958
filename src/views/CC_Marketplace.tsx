import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Sofa,
  Wrench,
  Smartphone,
  Sprout,
  Shirt,
  Cake,
  Car,
  Sparkles,
  Search,
  Store,
  Star,
} from "lucide-react";

const listings = [
  {
    id: 1,
    category: "Furniture",
    title: "Mid-Century Sofa",
    condition: "Like New",
    price: "$285",
    seller: "Sarah M.",
    date: "Apr 10",
    icon: <Sofa className="w-12 h-12 text-white" />,
    isFree: false,
    isWanted: false,
  },
  {
    id: 2,
    category: "Tools",
    title: "DeWalt Drill Set",
    condition: "Good",
    price: "$65",
    seller: "Tom K.",
    date: "Apr 9",
    icon: <Wrench className="w-12 h-12 text-white" />,
    isFree: false,
    isWanted: false,
  },
  {
    id: 3,
    category: "Electronics",
    title: "iPad Air (2022)",
    condition: "Good",
    price: "$320",
    seller: "Jeremy S.",
    date: "Apr 8",
    icon: <Smartphone className="w-12 h-12 text-white" />,
    isFree: false,
    isWanted: false,
  },
  {
    id: 4,
    category: "Garden",
    title: "Tomato Seedlings",
    condition: "New",
    price: "FREE",
    seller: "Linda R.",
    date: "Apr 8",
    icon: <Sprout className="w-12 h-12 text-white" />,
    isFree: true,
    isWanted: false,
  },
  {
    id: 5,
    category: "Clothing",
    title: "Women's Workout Clothes (Size M)",
    condition: "Like New",
    price: "FREE",
    seller: "Amy P.",
    date: "Apr 7",
    icon: <Shirt className="w-12 h-12 text-white" />,
    isFree: true,
    isWanted: false,
  },
  {
    id: 6,
    category: "Baked Goods",
    title: "Homemade Sourdough Bread",
    condition: "New",
    price: "$8",
    seller: "Karen C.",
    date: "Apr 7",
    icon: <Cake className="w-12 h-12 text-white" />,
    isFree: false,
    isWanted: false,
  },
  {
    id: 7,
    category: "Vehicles",
    title: "Bicycle — Adult Mountain Bike",
    condition: "Good",
    price: "$120",
    seller: "Mike J.",
    date: "Apr 5",
    icon: <Car className="w-12 h-12 text-white" />,
    isFree: false,
    isWanted: false,
  },
  {
    id: 8,
    category: "Crafts",
    title: "Handmade Ceramic Mugs (Set of 4)",
    condition: "New",
    price: "$45",
    seller: "Karen C.",
    date: "Apr 3",
    icon: <Sparkles className="w-12 h-12 text-white" />,
    isFree: false,
    isWanted: false,
  },
  {
    id: 9,
    category: "Wanted",
    title: "Looking for a lawn mower to borrow for one afternoon",
    condition: "N/A",
    price: "Wanted",
    seller: "Robert B.",
    date: "Apr 2",
    icon: <Search className="w-12 h-12 text-white" />,
    isFree: false,
    isWanted: true,
  },
];

const shops = [
  {
    id: 1,
    name: "Karen's Kitchen",
    owner: "Karen C.",
    desc: "Homemade sourdough, cookies, and seasonal treats baked fresh each week.",
    items: 6,
    rating: 4.9,
    sales: "12 happy neighbors",
    categories: ["Baked Goods", "Treats"],
    gradient: "linear-gradient(135deg, #E8A020, #D4911A)",
  },
  {
    id: 2,
    name: "Close Ceramics",
    owner: "Sarah M.",
    desc: "Handmade ceramic mugs, bowls, and planters. Each piece is one of a kind.",
    items: 14,
    rating: 5.0,
    sales: "8 happy neighbors",
    categories: ["Crafts", "Home Decor"],
    gradient: "linear-gradient(135deg, #8B6914, #4A3728)",
  },
  {
    id: 3,
    name: "Green Thumb Garden",
    owner: "Linda R.",
    desc: "Local plant cuttings, organic seeds, and garden advice.",
    items: 24,
    rating: 4.8,
    sales: "34 happy neighbors",
    categories: ["Garden", "Plants"],
    gradient: "linear-gradient(135deg, #2D5016, #3D6B20)",
  },
];

const categories = [
  "All",
  "Furniture",
  "Electronics",
  "Tools",
  "Clothing",
  "Vehicles",
  "Services",
  "Free Items",
  "Wanted",
  "Baked Goods",
  "Garden",
  "Crafts",
  "Other",
];

const getCategoryGradient = (category: string, isFree: boolean) => {
  if (isFree) return "linear-gradient(135deg, #E8A020, #D4911A)";
  switch (category) {
    case "Furniture":
      return "linear-gradient(135deg, #C4A875, #8B6914)";
    case "Electronics":
      return "linear-gradient(135deg, #6BA3BE, #4A8CAE)";
    case "Tools":
      return "linear-gradient(135deg, #2D5016, #3D6B20)";
    case "Services":
      return "linear-gradient(135deg, #7A6A5A, #4A3728)";
    default:
      return "linear-gradient(135deg, #C4A875, #7A6A5A)";
  }
};

export function CC_Marketplace() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredListings = listings.filter((item) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Free Items") return item.isFree;
    if (activeCategory === "Wanted") return item.isWanted;
    return item.category === activeCategory;
  });

  return (
    <div className="flex flex-col h-full bg-cream min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="px-8 py-8 md:px-12 md:py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white border-b border-border">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-bark mb-2">
            Community Marketplace
          </h1>
          <p className="text-text-light font-body text-lg">
            Buy, sell, and share with your neighbors
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full border-primary text-primary hover:bg-primary/5 font-bold font-body"
          >
            <Store className="w-4 h-4 mr-2" /> My Shop
          </Button>
          <Button className="rounded-full bg-accent hover:bg-accent-hover text-white font-bold font-body">
            + List an Item
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8">
        <Tabs defaultValue="all" className="w-full max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/50 backdrop-blur-sm border border-border p-1 rounded-full h-auto">
              <TabsTrigger
                value="all"
                className="rounded-full px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xs transition-all"
              >
                All Listings
              </TabsTrigger>
              <TabsTrigger
                value="sale"
                className="rounded-full px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xs transition-all"
              >
                For Sale
              </TabsTrigger>
              <TabsTrigger
                value="free"
                className="rounded-full px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xs transition-all"
              >
                Free Items
              </TabsTrigger>
              <TabsTrigger
                value="shops"
                className="rounded-full px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xs transition-all"
              >
                Neighbor Shops
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="all"
            className="mt-0 focus-visible:outline-hidden focus-visible:ring-0"
          >
            {/* Filter Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <ScrollArea className="w-full md:w-auto whitespace-nowrap pb-3 md:pb-0">
                <div className="flex space-x-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={activeCategory === cat ? "default" : "outline"}
                      className={`rounded-full h-8 px-4 text-xs font-bold ${activeCategory === cat ? "bg-bark text-white hover:bg-bark/90" : "bg-white border-border text-text-light hover:bg-light-gray hover:text-bark"}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="invisible" />
              </ScrollArea>

              <div className="w-full md:w-48 shrink-0">
                <Select defaultValue="newest">
                  <SelectTrigger className="bg-white border-border rounded-full h-9">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-asc">Price: Low-High</SelectItem>
                    <SelectItem value="price-desc">Price: High-Low</SelectItem>
                    <SelectItem value="free">Free First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
              {filteredListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[16px] overflow-hidden border border-border shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col"
                >
                  {/* Image Area */}
                  <div
                    className="h-[180px] w-full relative flex items-center justify-center shrink-0"
                    style={{
                      background: getCategoryGradient(item.category, item.isFree),
                    }}
                  >
                    <span className="filter drop-shadow-md">{item.icon}</span>
                    {item.isFree && (
                      <div className="absolute top-3 right-3 bg-primary text-white font-body font-bold text-[11px] rounded px-2.5 py-1 shadow-xs">
                        FREE
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className="bg-light-gray text-text-light hover:bg-light-gray font-bold text-[10px] uppercase tracking-wider rounded-full px-2.5"
                      >
                        {item.category}
                      </Badge>
                      <span className="bg-light-gray text-text-light font-body font-bold text-[10px] rounded px-2 py-0.5">
                        {item.condition}
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-[18px] text-bark leading-tight mb-1 line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="font-display font-bold text-[22px] mt-1 mb-3">
                      {item.isFree ? (
                        <span className="text-primary">FREE</span>
                      ) : item.isWanted ? (
                        <span className="text-accent">Wanted</span>
                      ) : (
                        <span className="text-primary">{item.price}</span>
                      )}
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="h-6 w-6 border border-border">
                          <AvatarFallback className="bg-secondary text-white text-[10px]">
                            {item.seller.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-body text-[12px] text-text-light">
                            From {item.seller}
                          </span>
                          <span className="font-body text-[11px] text-text-light/70">
                            {item.date}
                          </span>
                        </div>
                      </div>

                      <Separator className="bg-border/60 mb-3" />

                      <Button
                        variant="outline"
                        className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white font-body font-bold text-[13px] h-9 transition-colors"
                      >
                        Contact Seller
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="sale"
            className="mt-0 focus-visible:outline-hidden focus-visible:ring-0"
          >
            <div className="text-center py-12 text-text-light font-body">
              <p>Filter logic for "For Sale" would go here.</p>
            </div>
          </TabsContent>

          <TabsContent
            value="free"
            className="mt-0 focus-visible:outline-hidden focus-visible:ring-0"
          >
            <div className="text-center py-12 text-text-light font-body">
              <p>Filter logic for "Free Items" would go here.</p>
            </div>
          </TabsContent>

          <TabsContent
            value="shops"
            className="mt-0 focus-visible:outline-hidden focus-visible:ring-0"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="font-display font-bold text-2xl text-bark">Neighbor Shops</h2>
                <p className="font-body text-[14px] text-text-light mt-1">
                  Your neighbors' mini storefronts — verified community sellers
                </p>
              </div>
              <Button className="rounded-full bg-accent hover:bg-accent-hover text-white font-bold font-body shrink-0">
                Open a Shop
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
              {shops.map((shop) => (
                <div
                  key={shop.id}
                  className="bg-white rounded-[16px] overflow-hidden border border-border shadow-xs hover:shadow-md transition-all duration-200 flex flex-col"
                >
                  {/* Shop Banner */}
                  <div
                    className="h-[100px] w-full flex items-center justify-center shrink-0 relative"
                    style={{ background: shop.gradient }}
                  >
                    <div className="absolute inset-0 bg-black/10"></div>
                    <h3 className="font-accent text-[28px] text-white z-10 drop-shadow-md px-4 text-center leading-tight">
                      {shop.name}
                    </h3>
                  </div>

                  {/* Shop Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-xs ring-1 ring-border">
                        <AvatarFallback className="bg-primary text-white text-xs">
                          {shop.owner.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-body font-bold text-[14px] text-bark leading-tight">
                          Run by {shop.owner}
                        </p>
                        <div className="inline-flex items-center gap-1 bg-light-gray text-primary font-body font-bold text-[11px] px-1.5 py-0.5 rounded mt-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Neighbor
                        </div>
                      </div>
                    </div>

                    <p className="font-body text-[13px] text-text-light line-clamp-2 mb-4 h-[38px]">
                      {shop.desc}
                    </p>

                    <div className="flex items-center justify-between mb-4 bg-cream p-2.5 rounded-lg">
                      <div className="flex flex-col">
                        <span className="font-body font-bold text-[13px] text-bark">
                          {shop.items}
                        </span>
                        <span className="font-body text-[11px] text-text-light uppercase tracking-wider">
                          Items
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-body font-bold text-[13px] text-bark flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-accent fill-accent" /> {shop.rating}
                        </span>
                        <span className="font-body text-[11px] text-text-light uppercase tracking-wider">
                          Rating
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-body font-bold text-[13px] text-bark">
                          {shop.sales.split(" ")[0]}
                        </span>
                        <span className="font-body text-[11px] text-text-light uppercase tracking-wider">
                          Sales
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                      {shop.categories.map((cat) => (
                        <span
                          key={cat}
                          className="bg-light-gray text-text-light font-body font-medium text-[11px] px-2 py-1 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <Separator className="bg-border/60 mb-4" />

                    <Button className="w-full rounded-full bg-primary hover:bg-primary-light text-white font-body font-bold text-[13px]">
                      Visit Shop
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
