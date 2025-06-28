
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";

const Themes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const themes = [
    {
      id: 1,
      name: "Business Pro",
      category: "business",
      description: "A professional theme for modern businesses with custom post types.",
      price: "$79"
    },
    {
      id: 2,
      name: "Realtor Premium",
      category: "real-estate",
      description: "Perfect for real estate agents with property listings integration.",
      price: "$89"
    },
    {
      id: 3,
      name: "Edu Learning",
      category: "education",
      description: "An educational theme with course management and student profiles.",
      price: "$79"
    },
    {
      id: 4,
      name: "SaaS Platform",
      category: "tech",
      description: "Modern SaaS theme with landing pages and feature showcases.",
      price: "$99"
    },
    {
      id: 5,
      name: "Creative Portfolio",
      category: "portfolio",
      description: "Showcase your work with this minimal, elegant portfolio theme.",
      price: "$69"
    },
    {
      id: 6,
      name: "Shop Commerce",
      category: "ecommerce",
      description: "A full-featured e-commerce theme with WooCommerce integration.",
      price: "$109"
    },
    {
      id: 7,
      name: "Restaurant Menu",
      category: "food",
      description: "Display menus and take reservations with this restaurant theme.",
      price: "$79"
    },
    {
      id: 8,
      name: "Legal Practice",
      category: "business",
      description: "Professional theme designed for law firms and legal services.",
      price: "$89"
    },
    {
      id: 9,
      name: "Health & Wellness",
      category: "health",
      description: "Perfect for fitness centers, spas, and wellness businesses.",
      price: "$79"
    }
  ];
  
  const filteredThemes = selectedCategory === "all" 
    ? themes 
    : themes.filter(theme => theme.category === selectedCategory);
  
  const categories = [
    { id: "all", name: "All Themes" },
    { id: "business", name: "Business" },
    { id: "real-estate", name: "Real Estate" },
    { id: "education", name: "Education" },
    { id: "tech", name: "Tech & SaaS" },
    { id: "portfolio", name: "Portfolio" },
    { id: "ecommerce", name: "E-commerce" },
    { id: "food", name: "Food & Restaurant" },
    { id: "health", name: "Health" }
  ];
  
  return (
    <div className="min-h-screen bg-theme-darker">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Theme Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              WordPress <span className="text-gradient">Themes</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Browse our collection of premium, lightweight WordPress themes designed for performance and flexibility.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="glass rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input placeholder="Search themes..." className="pl-10 bg-theme-dark border-gray-700" />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter size={18} className="text-gray-400" />
                  <span className="text-gray-400">Filters:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select className="bg-theme-dark border border-gray-700 rounded-md px-3 py-2 text-sm">
                    <option>Price: Any</option>
                    <option>Under $50</option>
                    <option>$50 - $100</option>
                    <option>Over $100</option>
                  </select>
                  <select className="bg-theme-dark border border-gray-700 rounded-md px-3 py-2 text-sm">
                    <option>Sort: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="max-w-6xl mx-auto mb-8 overflow-x-auto">
            <div className="flex space-x-2 min-w-max pb-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={selectedCategory === category.id 
                    ? "bg-gradient-to-r from-theme-blue to-theme-purple" 
                    : "border-gray-700"}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Theme Grid */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredThemes.map((theme) => (
                <Card key={theme.id} className="glass-card overflow-hidden">
                  <div className="h-48 bg-gray-800 relative">
                    <div className="absolute bottom-4 right-4">
                      <Button size="sm" variant="outline">Preview</Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{theme.name}</h3>
                      <span className="text-theme-blue font-medium">{theme.price}</span>
                    </div>
                    <p className="text-gray-300 mb-4">{theme.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="bg-theme-dark px-3 py-1 rounded-full text-xs text-gray-400 capitalize">
                        {theme.category.replace('-', ' ')}
                      </span>
                      <Button className="bg-gradient-to-r from-theme-blue to-theme-purple hover:opacity-90 transition-opacity">
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Can't Find The Perfect Theme?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Build your own custom theme with our easy-to-use theme builder. No coding required!
              </p>
              <Button size="lg" className="bg-gradient-to-r from-theme-blue to-theme-purple hover:opacity-90 transition-opacity">
                Try Theme Builder
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Themes;
