import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Bot,
  MessageCircle,
  GraduationCap,
  Building2,
  UtensilsCrossed,
  Database,
  TrendingUp,
} from "lucide-react";

const services = [
  { icon: Globe, title: "Dynamic Website Development", desc: "Stunning, fast websites tailored for conversions and growth." },
  { icon: Bot, title: "AI Chatbot Integration", desc: "24/7 intelligent chatbots that qualify leads and answer queries." },
  { icon: MessageCircle, title: "WhatsApp Integration", desc: "Automated WhatsApp messaging for seamless customer engagement." },
  { icon: GraduationCap, title: "Coaching Management System", desc: "All-in-one platform to manage coaching institutes digitally." },
  { icon: Building2, title: "Tenant Management App", desc: "Simplify rent collection, complaints & tenant communication." },
  { icon: UtensilsCrossed, title: "Restaurant Website + WhatsApp Ordering", desc: "Online menus with WhatsApp-based order placement." },
  { icon: Database, title: "Custom Database Management", desc: "Robust DBMS solutions to organize and scale your data." },
  { icon: TrendingUp, title: "Digital Marketing & Lead Gen", desc: "SEO, ads & funnels to drive traffic and generate quality leads." },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">What We Do</p>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="mt-4 text-muted-foreground">End-to-end digital solutions built with modern technology.</p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl border border-border/50 bg-gradient-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <s.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-heading text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <a href="#contact" className="mt-4 inline-block text-xs font-semibold text-primary hover:underline">
                Learn More →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
