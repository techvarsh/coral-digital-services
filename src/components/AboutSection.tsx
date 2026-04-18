import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Target, Users } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Who We Are</p>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Empowering Businesses with <span className="text-gradient">AI & Automation</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            At <strong className="text-foreground">CORAL SMART SOLUTIONS</strong>, we help businesses go digital with cutting-edge AI-powered websites, smart chatbots, and custom management systems. From startups to enterprises, our goal is to turn your vision into a scalable, revenue-generating digital presence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-3"
        >
          {[
            { icon: Zap, title: "Innovation First", desc: "We leverage the latest AI and automation technologies to keep your business ahead." },
            { icon: Target, title: "Results Driven", desc: "Every solution is designed to maximize leads, conversions, and growth." },
            { icon: Users, title: "Client Centric", desc: "Your success is our priority — we build partnerships, not just products." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-gradient-card border border-border/50 p-6 text-center shadow-card">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <item.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
