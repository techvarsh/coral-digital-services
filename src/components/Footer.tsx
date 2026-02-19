const footerLinks = {
  "Quick Links": ["Home", "About", "Services", "Pricing", "Portfolio", "Contact"],
  Services: [
    "Website Development",
    "AI Chatbot",
    "WhatsApp Integration",
    "Digital Marketing",
    "Custom Applications",
    "Database Systems",
  ],
};

const Footer = () => (
  <footer className="border-t border-border/50 bg-card py-14">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="font-heading text-lg font-bold">
            <span className="text-gradient">CORAL</span> DIGITALS
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Smart digital solutions for growing businesses. AI-powered, custom-built, and designed to convert.
          </p>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-heading text-sm font-semibold">{title}</h4>
            <ul className="mt-3 space-y-2">
              {links.map((l) => (
                <li key={l}>
                  <a
                    href={title === "Quick Links" ? `#${l.toLowerCase()}` : "#services"}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <h4 className="font-heading text-sm font-semibold">Stay Updated</h4>
          <p className="mt-3 text-sm text-muted-foreground">Get the latest digital tips and offers.</p>
          <form className="mt-4 flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-l-lg border border-border bg-background/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button className="rounded-r-lg bg-gradient-cta px-4 py-2 text-sm font-semibold text-primary-foreground">
              →
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 border-t border-border/50 pt-6 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 CORAL SMART SOLUTIONS. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
