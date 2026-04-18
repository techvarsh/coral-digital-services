import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter Package",
    tag: "Best for small businesses",
    price: "₹14,999",
    cta: "Get Started",
    popular: false,
    features: [
      "5 Page Dynamic Website",
      "Mobile Responsive Design",
      "Basic SEO Setup",
      "Contact Form",
      "Click-to-Call Button",
      "Basic Security",
      "1 Month Support",
    ],
  },
  {
    name: "Business Package",
    tag: "Most Popular",
    price: "₹29,999",
    cta: "Upgrade Now",
    popular: true,
    features: [
      "Everything in Starter",
      "Admin Panel (Lead Management)",
      "AI Chatbot Integration",
      "Google Analytics Setup",
      "Speed Optimization",
      "Basic Database Integration",
      "3 Months Support",
    ],
  },
  {
    name: "Premium Automation",
    tag: "Full-scale digital system",
    price: "₹59,999",
    cta: "Book Free Call",
    popular: false,
    features: [
      "Everything in Business",
      "Custom Business System (CRM / App)",
      "Advanced AI Chatbot (Lead Qualification)",
      "Workflow Automation Setup",
      "Payment Gateway Integration",
      "Multi-language Support",
      "Full Database Management",
      "6 Months Priority Support",
    ],
  },
];

const comparisonRows = [
  { feature: "Dynamic Website", starter: true, business: true, premium: true },
  { feature: "Mobile Responsive", starter: true, business: true, premium: true },
  { feature: "SEO Setup", starter: "Basic", business: "Advanced", premium: "Advanced" },
  { feature: "Admin Panel", starter: false, business: true, premium: true },
  { feature: "AI Chatbot", starter: false, business: "Basic", premium: "Advanced" },
  { feature: "Workflow Automation", starter: false, business: false, premium: true },
  { feature: "Custom CRM/App", starter: false, business: false, premium: true },
  { feature: "Database Integration", starter: false, business: "Basic", premium: "Full" },
  { feature: "Payment Gateway", starter: false, business: false, premium: true },
  { feature: "Support Duration", starter: "1 Month", business: "3 Months", premium: "6 Months" },
];

const CellValue = ({ val }: { val: boolean | string }) => {
  if (val === true) return <Check size={16} className="mx-auto text-primary" />;
  if (val === false) return <span className="text-muted-foreground">—</span>;
  return <span className="text-sm text-foreground">{val}</span>;
};

const PricingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="relative py-24" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Pricing</p>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Choose The Right Plan For Your{" "}
            <span className="text-gradient">Business Growth</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 shadow-card transition-all duration-300 hover:shadow-card-hover ${
                p.popular
                  ? "border-primary/50 bg-gradient-card scale-[1.03] animate-pulse-glow"
                  : "border-border/50 bg-gradient-card"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-cta px-4 py-1 text-xs font-bold text-primary-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading text-lg font-bold">{p.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.tag}</p>
              <p className="mt-6 font-heading text-3xl font-extrabold text-foreground">
                {p.price}
              </p>
              <p className="text-xs text-muted-foreground">Starting from</p>

              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 block rounded-lg py-3 text-center text-sm font-semibold transition-transform hover:scale-105 ${
                  p.popular
                    ? "bg-gradient-cta text-primary-foreground shadow-glow"
                    : "border border-primary/30 text-primary hover:bg-primary/10"
                }`}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-20 max-w-4xl overflow-x-auto"
        >
          <h3 className="mb-6 text-center font-heading text-xl font-bold">Plan Comparison</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 font-semibold text-muted-foreground">Feature</th>
                <th className="px-4 py-3 text-center font-semibold">Starter</th>
                <th className="px-4 py-3 text-center font-semibold text-primary">Business</th>
                <th className="px-4 py-3 text-center font-semibold">Premium</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((r) => (
                <tr key={r.feature} className="border-b border-border/50">
                  <td className="px-4 py-3 text-muted-foreground">{r.feature}</td>
                  <td className="px-4 py-3 text-center"><CellValue val={r.starter} /></td>
                  <td className="px-4 py-3 text-center"><CellValue val={r.business} /></td>
                  <td className="px-4 py-3 text-center"><CellValue val={r.premium} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            * Final pricing may vary based on project requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
