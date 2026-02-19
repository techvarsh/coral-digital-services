import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

type Step = "greet" | "service" | "name" | "phone" | "email" | "done";

const serviceOptions = [
  "Website Development",
  "AI Chatbot",
  "WhatsApp Integration",
  "Digital Marketing",
  "Custom Application",
  "Other",
];

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("greet");
  const [data, setData] = useState({ service: "", name: "", phone: "", email: "" });
  const [input, setInput] = useState("");

  const messages: { from: "bot" | "user"; text: string }[] = [];

  // Build conversation based on step
  messages.push({ from: "bot", text: "👋 Hi! Welcome to CORAL DIGITALS. How can I help you today?" });

  if (step === "greet") {
    // Show service selection
  } else if (step === "service") {
    messages.push({ from: "user", text: data.service });
    messages.push({ from: "bot", text: `Great choice! What's your name?` });
  } else if (step === "name") {
    messages.push({ from: "user", text: data.service });
    messages.push({ from: "bot", text: `Great choice! What's your name?` });
    messages.push({ from: "user", text: data.name });
    messages.push({ from: "bot", text: `Nice to meet you, ${data.name}! What's your phone number?` });
  } else if (step === "phone") {
    messages.push({ from: "user", text: data.service });
    messages.push({ from: "bot", text: `What's your name?` });
    messages.push({ from: "user", text: data.name });
    messages.push({ from: "bot", text: `What's your phone number?` });
    messages.push({ from: "user", text: data.phone });
    messages.push({ from: "bot", text: `And your email address?` });
  } else if (step === "email" || step === "done") {
    messages.push({ from: "user", text: data.service });
    messages.push({ from: "user", text: data.name });
    messages.push({ from: "user", text: data.phone });
    messages.push({ from: "user", text: data.email });
    messages.push({
      from: "bot",
      text: `Thank you, ${data.name}! 🎉 Our team will reach out soon. You can also chat with us on WhatsApp for faster response!`,
    });
  }

  const handleServiceSelect = (s: string) => {
    setData((d) => ({ ...d, service: s }));
    setStep("service");
  };

  const handleSend = () => {
    if (!input.trim()) return;
    if (step === "service") {
      setData((d) => ({ ...d, name: input.trim() }));
      setStep("name");
    } else if (step === "name") {
      setData((d) => ({ ...d, phone: input.trim() }));
      setStep("phone");
    } else if (step === "phone") {
      setData((d) => ({ ...d, email: input.trim() }));
      setStep("done");
    }
    setInput("");
  };

  const reset = () => {
    setStep("greet");
    setData({ service: "", name: "", phone: "", email: "" });
    setInput("");
  };

  return (
    <>
      {/* Toggle */}
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
            className="fixed bottom-24 right-6 z-50 flex h-[440px] w-[340px] flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-card"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-cta px-4 py-3">
              <Bot size={20} className="text-primary-foreground" />
              <div>
                <p className="text-sm font-semibold text-primary-foreground">CORAL Assistant</p>
                <p className="text-[10px] text-primary-foreground/70">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                      m.from === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Service buttons */}
              {step === "greet" && (
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleServiceSelect(s)}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {step === "done" && (
                <div className="flex gap-2">
                  <a
                    href="https://wa.me/919999999999?text=Hi%2C%20I'm%20interested%20in%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-green-500 px-4 py-1.5 text-xs font-semibold text-white"
                  >
                    Chat on WhatsApp
                  </a>
                  <button onClick={reset} className="rounded-full border border-border px-4 py-1.5 text-xs text-muted-foreground">
                    Start Over
                  </button>
                </div>
              )}
            </div>

            {/* Input */}
            {step !== "greet" && step !== "done" && (
              <div className="flex items-center gap-2 border-t border-border p-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={
                    step === "service" ? "Enter your name" : step === "name" ? "Enter phone number" : "Enter email"
                  }
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
