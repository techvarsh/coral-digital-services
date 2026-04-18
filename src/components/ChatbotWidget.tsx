import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

type Message = { from: "bot" | "user"; text: string; options?: string[] };

const serviceOptions = [
  "Website Development",
  "AI Chatbot",
  "Digital Marketing",
  "Database Management",
  "Custom Application",
  "Other",
];

const faqMap: Record<string, string> = {
  pricing:
    "Our packages start from ₹14,999 (Starter), ₹29,999 (Business — most popular), and ₹59,999 (Premium Automation). Final pricing depends on project scope. Shall I connect you with our team for a custom quote?",
  timeline:
    "Typical timelines: Starter sites in 5-7 days, Business packages in 10-15 days, and Premium systems in 3-4 weeks. We always prioritize quality & speed! 🚀",
  services:
    "We offer: Website Development, AI Chatbot Integration, Coaching & Tenant Management Systems, Restaurant Ordering, Database Systems, and Digital Marketing.",
  support:
    "All plans include dedicated support — 1 month (Starter), 3 months (Business), and 6 months (Premium). We also offer 24/7 priority support on premium plans.",
  payment:
    "We accept UPI, bank transfer, and online payments. We typically work with 50% advance and 50% on delivery.",
};

const faqOptions = ["Pricing", "Timeline", "Services", "Support", "Payment"];

type Step = "greet" | "faq_or_service" | "service_selected" | "collect_name" | "collect_phone" | "collect_email" | "done";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("greet");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "👋 Hi! Welcome to **CORAL DIGITALS** — your AI-powered digital partner. How can I help you today?",
      options: ["Explore Services", "Ask a Question", "Get Free Consultation"],
    },
  ]);
  const [input, setInput] = useState("");
  const [leadData, setLeadData] = useState({ service: "", name: "", phone: "", email: "" });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMsg = (from: "bot" | "user", text: string, options?: string[]) => {
    setMessages((prev) => [...prev, { from, text, options }]);
  };

  const handleOptionClick = (option: string) => {
    addMsg("user", option);

    if (step === "greet") {
      if (option === "Explore Services") {
        setTimeout(() => {
          addMsg("bot", "Great! Which service are you interested in?", serviceOptions);
          setStep("faq_or_service");
        }, 400);
      } else if (option === "Ask a Question") {
        setTimeout(() => {
          addMsg("bot", "Sure! What would you like to know about?", faqOptions);
          setStep("faq_or_service");
        }, 400);
      } else {
        setTimeout(() => {
          addMsg("bot", "Awesome! Let's get you connected. What's your **name**?");
          setStep("collect_name");
        }, 400);
      }
    } else if (step === "faq_or_service") {
      const key = option.toLowerCase();
      if (faqMap[key]) {
        setTimeout(() => {
          addMsg("bot", faqMap[key]);
          setTimeout(() => {
            addMsg("bot", "Would you like to book a free consultation or explore more?", [
              "Book Free Consultation",
              "Explore Services",
              "Ask Another Question",
            ]);
          }, 600);
        }, 400);
      } else {
        setLeadData((d) => ({ ...d, service: option }));
        setTimeout(() => {
          addMsg("bot", `Excellent choice — **${option}**! Let me connect you with our team. What's your **name**?`);
          setStep("collect_name");
        }, 400);
      }
    }
  };

  const handleSend = () => {
    const val = input.trim();
    if (!val) return;
    addMsg("user", val);
    setInput("");

    if (step === "faq_or_service") {
      // Free-text question → try to match FAQ
      const lowerVal = val.toLowerCase();
      const matchedKey = Object.keys(faqMap).find((k) => lowerVal.includes(k));
      if (matchedKey) {
        setTimeout(() => {
          addMsg("bot", faqMap[matchedKey]);
          setTimeout(() => {
            addMsg("bot", "Anything else I can help with?", ["Book Free Consultation", "Explore Services", "Ask Another Question"]);
          }, 600);
        }, 400);
      } else {
        setTimeout(() => {
          addMsg(
            "bot",
            "Great question! For detailed answers, I'd recommend speaking with our team directly. Shall I collect your details for a **free consultation**?",
            ["Yes, Let's Do It"]
          );
        }, 400);
      }
    } else if (step === "collect_name") {
      if (val.length < 2 || val.length > 100) {
        setTimeout(() => addMsg("bot", "Please enter a valid name."), 300);
        return;
      }
      setLeadData((d) => ({ ...d, name: val }));
      setTimeout(() => {
        addMsg("bot", `Nice to meet you, **${val}**! 📱 What's your phone number?`);
        setStep("collect_phone");
      }, 400);
    } else if (step === "collect_phone") {
      if (!/^\d{7,15}$/.test(val.replace(/[\s\-+]/g, ""))) {
        setTimeout(() => addMsg("bot", "Please enter a valid phone number (digits only)."), 300);
        return;
      }
      setLeadData((d) => ({ ...d, phone: val }));
      setTimeout(() => {
        addMsg("bot", "📧 And your email address?");
        setStep("collect_email");
      }, 400);
    } else if (step === "collect_email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setTimeout(() => addMsg("bot", "Please enter a valid email address."), 300);
        return;
      }
      setLeadData((d) => ({ ...d, email: val }));
      setTimeout(() => {
        addMsg(
          "bot",
          `🎉 Thank you, **${leadData.name}**! Our team will reach out to you shortly via phone or email.`,
          ["Start Over"]
        );
        setStep("done");
      }, 400);
    }
  };

  const handleSpecialOption = (option: string) => {
    if (option === "Start Over" || option === "Ask Another Question") {
      addMsg("user", option);
      setTimeout(() => {
        addMsg("bot", "Sure! What would you like to know?", faqOptions);
        setStep("faq_or_service");
      }, 400);
    } else if (option === "Book Free Consultation" || option === "Yes, Let's Do It") {
      addMsg("user", option);
      setTimeout(() => {
        addMsg("bot", "Let's get you started! What's your **name**?");
        setStep("collect_name");
      }, 400);
    } else {
      handleOptionClick(option);
    }
  };

  const showInput = ["collect_name", "collect_phone", "collect_email", "faq_or_service"].includes(step);
  const placeholders: Record<string, string> = {
    collect_name: "Enter your name",
    collect_phone: "Enter phone number",
    collect_email: "Enter email address",
    faq_or_service: "Type a question...",
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open chatbot"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-cta shadow-glow transition-transform hover:scale-110"
      >
        {open ? <X size={24} className="text-primary-foreground" /> : <Bot size={26} className="text-primary-foreground" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-card"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-cta px-4 py-3">
              <Bot size={20} className="text-primary-foreground" />
              <div>
                <p className="text-sm font-semibold text-primary-foreground">CORAL Assistant</p>
                <p className="text-[10px] text-primary-foreground/70">Online — Typically replies instantly</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i}>
                  <div className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                        m.from === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground"
                      }`}
                    >
                      {m.text.split("**").map((part, j) =>
                        j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>
                      )}
                    </div>
                  </div>
                  {m.options && m.from === "bot" && i === messages.length - 1 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSpecialOption(opt)}
                          className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            {showInput && (
              <div className="flex items-center gap-2 border-t border-border p-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={placeholders[step] || "Type a message..."}
                  className="flex-1 rounded-lg border border-border bg-background/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button onClick={handleSend} className="rounded-lg bg-primary p-2 text-primary-foreground">
                  <Send size={16} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
