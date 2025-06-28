
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Check, Columns, Layout, Type, Download, Save, EyeIcon, 
  ArrowRight, ArrowLeft, Globe, Share2, PaletteIcon, 
  ImageIcon, TypographyIcon, FramesIcon, BoxesIcon, 
  SlackIcon, Grid3x3Icon, LaptopIcon, SmartphoneIcon, 
  TabletsIcon 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const designStyles = [
  { id: "minimal", name: "Minimal", description: "Clean and simple" },
  { id: "modern", name: "Modern", description: "Contemporary look" },
  { id: "bold", name: "Bold", description: "High impact design" },
  { id: "classic", name: "Classic", description: "Timeless aesthetics" },
  { id: "futuristic", name: "Futuristic", description: "Next-gen interfaces" },
  { id: "playful", name: "Playful", description: "Fun and engaging" }
];

const industries = [
  { id: "business", name: "Business", icon: Layout },
  { id: "real-estate", name: "Real Estate", icon: Globe },
  { id: "education", name: "Education", icon: Type },
  { id: "tech-saas", name: "Tech & SaaS", icon: Columns },
  { id: "portfolio", name: "Portfolio", icon: Type },
  { id: "e-commerce", name: "E-commerce", icon: Layout },
  { id: "health", name: "Healthcare", icon: Layout },
  { id: "hospitality", name: "Hospitality", icon: Layout },
  { id: "fitness", name: "Fitness", icon: Layout }
];

const features = [
  "Responsive Design", 
  "SEO Optimized", 
  "Blog Module",
  "Contact Form",
  "Team Members",
  "Testimonials",
  "Portfolio Gallery",
  "Services Listing",
  "Multiple Headers",
  "Multiple Footers",
  "Product Showcase",
  "Event Calendar",
  "Member Login",
  "Social Media Integration",
  "Newsletter Signup",
  "Booking/Reservation System",
  "Google Maps Integration",
  "Multi-language Support",
  "Custom Forms Builder",
  "Advanced Analytics"
];

const fontOptions = [
  "Inter", "Roboto", "Poppins", "Montserrat", "Open Sans", "Lato"
];

const animationOptions = [
  "Fade", "Slide", "Zoom", "Bounce", "Flip", "None"
];

const layoutOptions = [
  "Standard", "Grid", "Asymmetric", "Magazine", "Fullscreen"
];

const previewImages = {
  "business": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200&h=800",
  "real-estate": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200&h=800",
  "education": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200&h=800",
  "tech-saas": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200&h=800",
  "portfolio": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200&h=800",
  "e-commerce": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200&h=800",
  "health": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1200&h=800",
  "hospitality": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200&h=800",
  "fitness": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200&h=800",
  
  "minimal": "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200&h=800",
  "modern": "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&q=80&w=1200&h=800",
  "bold": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=800",
  "classic": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200&h=800",
  "futuristic": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200&h=800",
  "playful": "https://images.unsplash.com/photo-1560237731-890b122a9b6c?auto=format&fit=crop&q=80&w=1200&h=800",
};

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Design Studio Co.",
    comment: "The theme builder saved us weeks of development time. Our clients love the results!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    name: "Michael Chen",
    company: "TechSolutions Inc.",
    comment: "Incredibly flexible and easy to use. Our website redesign was completed in record time.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    name: "Emma Rodriguez",
    company: "Creative Agency",
    comment: "The customization options are exactly what we needed. Our themes now perfectly match our brand identity.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  }
];

const ThemeBuilder: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [designStyle, setDesignStyle] = useState<string>("minimal");
  const [industry, setIndustry] = useState<string>("business");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["Responsive Design", "SEO Optimized"]);
  const [themeName, setThemeName] = useState<string>("My Awesome Theme");
  const [headerStyle, setHeaderStyle] = useState<string>("Centered Logo");
  const [footerStyle, setFooterStyle] = useState<string>("Standard (3 Columns)");
  const [customNotes, setCustomNotes] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [colorScheme, setColorScheme] = useState<string>("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState<string>("#8b5cf6");
  const [accentColor, setAccentColor] = useState<string>("#ec4899");
  const [primaryFont, setPrimaryFont] = useState<string>("Inter");
  const [secondaryFont, setSecondaryFont] = useState<string>("Roboto");
  const [animationStyle, setAnimationStyle] = useState<string>("Fade");
  const [layoutType, setLayoutType] = useState<string>("Standard");
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientCompany, setClientCompany] = useState<string>("");
  const [clientWebsite, setClientWebsite] = useState<string>("");
  const [deviceSupport, setDeviceSupport] = useState<string[]>(["Desktop", "Mobile", "Tablet"]);
  const [domainName, setDomainName] = useState<string>("");
  const [exampleSites, setExampleSites] = useState<string>("");
  const [launchDate, setLaunchDate] = useState<string>("");
  const [showTestimonials, setShowTestimonials] = useState<boolean>(true);
  const [responsiveDesign, setResponsiveDesign] = useState<boolean>(true);

  const { toast } = useToast();

  const nextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStep((prev) => Math.min(prev + 1, 4));
      setIsLoading(false);
      
      // Show success toast
      toast({
        title: "Step Completed",
        description: step === 1 ? "Design options saved successfully!" : 
                     step === 2 ? "Features selected successfully!" : 
                     "Client information saved successfully!",
      });
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };
  
  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) => 
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleDeviceToggle = (device: string) => {
    setDeviceSupport((prev) => 
      prev.includes(device)
        ? prev.filter(d => d !== device)
        : [...prev, device]
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
  
  // Animation delay for cards
  const getAnimationDelay = (index: number) => {
    return `${index * 0.1}s`;
  };
  
  // Get preview image based on current selection
  const getCurrentPreviewImage = () => {
    if (step === 1) {
      return previewImages[designStyle] || previewImages[industry];
    } else {
      return previewImages[industry];
    }
  };

  useEffect(() => {
    // Set page title
    document.title = "ThemeMorphic - Theme Builder";
  }, []);

  return (
    <div className="min-h-screen bg-theme-darker">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Build Your <span className="text-gradient">Custom WordPress Theme</span>
            </h1>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
              <Badge variant="outline" className="py-2 px-4 glass-card">
                <Check size={14} className="mr-1 text-theme-blue" /> 30-Day Guarantee
              </Badge>
              <Badge variant="outline" className="py-2 px-4 glass-card">
                <Check size={14} className="mr-1 text-theme-blue" /> 100% Ownership
              </Badge>
              <Badge variant="outline" className="py-2 px-4 glass-card">
                <Check size={14} className="mr-1 text-theme-blue" /> Developer-Friendly
              </Badge>
              <Badge variant="outline" className="py-2 px-4 glass-card">
                <Check size={14} className="mr-1 text-theme-blue" /> SEO Optimized
              </Badge>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between mb-12 relative">
              <div className="absolute top-4 left-0 right-0 h-1 bg-gray-700 -z-10"></div>
              
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex flex-col items-center z-10">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2
                      ${step >= num 
                        ? 'bg-gradient-to-r from-theme-blue to-theme-purple scale-110 transition-transform duration-300' 
                        : 'bg-gray-700'}`}
                  >
                    {step > num ? <Check size={16} /> : num}
                  </div>
                  <div className={`text-sm ${step >= num ? 'text-white' : 'text-gray-400'} transition-colors duration-300`}>
                    {num === 1 ? 'Design' : num === 2 ? 'Features' : num === 3 ? 'Client Info' : 'Customize'}
                  </div>
                </div>
              ))}
            </div>

            {/* Step 1: Design */}
            {step === 1 && (
              <div className="glass p-6 rounded-xl mb-8 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Choose Your Design Style</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {designStyles.map((style, index) => (
                    <Card 
                      key={style.id}
                      onClick={() => setDesignStyle(style.id)}
                      className={`glass-card cursor-pointer overflow-hidden hover:scale-105 transition-all duration-300 ${
                        designStyle === style.id ? 'ring-2 ring-theme-purple' : ''
                      }`}
                      style={{ animationDelay: getAnimationDelay(index) }}
                    >
                      <CardContent className="p-4 h-full flex flex-col">
                        <div className="bg-gray-800 rounded-lg h-32 mb-3 flex items-center justify-center overflow-hidden">
                          {previewImages[style.id] ? (
                            <img 
                              src={previewImages[style.id]} 
                              alt={style.name} 
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <Layout className="text-gray-500" size={32} />
                          )}
                        </div>
                        <h3 className="font-medium">{style.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">{style.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <h2 className="text-xl font-semibold mb-4 mt-8">Select Industry</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {industries.map((ind, index) => (
                    <Card 
                      key={ind.id}
                      onClick={() => setIndustry(ind.id)}
                      className={`glass-card cursor-pointer transition-all hover:scale-105 ${
                        industry === ind.id ? 'ring-2 ring-theme-purple' : ''
                      }`}
                      style={{ animationDelay: getAnimationDelay(index) }}
                    >
                      <CardContent className="p-4 flex items-center">
                        <ind.icon className="mr-3 text-theme-blue" size={20} />
                        <span>{ind.name}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Primary Color</label>
                    <div className="flex space-x-3">
                      {["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f97316"].map((color) => (
                        <button
                          key={color}
                          onClick={() => setColorScheme(color)}
                          style={{ backgroundColor: color }}
                          className={`w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200 ${
                            colorScheme === color ? 'ring-2 ring-white' : ''
                          }`}
                          aria-label={`Select color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Secondary Color</label>
                    <div className="flex space-x-3">
                      {["#8b5cf6", "#ec4899", "#10b981", "#f97316", "#3b82f6"].map((color) => (
                        <button
                          key={color}
                          onClick={() => setSecondaryColor(color)}
                          style={{ backgroundColor: color }}
                          className={`w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200 ${
                            secondaryColor === color ? 'ring-2 ring-white' : ''
                          }`}
                          aria-label={`Select color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <Button 
                    onClick={nextStep} 
                    className="bg-gradient-to-r from-theme-blue to-theme-purple group relative overflow-hidden"
                    disabled={isLoading}
                  >
                    <span className="absolute right-full h-full w-full bg-white/20 transform skew-x-12 group-hover:animate-shine" />
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Continue to Features
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 2: Features */}
            {step === 2 && (
              <div className="glass p-6 rounded-xl mb-8 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Choose Theme Features</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {features.map((feature, index) => (
                    <Card 
                      key={feature} 
                      onClick={() => handleFeatureToggle(feature)}
                      className={`glass-card cursor-pointer transition-all hover:scale-105 ${
                        selectedFeatures.includes(feature) ? 'ring-2 ring-theme-blue' : ''
                      }`}
                      style={{ animationDelay: getAnimationDelay(index) }}
                    >
                      <CardContent className="p-4 flex items-center">
                        <div className={`w-5 h-5 rounded border ${
                          selectedFeatures.includes(feature) ? 'border-theme-blue' : 'border-gray-600'
                        } mr-3 flex items-center justify-center transition-colors duration-200`}>
                          {selectedFeatures.includes(feature) && (
                            <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-theme-blue to-theme-purple"></div>
                          )}
                        </div>
                        <span>{feature}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <h2 className="text-xl font-semibold mb-4 mt-8">Customize Design Elements</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Primary Font</label>
                    <select 
                      className="w-full rounded-md bg-theme-dark border border-gray-700 p-2"
                      value={primaryFont}
                      onChange={(e) => setPrimaryFont(e.target.value)}
                    >
                      {fontOptions.map(font => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Secondary Font</label>
                    <select 
                      className="w-full rounded-md bg-theme-dark border border-gray-700 p-2"
                      value={secondaryFont}
                      onChange={(e) => setSecondaryFont(e.target.value)}
                    >
                      {fontOptions.map(font => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Animation Style</label>
                    <select 
                      className="w-full rounded-md bg-theme-dark border border-gray-700 p-2"
                      value={animationStyle}
                      onChange={(e) => setAnimationStyle(e.target.value)}
                    >
                      {animationOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Layout Type</label>
                    <select 
                      className="w-full rounded-md bg-theme-dark border border-gray-700 p-2"
                      value={layoutType}
                      onChange={(e) => setLayoutType(e.target.value)}
                    >
                      {layoutOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-4 mt-8">Device Support</h2>
                <div className="flex flex-wrap gap-4 mb-6">
                  {["Desktop", "Mobile", "Tablet"].map((device) => (
                    <Card 
                      key={device}
                      onClick={() => handleDeviceToggle(device)}
                      className={`glass-card cursor-pointer py-2 px-4 ${
                        deviceSupport.includes(device) ? 'ring-2 ring-theme-purple' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        {device === "Desktop" && <LaptopIcon size={18} className="mr-2" />}
                        {device === "Mobile" && <SmartphoneIcon size={18} className="mr-2" />}
                        {device === "Tablet" && <TabletsIcon size={18} className="mr-2" />}
                        {device}
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    className="group"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    Back to Design
                  </Button>
                  <Button 
                    onClick={nextStep} 
                    className="bg-gradient-to-r from-theme-blue to-theme-purple group relative overflow-hidden"
                    disabled={isLoading}
                  >
                    <span className="absolute right-full h-full w-full bg-white/20 transform skew-x-12 group-hover:animate-shine" />
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Continue to Client Info
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Client Information */}
            {step === 3 && (
              <div className="glass p-6 rounded-xl mb-8 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Client Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Client Name</label>
                    <Input 
                      value={clientName} 
                      onChange={(e) => setClientName(e.target.value)} 
                      placeholder="Enter full name" 
                      className="bg-theme-dark border-gray-700" 
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Email Address</label>
                    <Input 
                      type="email"
                      value={clientEmail} 
                      onChange={(e) => setClientEmail(e.target.value)} 
                      placeholder="email@example.com" 
                      className="bg-theme-dark border-gray-700" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Company Name</label>
                    <Input 
                      value={clientCompany} 
                      onChange={(e) => setClientCompany(e.target.value)} 
                      placeholder="Enter company name" 
                      className="bg-theme-dark border-gray-700" 
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Current Website (if any)</label>
                    <Input 
                      value={clientWebsite} 
                      onChange={(e) => setClientWebsite(e.target.value)} 
                      placeholder="https://example.com" 
                      className="bg-theme-dark border-gray-700" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Domain Name</label>
                    <Input 
                      value={domainName} 
                      onChange={(e) => setDomainName(e.target.value)} 
                      placeholder="yoursite.com" 
                      className="bg-theme-dark border-gray-700" 
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Desired Launch Date</label>
                    <Input 
                      type="date"
                      value={launchDate} 
                      onChange={(e) => setLaunchDate(e.target.value)} 
                      className="bg-theme-dark border-gray-700" 
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block mb-2 text-sm text-gray-400">Example Sites You Like (URLs)</label>
                  <textarea 
                    className="w-full rounded-md bg-theme-dark border border-gray-700 p-2 min-h-[80px]"
                    placeholder="List websites you like the design of..."
                    value={exampleSites}
                    onChange={(e) => setExampleSites(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    className="group"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    Back to Features
                  </Button>
                  <Button 
                    onClick={nextStep} 
                    className="bg-gradient-to-r from-theme-blue to-theme-purple group relative overflow-hidden"
                    disabled={isLoading}
                  >
                    <span className="absolute right-full h-full w-full bg-white/20 transform skew-x-12 group-hover:animate-shine" />
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Continue to Customize
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 4: Customize */}
            {step === 4 && (
              <div className="glass p-6 rounded-xl mb-8 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Customize Your Theme</h2>
                
                <div className="mb-6">
                  <label className="block mb-2 text-sm text-gray-400">Theme Name</label>
                  <Input 
                    value={themeName} 
                    onChange={(e) => setThemeName(e.target.value)} 
                    placeholder="My Awesome Theme" 
                    className="bg-theme-dark border-gray-700" 
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Header Style</label>
                    <select 
                      className="w-full rounded-md bg-theme-dark border border-gray-700 p-2"
                      value={headerStyle}
                      onChange={(e) => setHeaderStyle(e.target.value)}
                    >
                      <option>Centered Logo</option>
                      <option>Split Navigation</option>
                      <option>Minimal</option>
                      <option>Full Width</option>
                      <option>Hamburger Menu</option>
                      <option>Transparent Overlay</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Footer Style</label>
                    <select 
                      className="w-full rounded-md bg-theme-dark border border-gray-700 p-2"
                      value={footerStyle}
                      onChange={(e) => setFooterStyle(e.target.value)}
                    >
                      <option>Standard (3 Columns)</option>
                      <option>Wide (4 Columns)</option>
                      <option>Minimal</option>
                      <option>Split</option>
                      <option>Widget-Heavy</option>
                      <option>Call-to-Action Centered</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="responsiveDesign" 
                      checked={responsiveDesign}
                      onChange={() => setResponsiveDesign(!responsiveDesign)}
                      className="w-4 h-4" 
                    />
                    <label htmlFor="responsiveDesign" className="text-sm">Responsive Design</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="showTestimonials" 
                      checked={showTestimonials}
                      onChange={() => setShowTestimonials(!showTestimonials)}
                      className="w-4 h-4" 
                    />
                    <label htmlFor="showTestimonials" className="text-sm">Include Testimonials Section</label>
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="block mb-2 text-sm text-gray-400">Additional Notes</label>
                  <textarea 
                    className="w-full rounded-md bg-theme-dark border border-gray-700 p-2 min-h-[100px]"
                    placeholder="Any specific customization requests..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    className="group"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    Back to Client Info
                  </Button>
                  <div className="space-x-4">
                    <Button 
                      variant="outline"
                      onClick={handlePreview}
                      className="group"
                    >
                      <EyeIcon size={18} className="mr-2" />
                      Preview Theme
                    </Button>
                    <Button 
                      onClick={handleDownload}
                      className="bg-gradient-to-r from-theme-blue to-theme-purple group relative overflow-hidden"
                      disabled={isLoading}
                    >
                      <span className="absolute right-full h-full w-full bg-white/20 transform skew-x-12 group-hover:animate-shine" />
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Download size={18} className="mr-2" />
                          Proceed to Download
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Preview Panel */}
            <div className="mt-8 glass p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Live Preview</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="group">
                    <Share2 size={16} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="group">
                    <Save size={16} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Save
                  </Button>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img 
                    src={getCurrentPreviewImage()}
                    alt="Theme preview" 
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-darker to-transparent opacity-50"></div>
                  <div className="absolute bottom-4 left-4 right-4 p-4 glass rounded-lg">
                    <h4 className="font-bold">{themeName}</h4>
                    <p className="text-sm text-gray-300">
                      {designStyles.find(d => d.id === designStyle)?.name} design for {industries.find(i => i.id === industry)?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mt-8 glass p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-6 text-center">What Our Clients Say</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="glass-card overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-theme-blue">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm mb-4">"{testimonial.comment}"</p>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-xs text-gray-400">{testimonial.company}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThemeBuilder;
