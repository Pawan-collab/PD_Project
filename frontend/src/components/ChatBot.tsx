import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sparkles, X, Send, Bot, User, Minimize2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you with our AI solutions today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("solution") || input.includes("service")) {
      return "We offer AI-powered virtual assistants, rapid prototyping solutions, and automation tools. Would you like to know more about any specific service?";
    }
    if (input.includes("contact") || input.includes("reach")) {
      return "You can reach us through our Contact page or email us directly. We're based in Sunderland and serve clients globally!";
    }
    if (input.includes("price") || input.includes("cost")) {
      return "Our pricing is competitive and tailored to your specific needs. Please contact us for a personalized quote based on your requirements.";
    }
    if (input.includes("hello") || input.includes("hi")) {
      return "Hello! Welcome to AI_SOLUTIONS. We specialize in AI-powered solutions for businesses. How can I assist you today?";
    }
    if (input.includes("about") || input.includes("company")) {
      return "AI_SOLUTIONS is based in Sunderland and focuses on revolutionizing the digital employee experience through AI. We help businesses worldwide with innovative solutions.";
    }
    return "That's an interesting question! For detailed information about our AI solutions, I'd recommend checking our Solutions page or contacting our team directly.";
  };

  return (
    <>
      {/* Chat Button - New Design with Text on Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className={`${
            isOpen ? "hidden" : "flex"
          } items-center gap-3 px-5 py-6 rounded-full shadow-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:shadow-purple-500/50 transition-all duration-300 animate-float group border-2 border-white/20`}
        >
          <div className="relative">
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-white font-semibold tracking-wide text-sm group-hover:scale-105 transition-transform">
            Chat with AI
          </span>
        </Button>
      </div>

      {/* Chat Window - Modern Design */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <Card className="w-96 h-[600px] shadow-2xl border-2 border-purple-200 dark:border-purple-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
            {/* Header - Gradient Design */}
            <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/30">
                      <Sparkles className="h-6 w-6 animate-pulse" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI Assistant</h3>
                    <p className="text-xs text-white/80">Online • Always ready to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-9 w-9 p-0 rounded-full"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-9 w-9 p-0 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 flex flex-col h-[calc(600px-88px)]">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-end gap-2 animate-fade-in ${
                      message.isBot ? "justify-start" : "justify-end"
                    }`}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-white dark:border-gray-800">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-md ${
                        message.isBot
                          ? "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none"
                      }`}
                    >
                      <p className="leading-relaxed">{message.text}</p>
                      <span className={`text-xs mt-1 block ${
                        message.isBot ? "text-gray-400" : "text-white/70"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {!message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-white dark:border-gray-800">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input Area - Modern Design */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type your message..."
                      className="pr-12 rounded-full border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 transition-all py-6"
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="rounded-full h-12 w-12 p-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Powered by AI • Press Enter to send
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBot;
