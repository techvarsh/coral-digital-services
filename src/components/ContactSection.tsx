import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Contact Us</p>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Let's Start Your <span className="text-gradient">Project</span>
          </h2>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-2">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-5 rounded-2xl border border-border/50 bg-gradient-card p-8 shadow-card"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name"
                required
                maxLength={100}
                className="rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                maxLength={255}
                className="rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              maxLength={20}
              className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <select
              className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              defaultValue=""
            >
              <option value="" disabled>Select Service</option>
              <option>Website Development</option>
              <option>AI Chatbot Integration</option>
              <option>Custom Application</option>
              <option>Database Management</option>
              <option>Digital Marketing</option>
              <option>Custom Application</option>
            </select>
            <textarea
              placeholder="Tell us about your project..."
              rows={4}
              maxLength={1000}
              className="w-full resize-none rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-cta py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              {submitted ? "Message Sent! ✓" : <>Send Message <Send size={14} /></>}
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@coraldigitals.com" },
                { icon: Phone, label: "Phone", value: "+91 89626 59561" },
                { icon: MapPin, label: "Location", value: "India" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <c.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                    <p className="font-medium text-foreground">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map embed */}
            <div className="overflow-hidden rounded-xl border border-border/50">
              <iframe
                title="Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671693.2!2d75.0!3d22.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDAwJzAwLjAiTiA3NcKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {["Facebook", "Instagram", "LinkedIn", "Twitter"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-lg border border-border bg-secondary px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {s}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
