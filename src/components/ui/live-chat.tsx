
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, X } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! 👋 How can we help you today with your ThemeMorphic project?",
    sender: "support",
    timestamp: new Date(),
  },
];

export const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Make sure chat is initialized
  useEffect(() => {
    // Force initialization
    const checkChatVisible = setTimeout(() => {
      console.log("LiveChat component loaded!");
    }, 500);
    return () => clearTimeout(checkChatVisible);
  }, []);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate response after delay
    setTimeout(() => {
      const supportMessage: Message = {
        id: messages.length + 2,
        text: getAutoResponse(newMessage),
        sender: "support",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportMessage]);
      setIsTyping(false);
      
      // Show toast notification
      toast({
        title: "New Message",
        description: "Support team has responded to your query",
      });
    }, 1500);
  };

  const getAutoResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello there! How can I assist you with ThemeMorphic today?";
    } else if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("pricing")) {
      return "Our themes start at $49 for a single site license. You can check our full pricing at the pricing page.";
    } else if (lowerMessage.includes("theme") || lowerMessage.includes("templates")) {
      return "We have over 50 theme designs available across various industries. You can customize any of them in our Theme Builder.";
    } else if (lowerMessage.includes("refund") || lowerMessage.includes("money back")) {
      return "We offer a 30-day money-back guarantee if you're not satisfied with your purchase.";
    } else if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return "I'm happy to help! What specific aspect of our theme builder do you need assistance with?";
    } else if (lowerMessage.includes("custom") || lowerMessage.includes("customize")) {
      return "Our theme builder allows extensive customization including colors, fonts, layouts and features. Would you like me to walk you through the options?";
    } else {
      return "Thanks for your message! Our team will get back to you within 24 hours. If you need immediate assistance, please check our FAQ section or continue the conversation here.";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating chat button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-theme-blue to-theme-purple shadow-lg z-50 animate-pulse-soft"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </Button>
      )}

      {/* Chat sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-[90%] sm:w-[380px] p-0 border-l border-gray-700 bg-theme-darker">
          <SheetHeader className="bg-gradient-to-r from-theme-blue to-theme-purple p-4 text-white">
            <div className="flex justify-between items-center">
              <SheetTitle className="text-white">Live Chat Support</SheetTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white">
                <X size={18} />
              </Button>
            </div>
            <p className="text-sm opacity-90 mt-1">We typically reply within minutes</p>
          </SheetHeader>
          
          <div className="flex flex-col h-[calc(100vh-200px)]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === "user"
                        ? "bg-theme-blue text-white"
                        : "bg-gray-800 bg-opacity-70 backdrop-blur-sm text-white"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70 text-right">
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 bg-theme-dark">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-theme-darker border-gray-700"
                />
                <Button type="submit" variant="ghost" disabled={!newMessage.trim()}>
                  <Send size={18} />
                </Button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
