import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Wrench, Rocket, ShieldCheck, Headphones } from "lucide-react";

const reasons = [
  { icon: Brain, title: "AI Powered Solutions", desc: "Leverage cutting-edge AI to automate and optimize your business." },
  { icon: Wrench, title: "Custom-Built Systems", desc: "Tailored solutions built from scratch for your unique needs." },
  { icon: Rocket, title: "Fast Delivery", desc: "Quick turnaround without compromising on quality." },
  { icon: ShieldCheck, title: "Secure & Scalable", desc: "Enterprise-grade security that grows with your business." },
  { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock dedicated support whenever you need it." },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Why Us</p>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Why Choose <span className="text-gradient">CORAL DIGITALS</span>
          </h2>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center rounded-xl border border-border/50 bg-gradient-card p-6 text-center shadow-card"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <r.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-heading text-sm font-semibold">{r.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
