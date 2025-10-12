import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

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
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className={`rounded-full w-14 h-14 shadow-elegant animate-float ${
            isOpen ? "hidden" : "flex"
          } items-center justify-center bg-gradient-blue hover:shadow-glow transition-all`}
        >
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <Card className="w-80 h-96 shadow-elegant border-0">
            <CardHeader className="bg-gradient-blue text-primary-foreground p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 animate-pulse-glow" />
                  <span className="font-semibold">AI Assistant</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 flex flex-col h-72">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-2 animate-fade-in ${
                      message.isBot ? "justify-start" : "justify-end"
                    }`}
                  >
                    {message.isBot && (
                      <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] p-2 rounded-lg text-sm ${
                        message.isBot
                          ? "bg-muted text-muted-foreground"
                          : "bg-gradient-primary text-primary-foreground"
                      }`}
                    >
                      {message.text}
                    </div>
                    {!message.isBot && (
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <User className="h-3 w-3 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-gradient-primary hover:shadow-glow"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBot;