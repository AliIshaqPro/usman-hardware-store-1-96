import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Check, Columns, Layout, Type, Download, Save, EyeIcon, 
  ArrowRight, ArrowLeft, Globe, Share2, PaletteIcon, 
  ImageIcon, Frame, BoxesIcon, 
  SlackIcon, Grid3x3Icon, LaptopIcon, SmartphoneIcon, 
  TabletsIcon, Settings, Code, Paintbrush, FileText,
  ShoppingCart, Calendar, Mail, Phone, MapPin, Users,
  Camera, Video, Music, Zap, Shield, Star, Heart,
  Trophy, Bookmark, Clock, Filter, Search, Plus,
  Minus, Info, HelpCircle, ChevronDown, ChevronUp,
  Palette, Monitor, Tablet, Smartphone, Chrome,
  Globe as BrowserIcon, Github, Twitter, Facebook, Instagram,
  Linkedin, Youtube, MessageCircle, Bell, Lock, Eye,
  EyeOff, Upload, X, CheckCircle, AlertCircle, Loader
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const designStyles = [
  { id: "minimal", name: "Minimal", description: "Clean and simple", icon: Layout, color: "#f8fafc" },
  { id: "modern", name: "Modern", description: "Contemporary look", icon: Grid3x3Icon, color: "#e2e8f0" },
  { id: "bold", name: "Bold", description: "High impact design", icon: Zap, color: "#fbbf24" },
  { id: "classic", name: "Classic", description: "Timeless aesthetics", icon: Trophy, color: "#d97706" },
  { id: "futuristic", name: "Futuristic", description: "Next-gen interfaces", icon: Code, color: "#8b5cf6" },
  { id: "playful", name: "Playful", description: "Fun and engaging", icon: Heart, color: "#ec4899" },
  { id: "corporate", name: "Corporate", description: "Professional business", icon: Users, color: "#1f2937" },
  { id: "creative", name: "Creative", description: "Artistic and unique", icon: Paintbrush, color: "#10b981" }
];

const industries = [
  { id: "business", name: "Business & Corporate", icon: Layout, description: "Professional services, consulting" },
  { id: "real-estate", name: "Real Estate", icon: Globe, description: "Property listings, agents" },
  { id: "education", name: "Education & Training", icon: Type, description: "Schools, courses, tutorials" },
  { id: "tech-saas", name: "Tech & SaaS", icon: Columns, description: "Software, apps, tech products" },
  { id: "portfolio", name: "Portfolio & Creative", icon: Camera, description: "Artists, designers, photographers" },
  { id: "e-commerce", name: "E-commerce & Retail", icon: ShoppingCart, description: "Online stores, products" },
  { id: "health", name: "Healthcare & Medical", icon: Shield, description: "Clinics, doctors, wellness" },
  { id: "hospitality", name: "Hospitality & Tourism", icon: MapPin, description: "Hotels, restaurants, travel" },
  { id: "fitness", name: "Fitness & Sports", icon: Trophy, description: "Gyms, trainers, sports clubs" },
  { id: "finance", name: "Finance & Banking", icon: Star, description: "Financial services, advisors" },
  { id: "nonprofit", name: "Non-profit & Charity", icon: Heart, description: "Organizations, causes" },
  { id: "entertainment", name: "Entertainment & Media", icon: Video, description: "Music, movies, events" }
];

const features = [
  { id: "responsive", name: "Responsive Design", category: "Essential", icon: Smartphone },
  { id: "seo", name: "SEO Optimized", category: "Essential", icon: Search },
  { id: "blog", name: "Blog Module", category: "Content", icon: FileText },
  { id: "contact", name: "Contact Forms", category: "Communication", icon: Mail },
  { id: "team", name: "Team Members", category: "Content", icon: Users },
  { id: "testimonials", name: "Testimonials", category: "Social Proof", icon: Star },
  { id: "portfolio", name: "Portfolio Gallery", category: "Content", icon: Camera },
  { id: "services", name: "Services Listing", category: "Content", icon: Layout },
  { id: "multi-header", name: "Multiple Headers", category: "Design", icon: Frame },
  { id: "multi-footer", name: "Multiple Footers", category: "Design", icon: BoxesIcon },
  { id: "product", name: "Product Showcase", category: "E-commerce", icon: ShoppingCart },
  { id: "events", name: "Event Calendar", category: "Features", icon: Calendar },
  { id: "login", name: "Member Login", category: "User Management", icon: Lock },
  { id: "social", name: "Social Media Integration", category: "Marketing", icon: Share2 },
  { id: "newsletter", name: "Newsletter Signup", category: "Marketing", icon: Mail },
  { id: "booking", name: "Booking System", category: "Business", icon: Calendar },
  { id: "maps", name: "Google Maps", category: "Location", icon: MapPin },
  { id: "multilang", name: "Multi-language", category: "Accessibility", icon: Globe },
  { id: "forms", name: "Custom Forms Builder", category: "Tools", icon: FileText },
  { id: "analytics", name: "Analytics Integration", category: "Marketing", icon: Type },
  { id: "chat", name: "Live Chat Support", category: "Communication", icon: MessageCircle },
  { id: "payments", name: "Payment Integration", category: "E-commerce", icon: ShoppingCart },
  { id: "reviews", name: "Reviews & Ratings", category: "Social Proof", icon: Star },
  { id: "popup", name: "Popup & Modals", category: "Marketing", icon: Eye },
  { id: "search", name: "Site Search", category: "Features", icon: Search },
  { id: "slideshow", name: "Image Slideshow", category: "Media", icon: ImageIcon },
  { id: "video", name: "Video Integration", category: "Media", icon: Video },
  { id: "audio", name: "Audio Player", category: "Media", icon: Music },
  { id: "faq", name: "FAQ Section", category: "Content", icon: HelpCircle },
  { id: "pricing", name: "Pricing Tables", category: "Business", icon: Star },
  { id: "countdown", name: "Countdown Timer", category: "Marketing", icon: Clock },
  { id: "notifications", name: "Push Notifications", category: "Communication", icon: Bell }
];

const colorSchemes = [
  { name: "Ocean Blue", primary: "#3b82f6", secondary: "#1e40af", accent: "#06b6d4" },
  { name: "Purple Magic", primary: "#8b5cf6", secondary: "#7c3aed", accent: "#a855f7" },
  { name: "Rose Garden", primary: "#ec4899", secondary: "#db2777", accent: "#f472b6" },
  { name: "Forest Green", primary: "#10b981", secondary: "#059669", accent: "#34d399" },
  { name: "Sunset Orange", primary: "#f97316", secondary: "#ea580c", accent: "#fb923c" },
  { name: "Midnight Dark", primary: "#1f2937", secondary: "#111827", accent: "#374151" },
  { name: "Royal Purple", primary: "#6366f1", secondary: "#4f46e5", accent: "#818cf8" },
  { name: "Cherry Red", primary: "#ef4444", secondary: "#dc2626", accent: "#f87171" }
];

const fontPairings = [
  { id: "modern", primary: "Inter", secondary: "Roboto", description: "Clean and modern" },
  { id: "elegant", primary: "Playfair Display", secondary: "Source Sans Pro", description: "Elegant and sophisticated" },
  { id: "friendly", primary: "Poppins", secondary: "Open Sans", description: "Friendly and approachable" },
  { id: "professional", primary: "Montserrat", secondary: "Lato", description: "Professional and trustworthy" },
  { id: "creative", primary: "Oswald", secondary: "Nunito", description: "Creative and unique" },
  { id: "classic", primary: "Merriweather", secondary: "Source Sans Pro", description: "Classic and readable" }
];

const layoutStyles = [
  { id: "standard", name: "Standard Grid", description: "Traditional layout", icon: Layout },
  { id: "masonry", name: "Masonry", description: "Pinterest-style grid", icon: Grid3x3Icon },
  { id: "fullwidth", name: "Full Width", description: "Edge-to-edge design", icon: Monitor },
  { id: "boxed", name: "Boxed", description: "Contained layout", icon: BoxesIcon },
  { id: "split", name: "Split Screen", description: "Two-column design", icon: Columns },
  { id: "single", name: "Single Page", description: "One-page site", icon: FileText }
];

const headerStyles = [
  { id: "centered", name: "Centered Logo", description: "Logo in center, nav below" },
  { id: "split", name: "Split Navigation", description: "Logo left, nav right" },
  { id: "minimal", name: "Minimal", description: "Clean and simple" },
  { id: "fullwidth", name: "Full Width", description: "Spans entire width" },
  { id: "hamburger", name: "Hamburger Menu", description: "Mobile-first navigation" },
  { id: "transparent", name: "Transparent Overlay", description: "Overlays hero section" },
  { id: "sticky", name: "Sticky Header", description: "Stays visible on scroll" },
  { id: "mega", name: "Mega Menu", description: "Large dropdown navigation" }
];

const footerStyles = [
  { id: "standard", name: "Standard (3 Columns)", description: "Classic footer layout" },
  { id: "wide", name: "Wide (4 Columns)", description: "More content areas" },
  { id: "minimal", name: "Minimal", description: "Simple footer" },
  { id: "split", name: "Split", description: "Divided sections" },
  { id: "widget", name: "Widget-Heavy", description: "Lots of widgets" },
  { id: "cta", name: "CTA Centered", description: "Call-to-action focus" },
  { id: "newsletter", name: "Newsletter Focus", description: "Subscription emphasis" },
  { id: "social", name: "Social Media Heavy", description: "Social links prominent" }
];

const animationStyles = [
  { id: "none", name: "None", description: "No animations" },
  { id: "subtle", name: "Subtle", description: "Gentle transitions" },
  { id: "smooth", name: "Smooth", description: "Smooth animations" },
  { id: "bouncy", name: "Bouncy", description: "Playful bounce effects" },
  { id: "slide", name: "Slide", description: "Sliding transitions" },
  { id: "fade", name: "Fade", description: "Fade in/out effects" },
  { id: "zoom", name: "Zoom", description: "Scale animations" },
  { id: "flip", name: "Flip", description: "3D flip effects" }
];

const contentSections = [
  { id: "hero", name: "Hero Section", description: "Main banner area", required: true },
  { id: "about", name: "About Us", description: "Company information", required: false },
  { id: "services", name: "Services", description: "What you offer", required: false },
  { id: "portfolio", name: "Portfolio/Work", description: "Showcase projects", required: false },
  { id: "team", name: "Team Members", description: "Staff profiles", required: false },
  { id: "testimonials", name: "Testimonials", description: "Client reviews", required: false },
  { id: "blog", name: "Blog/News", description: "Regular updates", required: false },
  { id: "contact", name: "Contact", description: "Get in touch", required: true },
  { id: "faq", name: "FAQ", description: "Common questions", required: false },
  { id: "pricing", name: "Pricing", description: "Service costs", required: false }
];

const ThemeBuilder: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [designStyle, setDesignStyle] = useState<string>("minimal");
  const [industry, setIndustry] = useState<string>("business");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["responsive", "seo"]);
  const [themeName, setThemeName] = useState<string>("My Awesome Theme");
  const [headerStyle, setHeaderStyle] = useState<string>("centered");
  const [footerStyle, setFooterStyle] = useState<string>("standard");
  const [customNotes, setCustomNotes] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [colorScheme, setColorScheme] = useState<any>(colorSchemes[0]);
  const [fontPairing, setFontPairing] = useState<any>(fontPairings[0]);
  const [animationStyle, setAnimationStyle] = useState<string>("smooth");
  const [layoutType, setLayoutType] = useState<string>("standard");
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientCompany, setClientCompany] = useState<string>("");
  const [clientWebsite, setClientWebsite] = useState<string>("");
  const [selectedSections, setSelectedSections] = useState<string[]>(["hero", "contact"]);
  const [deviceSupport, setDeviceSupport] = useState<string[]>(["Desktop", "Mobile", "Tablet"]);
  const [browserSupport, setBrowserSupport] = useState<string[]>(["Chrome", "Firefox", "Safari"]);
  const [domainName, setDomainName] = useState<string>("");
  const [exampleSites, setExampleSites] = useState<string>("");
  const [launchDate, setLaunchDate] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");
  const [targetAudience, setTargetAudience] = useState<string>("");
  const [brandColors, setBrandColors] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [brandGuidelines, setBrandGuidelines] = useState<string>("");
  const [competitorSites, setCompetitorSites] = useState<string>("");
  const [socialMediaLinks, setSocialMediaLinks] = useState<any>({
    facebook: "", twitter: "", instagram: "", linkedin: "", youtube: ""
  });
  const [businessHours, setBusinessHours] = useState<string>("");
  const [businessAddress, setBusinessAddress] = useState<string>("");
  const [businessPhone, setBusinessPhone] = useState<string>("");
  const [seoKeywords, setSeoKeywords] = useState<string>("");
  const [contentStrategy, setContentStrategy] = useState<string>("");
  const [maintenanceLevel, setMaintenanceLevel] = useState<string>("standard");
  const [hostingPreference, setHostingPreference] = useState<string>("");
  const [backupFrequency, setBackupFrequency] = useState<string>("weekly");
  const [securityLevel, setSecurityLevel] = useState<string>("standard");
  const [expandedSection, setExpandedSection] = useState<string>("");

  const { toast } = useToast();

  const nextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStep((prev) => Math.min(prev + 1, 5));
      setIsLoading(false);
      
      toast({
        title: "Step Completed",
        description: step === 1 ? "Design options saved successfully!" : 
                     step === 2 ? "Features selected successfully!" : 
                     step === 3 ? "Client information saved successfully!" :
                     step === 4 ? "Customization options saved!" :
                     "Configuration completed!",
      });
      
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };
  
  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) => 
      prev.includes(featureId)
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
  };

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSections((prev) => 
      prev.includes(sectionId)
        ? prev.filter(s => s !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleDeviceToggle = (device: string) => {
    setDeviceSupport((prev) => 
      prev.includes(device)
        ? prev.filter(d => d !== device)
        : [...prev, device]
    );
  };

  const handleBrowserToggle = (browser: string) => {
    setBrowserSupport((prev) => 
      prev.includes(browser)
        ? prev.filter(b => b !== browser)
        : [...prev, browser]
    );
  };
  
  const handlePreview = () => {
    toast({
      title: "Preview Generated",
      description: "Opening preview in a new tab...",
    });
  };
  
  const handleDownload = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Theme Package Ready",
        description: "Your custom WordPress theme has been generated and is ready for download!",
      });
    }, 2000);
  };

  const getFeaturesByCategory = (category: string) => {
    return features.filter(feature => feature.category === category);
  };

  const getAnimationDelay = (index: number) => {
    return `${index * 0.1}s`;
  };

  useEffect(() => {
    document.title = "ThemeMorphic - Advanced Theme Builder";
  }, []);

  return (
    <div className="min-h-screen bg-theme-darker">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Build Your <span className="text-gradient">Perfect WordPress Theme</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Create a completely customized WordPress theme with our advanced builder. 
                Choose from hundreds of options and features to make your website unique.
              </p>
            </div>

            {/* Enhanced Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
              <Badge variant="outline" className="py-2 px-4 glass-card">
                <CheckCircle size={14} className="mr-1 text-green-500" /> 30-Day Guarantee
              </Badge>
              <Badge variant="outline" className="py-2 px-4 glass-card">
                <Shield size={14} className="mr-1 text-blue-500" /> 100% Secure
              </Badge>
              <Badge variant="outline" className="py-2 px-4 glass-card">
                <Code size={14} className="mr-1 text-purple-500" /> Developer-Friendly
              </Badge>
              <Badge variant="outline" className="py-2 px-4 glass-card">
                <Search size={14} className="mr-1 text-yellow-500" /> SEO Optimized
              </Badge>
              <Badge variant="outline" className="py-2 px-4 glass-card">
                <Smartphone size={14} className="mr-1 text-pink-500" /> Mobile-First
              </Badge>
            </div>

            {/* Enhanced Progress Steps */}
            <div className="flex justify-between mb-12 relative">
              <div className="absolute top-4 left-0 right-0 h-1 bg-gray-700 -z-10"></div>
              
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex flex-col items-center z-10">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-all duration-300
                      ${step >= num 
                        ? 'bg-gradient-to-r from-theme-blue to-theme-purple transform scale-110 shadow-lg' 
                        : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    {step > num ? <Check size={18} /> : num}
                  </div>
                  <div className={`text-sm transition-colors duration-300 text-center ${step >= num ? 'text-white font-medium' : 'text-gray-400'}`}>
                    {num === 1 ? 'Design & Style' : 
                     num === 2 ? 'Features & Functionality' : 
                     num === 3 ? 'Client Information' : 
                     num === 4 ? 'Customization' : 
                     'Final Review'}
                  </div>
                </div>
              ))}
            </div>

            {/* Step 1: Enhanced Design Selection */}
            {step === 1 && (
              <div className="space-y-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Paintbrush className="mr-2" />
                      Choose Your Design Style
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {designStyles.map((style, index) => (
                        <Card 
                          key={style.id}
                          onClick={() => setDesignStyle(style.id)}
                          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                            designStyle === style.id ? 'ring-2 ring-theme-purple shadow-xl' : 'hover:shadow-lg'
                          }`}
                          style={{ animationDelay: getAnimationDelay(index) }}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-lg flex items-center justify-center" 
                                 style={{ backgroundColor: style.color + '20' }}>
                              <style.icon size={28} style={{ color: style.color }} />
                            </div>
                            <h3 className="font-semibold mb-1">{style.name}</h3>
                            <p className="text-sm text-gray-400">{style.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Layout className="mr-2" />
                      Select Your Industry
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {industries.map((ind, index) => (
                        <Card 
                          key={ind.id}
                          onClick={() => setIndustry(ind.id)}
                          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                            industry === ind.id ? 'ring-2 ring-theme-blue shadow-lg' : ''
                          }`}
                          style={{ animationDelay: getAnimationDelay(index) }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 rounded-lg bg-theme-blue/20 flex items-center justify-center">
                                <ind.icon size={20} className="text-theme-blue" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium mb-1">{ind.name}</h3>
                                <p className="text-sm text-gray-400">{ind.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="mr-2" />
                      Color Scheme & Typography
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-4">Color Schemes</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {colorSchemes.map((scheme) => (
                          <div
                            key={scheme.name}
                            onClick={() => setColorScheme(scheme)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 ${
                              colorScheme.name === scheme.name ? 'border-theme-purple shadow-lg' : 'border-gray-700'
                            }`}
                          >
                            <div className="flex space-x-2 mb-3">
                              <div className="w-6 h-6 rounded" style={{ backgroundColor: scheme.primary }}></div>
                              <div className="w-6 h-6 rounded" style={{ backgroundColor: scheme.secondary }}></div>
                              <div className="w-6 h-6 rounded" style={{ backgroundColor: scheme.accent }}></div>
                            </div>
                            <h4 className="font-medium text-sm">{scheme.name}</h4>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">Font Pairings</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {fontPairings.map((pairing) => (
                          <div
                            key={pairing.id}
                            onClick={() => setFontPairing(pairing)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 ${
                              fontPairing.id === pairing.id ? 'border-theme-blue shadow-lg' : 'border-gray-700'
                            }`}
                          >
                            <div className="mb-2">
                              <div className="font-bold text-lg" style={{ fontFamily: pairing.primary }}>
                                {pairing.primary}
                              </div>
                              <div className="text-sm" style={{ fontFamily: pairing.secondary }}>
                                {pairing.secondary}
                              </div>
                            </div>
                            <p className="text-xs text-gray-400">{pairing.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button 
                    onClick={nextStep} 
                    className="bg-gradient-to-r from-theme-blue to-theme-purple group relative overflow-hidden px-8 py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader className="animate-spin mr-2" size={18} />
                    ) : (
                      <>
                        Continue to Features
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Enhanced Features Selection */}
            {step === 2 && (
              <div className="space-y-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="mr-2" />
                      Features & Functionality
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="essential" className="w-full">
                      <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="essential">Essential</TabsTrigger>
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
                        <TabsTrigger value="marketing">Marketing</TabsTrigger>
                        <TabsTrigger value="communication">Communication</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                      </TabsList>
                      
                      {["Essential", "Content", "E-commerce", "Marketing", "Communication", "Advanced"].map((category) => (
                        <TabsContent key={category.toLowerCase()} value={category.toLowerCase()}>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {getFeaturesByCategory(category).map((feature, index) => (
                              <Card 
                                key={feature.id}
                                onClick={() => handleFeatureToggle(feature.id)}
                                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                                  selectedFeatures.includes(feature.id) ? 'ring-2 ring-theme-blue shadow-lg' : ''
                                }`}
                                style={{ animationDelay: getAnimationDelay(index) }}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                      selectedFeatures.includes(feature.id) 
                                        ? 'bg-theme-blue/20 text-theme-blue' 
                                        : 'bg-gray-700 text-gray-400'
                                    }`}>
                                      <feature.icon size={18} />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-medium">{feature.name}</h4>
                                      <Badge variant="outline" className="text-xs mt-1">
                                        {feature.category}
                                      </Badge>
                                    </div>
                                    {selectedFeatures.includes(feature.id) && (
                                      <CheckCircle size={20} className="text-green-500" />
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2" />
                      Content Sections
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {contentSections.map((section, index) => (
                        <Card 
                          key={section.id}
                          onClick={() => !section.required && handleSectionToggle(section.id)}
                          className={`transition-all duration-300 ${
                            section.required 
                              ? 'opacity-75 cursor-not-allowed' 
                              : 'cursor-pointer hover:scale-105'
                          } ${
                            selectedSections.includes(section.id) ? 'ring-2 ring-theme-purple shadow-lg' : ''
                          }`}
                          style={{ animationDelay: getAnimationDelay(index) }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{section.name}</h4>
                                <p className="text-sm text-gray-400">{section.description}</p>
                                {section.required && (
                                  <Badge variant="outline" className="text-xs mt-1 text-yellow-500">
                                    Required
                                  </Badge>
                                )}
                              </div>
                              {selectedSections.includes(section.id) && (
                                <CheckCircle size={20} className="text-green-500" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep} className="group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    Back to Design
                  </Button>
                  <Button 
                    onClick={nextStep} 
                    className="bg-gradient-to-r from-theme-blue to-theme-purple group relative overflow-hidden px-8 py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader className="animate-spin mr-2" size={18} />
                    ) : (
                      <>
                        Continue to Client Info
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Enhanced Client Information */}
            {step === 3 && (
              <div className="space-y-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2" />
                      Client & Business Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm font-medium">Client Name *</label>
                        <Input 
                          value={clientName} 
                          onChange={(e) => setClientName(e.target.value)} 
                          placeholder="Enter full name" 
                          className="bg-theme-dark border-gray-700" 
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium">Email Address *</label>
                        <Input 
                          type="email"
                          value={clientEmail} 
                          onChange={(e) => setClientEmail(e.target.value)} 
                          placeholder="email@example.com" 
                          className="bg-theme-dark border-gray-700" 
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium">Company/Organization Name</label>
                        <Input 
                          value={clientCompany} 
                          onChange={(e) => setClientCompany(e.target.value)} 
                          placeholder="Enter company name" 
                          className="bg-theme-dark border-gray-700" 
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium">Business Phone</label>
                        <Input 
                          value={businessPhone} 
                          onChange={(e) => setBusinessPhone(e.target.value)} 
                          placeholder="+1 (555) 123-4567" 
                          className="bg-theme-dark border-gray-700" 
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium">Current Website</label>
                        <Input 
                          value={clientWebsite} 
                          onChange={(e) => setClientWebsite(e.target.value)} 
                          placeholder="https://currentsite.com" 
                          className="bg-theme-dark border-gray-700" 
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium">Desired Domain</label>
                        <Input 
                          value={domainName} 
                          onChange={(e) => setDomainName(e.target.value)} 
                          placeholder="newsite.com" 
                          className="bg-theme-dark border-gray-700" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium">Business Address</label>
                      <textarea 
                        className="w-full rounded-md bg-theme-dark border border-gray-700 p-3 min-h-[80px]"
                        placeholder="Full business address for contact page and local SEO..."
                        value={businessAddress}
                        onChange={(e) => setBusinessAddress(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm font-medium">Project Budget</label>
                        <select 
                          className="w-full rounded-md bg-theme-dark border border-gray-700 p-3"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                        >
                          <option value="">Select budget range</option>
                          <option value="under-1k">Under $1,000</option>
                          <option value="1k-3k">$1,000 - $3,000</option>
                          <option value="3k-5k">$3,000 - $5,000</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-plus">$10,000+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium">Timeline</label>
                        <select 
                          className="w-full rounded-md bg-theme-dark border border-gray-700 p-3"
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP (Rush)</option>
                          <option value="1-2weeks">1-2 weeks</option>
                          <option value="2-4weeks">2-4 weeks</option>
                          <option value="1-2months">1-2 months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium">Target Audience</label>
                      <textarea 
                        className="w-full rounded-md bg-theme-dark border border-gray-700 p-3 min-h-[80px]"
                        placeholder="Describe your target audience, their demographics, interests, and needs..."
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Share2 className="mr-2" />
                      Social Media & Online Presence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium flex items-center">
                          <Facebook size={16} className="mr-1" />
                          Facebook
                        </label>
                        <Input 
                          value={socialMediaLinks.facebook} 
                          onChange={(e) => setSocialMediaLinks({...socialMediaLinks, facebook: e.target.value})} 
                          placeholder="facebook.com/yourpage" 
                          className="bg-theme-dark border-gray-700" 
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium flex items-center">
                          <Twitter size={16} className="mr-1" />
                          Twitter
                        </label>
                        <Input 
                          value={socialMediaLinks.twitter} 
                          onChange={(e) => setSocialMediaLinks({...socialMediaLinks, twitter: e.target.value})} 
                          placeholder="twitter.com/yourhandle" 
                          className="bg-theme-dark border-gray-700" 
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium flex items-center">
                          <Instagram size={16} className="mr-1" />
                          Instagram
                        </label>
                        <Input 
                          value={socialMediaLinks.instagram} 
                          onChange={(e) => setSocialMediaLinks({...socialMediaLinks, instagram: e.target.value})} 
                          placeholder="instagram.com/yourhandle" 
                          className="bg-theme-dark border-gray-700" 
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium flex items-center">
                          <Linkedin size={16} className="mr-1" />
                          LinkedIn
                        </label>
                        <Input 
                          value={socialMediaLinks.linkedin} 
                          onChange={(e) => setSocialMediaLinks({...socialMediaLinks, linkedin: e.target.value})} 
                          placeholder="linkedin.com/company/yourcompany" 
                          className="bg-theme-dark border-gray-700" 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep} className="group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    Back to Features
                  </Button>
                  <Button 
                    onClick={nextStep} 
                    className="bg-gradient-to-r from-theme-blue to-theme-purple group relative overflow-hidden px-8 py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader className="animate-spin mr-2" size={18} />
                    ) : (
                      <>
                        Continue to Customization
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Advanced Customization */}
            {step === 4 && (
              <div className="space-y-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="mr-2" />
                      Customize Your Theme
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm font-medium">Theme Name</label>
                        <Input 
                          value={themeName} 
                          onChange={(e) => setThemeName(e.target.value)} 
                          placeholder="My Awesome Theme" 
                          className="bg-theme-dark border-gray-700" 
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium">Header Style</label>
                        <select 
                          className="w-full rounded-md bg-theme-dark border border-gray-700 p-3"
                          value={headerStyle}
                          onChange={(e) => setHeaderStyle(e.target.value)}
                        >
                          {headerStyles.map((header) => (
                            <option key={header.id} value={header.id}>{header.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium">Footer Style</label>
                        <select 
                          className="w-full rounded-md bg-theme-dark border border-gray-700 p-3"
                          value={footerStyle}
                          onChange={(e) => setFooterStyle(e.target.value)}
                        >
                          {footerStyles.map((footer) => (
                            <option key={footer.id} value={footer.id}>{footer.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium">Layout Style</label>
                        <select 
                          className="w-full rounded-md bg-theme-dark border border-gray-700 p-3"
                          value={layoutType}
                          onChange={(e) => setLayoutType(e.target.value)}
                        >
                          {layoutStyles.map((layout) => (
                            <option key={layout.id} value={layout.id}>{layout.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm font-medium">Animation Style</label>
                        <select 
                          className="w-full rounded-md bg-theme-dark border border-gray-700 p-3"
                          value={animationStyle}
                          onChange={(e) => setAnimationStyle(e.target.value)}
                        >
                          {animationStyles.map((anim) => (
                            <option key={anim.id} value={anim.id}>{anim.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium">Maintenance Level</label>
                        <select 
                          className="w-full rounded-md bg-theme-dark border border-gray-700 p-3"
                          value={maintenanceLevel}
                          onChange={(e) => setMaintenanceLevel(e.target.value)}
                        >
                          <option value="standard">Standard</option>
                          <option value="premium">Premium</option>
                          <option value="enterprise">Enterprise</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm font-medium">Hosting Preference</label>
                        <Input 
                          value={hostingPreference} 
                          onChange={(e) => setHostingPreference(e.target.value)} 
                          placeholder="e.g., Shared, VPS, Dedicated" 
                          className="bg-theme-dark border-gray-700" 
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium">Backup Frequency</label>
                        <select 
                          className="w-full rounded-md bg-theme-dark border border-gray-700 p-3"
                          value={backupFrequency}
                          onChange={(e) => setBackupFrequency(e.target.value)}
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium">Security Level</label>
                      <select 
                        className="w-full rounded-md bg-theme-dark border border-gray-700 p-3"
                        value={securityLevel}
                        onChange={(e) => setSecurityLevel(e.target.value)}
                      >
                        <option value="standard">Standard</option>
                        <option value="enhanced">Enhanced</option>
                        <option value="maximum">Maximum</option>
                      </select>
                    </div>

                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="responsiveDesign" 
                          checked={selectedFeatures.includes("responsive")}
                          onChange={() => handleFeatureToggle("responsive")}
                          className="w-4 h-4" 
                        />
                        <label htmlFor="responsiveDesign" className="text-sm">Responsive Design</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="showTestimonials" 
                          checked={selectedFeatures.includes("testimonials")}
                          onChange={() => handleFeatureToggle("testimonials")}
                          className="w-4 h-4" 
                        />
                        <label htmlFor="showTestimonials" className="text-sm">Include Testimonials Section</label>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium">Additional Notes</label>
                      <textarea 
                        className="w-full rounded-md bg-theme-dark border border-gray-700 p-3 min-h-[100px]"
                        placeholder="Any specific customization requests..."
                        value={customNotes}
                        onChange={(e) => setCustomNotes(e.target.value)}
                      ></textarea>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep} className="group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    Back to Client Info
                  </Button>
                  <Button 
                    onClick={nextStep} 
                    className="bg-gradient-to-r from-theme-blue to-theme-purple group relative overflow-hidden px-8 py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader className="animate-spin mr-2" size={18} />
                    ) : (
                      <>
                        Continue to Review
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Final Review & Generation */}
            {step === 5 && (
              <div className="space-y-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="mr-2" />
                      Final Review & Theme Generation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Theme Summary</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Theme Name:</span>
                            <span className="font-medium">{themeName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Style:</span>
                            <span className="font-medium">{designStyles.find(s => s.id === designStyle)?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Industry:</span>
                            <span className="font-medium">{industries.find(i => i.id === industry)?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Features:</span>
                            <span className="font-medium">{selectedFeatures.length} selected</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Color Scheme:</span>
                            <span className="font-medium">{colorScheme.name}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Client Information</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Client:</span>
                            <span className="font-medium">{clientName || 'Not provided'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Company:</span>
                            <span className="font-medium">{clientCompany || 'Not provided'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Email:</span>
                            <span className="font-medium">{clientEmail || 'Not provided'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Domain:</span>
                            <span className="font-medium">{domainName || 'Not provided'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button 
                        variant="outline"
                        onClick={handlePreview}
                        className="flex-1 group"
                      >
                        <Eye className="mr-2" size={18} />
                        Preview Theme
                      </Button>
                      <Button 
                        onClick={handleDownload}
                        className="flex-1 bg-gradient-to-r from-theme-blue to-theme-purple group relative overflow-hidden"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader className="animate-spin mr-2" size={18} />
                        ) : (
                          <>
                            <Download className="mr-2" size={18} />
                            Generate & Download Theme
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-start">
                  <Button variant="outline" onClick={prevStep} className="group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    Back to Customization
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThemeBuilder;
