import { Toaster } from "@/components/ui/sonner";
import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  DollarSign,
  HandshakeIcon,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const BRAND_SERVICES = [
  {
    icon: Megaphone,
    title: "Influencer Marketing Campaigns",
    desc: "End-to-end campaigns that connect your brand with audiences that convert.",
  },
  {
    icon: HandshakeIcon,
    title: "Brand Collaborations",
    desc: "Targeted creator partnerships that amplify your message authentically.",
  },
  {
    icon: TrendingUp,
    title: "Social Media Growth Strategy",
    desc: "Proven tactics to grow your following and community engagement.",
  },
  {
    icon: Rocket,
    title: "Content Promotion & Ad Campaigns",
    desc: "Boost content reach with paid amplification across key platforms.",
  },
  {
    icon: Users,
    title: "Influencer Outreach & Management",
    desc: "We handle creator discovery, vetting, and full campaign management.",
  },
];

const INFLUENCER_SERVICES = [
  {
    icon: BriefcaseBusiness,
    title: "Brand Deal Opportunities",
    desc: "Get matched with premium brands aligned with your niche and values.",
  },
  {
    icon: Star,
    title: "Profile Growth & Optimization",
    desc: "Boost your follower count and engagement with data-backed strategies.",
  },
  {
    icon: Sparkles,
    title: "Personal Branding Strategy",
    desc: "Build a standout identity that attracts top-tier brand partnerships.",
  },
  {
    icon: Layers,
    title: "Collaboration Management",
    desc: "Seamless handling of contracts, deliverables, and brand communication.",
  },
  {
    icon: DollarSign,
    title: "Monetization Guidance",
    desc: "Turn your content into sustainable revenue with expert monetization advice.",
  },
];

const WHY_US = [
  {
    icon: BarChart3,
    title: "Data-Driven Approach",
    desc: "Every decision backed by real analytics and performance insights.",
  },
  {
    icon: UserCheck,
    title: "Verified Influencers",
    desc: "Curated network of genuine creators with real, engaged audiences.",
  },
  {
    icon: Zap,
    title: "Fast Campaign Execution",
    desc: "From brief to launch in record time — without compromising quality.",
  },
  {
    icon: Target,
    title: "Affordable Pricing",
    desc: "Premium influencer marketing solutions that fit any budget.",
  },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_24px_oklch(0_0_0/0.5)]"
          : "bg-transparent"
      }`}
      data-ocid="nav.panel"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <button
            type="button"
            onClick={() => handleNav("#home")}
            className="font-display font-bold text-xl tracking-tight text-foreground hover:opacity-90 transition-opacity"
            data-ocid="nav.link"
          >
            Client <span className="gradient-text">Kortex</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                type="button"
                key={label}
                onClick={() => handleNav(href)}
                className="px-4 py-2 text-sm text-foreground/70 hover:text-foreground rounded-lg transition-colors hover:bg-white/[0.06]"
                data-ocid="nav.link"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNav("#contact")}
              className="px-5 py-2 text-sm font-semibold rounded-full purple-gradient-btn text-white hover:opacity-90 transition-opacity glow-sm"
              data-ocid="nav.primary_button"
            >
              Get Started
            </button>
          </div>

          <button
            type="button"
            className="md:hidden text-foreground/80 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-white/[0.08] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => handleNav(href)}
                  className="text-left px-3 py-2.5 text-foreground/80 hover:text-foreground hover:bg-white/[0.06] rounded-lg transition-colors"
                  data-ocid="nav.link"
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleNav("#contact")}
                className="mt-2 px-5 py-2.5 text-sm font-semibold rounded-full purple-gradient-btn text-white"
                data-ocid="nav.primary_button"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.jpg"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 orb-1 rounded-full blur-3xl animate-orb-drift pointer-events-none" />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 orb-2 rounded-full blur-3xl pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse-glow" />
          <span className="text-xs text-primary font-medium tracking-wide">
            Influencer Marketing Agency
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
        >
          Grow Your Brand
          <br />
          <span className="gradient-text text-glow">with Influencer Power</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Client Kortex connects brands with the right influencers to drive real
          growth and engagement.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => scrollTo("#contact")}
            className="px-8 py-3.5 font-semibold rounded-full purple-gradient-btn text-white text-sm hover:opacity-90 transition-all duration-200 glow-purple shadow-neon-md"
            data-ocid="hero.primary_button"
          >
            Get Started
          </button>
          <button
            type="button"
            onClick={() => scrollTo("#contact")}
            className="px-8 py-3.5 font-semibold rounded-full border border-primary/40 text-foreground text-sm hover:bg-primary/10 hover:border-primary/60 transition-all duration-200"
            data-ocid="hero.secondary_button"
          >
            Contact Us
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-primary/50 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] orb-2 rounded-full blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection className="text-center">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
            Who We Are
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
            Bridging Brands & <span className="gradient-text">Creators</span>
          </h2>
          <p className="text-foreground/60 text-lg leading-relaxed mb-5 max-w-2xl mx-auto">
            Client Kortex is a performance-driven influencer marketing agency
            dedicated to helping brands scale and influencers grow through
            strategic collaborations.
          </p>
          <p className="text-foreground/60 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
            We bridge the gap between brands and creators to deliver measurable
            impact — turning authentic content into real revenue.
          </p>
          <button
            type="button"
            onClick={() => scrollTo("#contact")}
            className="px-7 py-3 font-semibold rounded-full purple-gradient-btn text-white text-sm hover:opacity-90 transition-opacity glow-sm"
            data-ocid="about.primary_button"
          >
            Work With Us
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <AnimatedSection delay={index * 80}>
      <div
        className="card-dark rounded-2xl p-6 h-full hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 shadow-card-dark"
        data-ocid={`services.item.${index + 1}`}
      >
        <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-display font-semibold text-foreground mb-2 text-base">
          {title}
        </h3>
        <p className="text-sm text-foreground/50 leading-relaxed">{desc}</p>
      </div>
    </AnimatedSection>
  );
}

function Services() {
  return (
    <section id="services" className="py-28 relative">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] orb-1 rounded-full blur-3xl pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6">
        {/* For Brands */}
        <div className="mb-20">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
              For Brands
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Scale Your Brand
            </h2>
            <p className="mt-4 text-foreground/50 max-w-xl mx-auto">
              Comprehensive influencer marketing solutions to drive real growth
              and engagement for your brand.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BRAND_SERVICES.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>

        {/* For Influencers */}
        <div>
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
              For Influencers
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Grow Your Influence
            </h2>
            <p className="mt-4 text-foreground/50 max-w-xl mx-auto">
              Everything you need to land premium brand deals and turn your
              passion into a sustainable career.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INFLUENCER_SERVICES.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdsRlTnXnkbgx-E4ns-7CApTOj9d5npKCohVEBxAOa2dO5qwg/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 font-semibold rounded-full purple-gradient-btn text-white text-sm hover:opacity-90 transition-opacity glow-sm"
                data-ocid="services.primary_button"
              >
                Join as Influencer
              </a>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScpRz1ByVma1OrWwGwiZ7eaUea83S1sSdrOmvB-pa9GAMONzA/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 font-semibold rounded-full border border-primary/40 text-foreground text-sm hover:bg-primary/10 hover:border-primary/60 transition-all duration-200"
                data-ocid="services.secondary_button"
              >
                Join as Brand
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why-us" className="py-28 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] orb-1 rounded-full blur-3xl pointer-events-none opacity-25 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
            Why Client Kortex
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Built for Results
          </h2>
          <p className="mt-4 text-foreground/50 max-w-xl mx-auto">
            We combine strategy, data, and authentic storytelling to deliver
            campaigns that actually move the needle.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US.map(({ icon: Icon, title, desc }, i) => (
            <AnimatedSection key={title} delay={i * 100}>
              <div
                className="card-dark rounded-2xl p-7 h-full text-center hover:border-primary/40 transition-all duration-300 shadow-card-dark"
                data-ocid={`why.item.${i + 1}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Guarantee strip */}
        <AnimatedSection delay={200}>
          <div className="mt-14 card-dark rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-card-dark">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display font-bold text-lg text-foreground mb-1">
                Our Commitment to You
              </h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                Every campaign is built with full transparency, clear KPIs, and
                dedicated support from start to finish. Your growth is our
                success.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              {[
                "Transparent Reporting",
                "Dedicated Support",
                "Real Results",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 border border-primary/20 text-primary"
                >
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] orb-1 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center">
        <AnimatedSection>
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
            Contact
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-foreground/60 text-lg mb-12">
            Ready to grow? Reach out and let's make it happen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="https://wa.me/918360958164"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                boxShadow: "0 0 30px rgba(37, 211, 102, 0.3)",
              }}
              data-ocid="contact.primary_button"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href="mailto:clientkortex@gmail.com"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white purple-gradient-btn transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 glow-purple shadow-neon-md"
              data-ocid="contact.secondary_button"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>

          <div className="card-dark rounded-2xl p-6 inline-block">
            <p className="text-sm text-foreground/50 mb-4">
              Find us on social media
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/clientkortex/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/[0.1] bg-white/[0.04] hover:bg-pink-500/20 hover:border-pink-500/40 text-foreground/60 hover:text-pink-400 transition-all duration-200"
                data-ocid="contact.link"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/client-kortex-b797253b9/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/[0.1] bg-white/[0.04] hover:bg-blue-500/20 hover:border-blue-500/40 text-foreground/60 hover:text-blue-400 transition-all duration-200"
                data-ocid="contact.link"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-dark-surface">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="font-display font-bold text-xl mb-3">
              Client <span className="gradient-text">Kortex</span>
            </div>
            <p className="text-sm text-foreground/40 leading-relaxed max-w-xs">
              Connecting brands with the right influencers to drive real growth
              and measurable impact.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">
              Navigation
            </p>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="text-left text-sm text-foreground/50 hover:text-primary transition-colors w-fit"
                  data-ocid="nav.link"
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">
              Contact
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+918360958164"
                className="text-sm text-foreground/50 hover:text-primary transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                +91 8360958164
              </a>
              <a
                href="mailto:clientkortex@gmail.com"
                className="text-sm text-foreground/50 hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                clientkortex@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://www.instagram.com/clientkortex/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/[0.1] text-foreground/40 hover:text-pink-400 hover:border-pink-500/30 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/client-kortex-b797253b9/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/[0.1] text-foreground/40 hover:text-blue-400 hover:border-blue-500/30 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918360958164"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/[0.1] text-foreground/40 hover:text-green-400 hover:border-green-500/30 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-foreground/30">
            © {new Date().getFullYear()} Client Kortex. All rights reserved.
          </p>
          <p className="text-xs text-foreground/25">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground/50 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
