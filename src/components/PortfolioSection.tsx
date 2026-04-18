import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  { title: "E-Commerce Platform", category: "Web Development", color: "from-blue-600/20 to-cyan-600/20" },
  { title: "AI Customer Support Bot", category: "AI Chatbot", color: "from-purple-600/20 to-pink-600/20" },
  { title: "Restaurant Ordering System", category: "Web Application", color: "from-green-600/20 to-emerald-600/20" },
  { title: "Coaching Institute CRM", category: "Management System", color: "from-orange-600/20 to-amber-600/20" },
  { title: "Real Estate Lead Funnel", category: "Digital Marketing", color: "from-rose-600/20 to-red-600/20" },
  { title: "Tenant Management Portal", category: "Custom Application", color: "from-indigo-600/20 to-violet-600/20" },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="relative py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Portfolio</p>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Our <span className="text-gradient">Recent Work</span>
          </h2>
          <p className="mt-4 text-muted-foreground">A glimpse of projects we've delivered for our clients.</p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 }}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className={`h-40 bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                <span className="font-heading text-lg font-bold text-foreground/60">{p.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-base font-semibold">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.category}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-2 rounded-lg bg-gradient-cta px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                  View Project <ExternalLink size={14} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
