import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Leaf, Star, ChevronDown, Phone, MapPin, Clock, Instagram, Facebook, MessageCircle, Menu, X, ArrowRight, Heart, Zap, Shield, Award } from "lucide-react";

const COLORS = {
  bgMain: "#f4e7f4",
  bgSoft: "#efe0ef",
  primary: "#6d1848",
  primaryDark: "#4b0f31",
  accent: "#b77aa5",
  textDark: "#3b2231",
  textLight: "#ffffff",
};

const RosePetal = ({ petal }) => {
  const { w, h, br, dur, l, d, xOffsets, hue, sat, light } = petal;
  return (
    <motion.div
      style={{
        position: "fixed", left: l, top: "-80px", pointerEvents: "none", zIndex: 9999,
        width: w, height: h,
        borderRadius: br,
        background: `
          radial-gradient(ellipse at 35% 25%,
            hsla(${hue + 15}, ${sat}%, ${Math.min(light + 18, 95)}%, 0.88) 0%,
            hsla(${hue}, ${sat}%, ${light}%, 0.8) 35%,
            hsla(${hue - 15}, ${Math.min(sat + 10, 85)}%, ${Math.max(light - 20, 35)}%, 0.6) 100%
          )
        `,
        boxShadow: "inset 0 0 8px rgba(120,30,60,0.15)",
        opacity: 0,
        willChange: "transform",
        transformOrigin: "50% 100%",
      }}
      animate={{
        y: ["-10vh", "110vh"],
        x: xOffsets,
        rotate: [0, 120, 280, 450],
        opacity: [0, 0.8, 0.6, 0.3, 0],
      }}
      transition={{ duration: dur, delay: d, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

const PetalRain = () => {
  const rand = (min, max) => Math.random() * (max - min) + min;
  const petals = Array.from({ length: 12 }, () => {
    const w = rand(10, 24);
    const h = w * rand(1.2, 1.6);
    const br = `${rand(40, 70)}% ${rand(40, 70)}% ${rand(25, 55)}% ${rand(35, 65)}% / ${rand(35, 60)}% ${rand(40, 65)}% ${rand(40, 70)}% ${rand(25, 55)}%`;
    return {
      w, h, br,
      hue: rand(330, 365),
      sat: rand(55, 80),
      light: rand(55, 75),
      xOffsets: [0, rand(-40, 40), rand(-30, 30), 0],
      dur: rand(14, 24),
      d: rand(0, 16),
      l: `${rand(0, 100)}vw`,
    };
  });
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {petals.map((p, i) => <RosePetal key={i} petal={p} />)}
    </div>
  );
};

// Navbar
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const fn = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);
      if (currentY > 80) {
        if (currentY > lastScrollY.current + 5) {
          setHidden(true);
        } else if (currentY < lastScrollY.current - 5) {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Home", "About", "Services", "Portfolio", "Booking", "Contact"];
  return (
    <nav aria-label="Main navigation"
      style={{
        position: "fixed", top: "1rem", left: "50%", zIndex: 1000,
        width: "calc(100% - 2rem)", maxWidth: 1200,
        transform: `translateX(-50%) translateY(${hidden ? -100 : 0}px)`,
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s, box-shadow 0.4s",
        background: scrolled ? "rgba(244,231,244,0.92)" : "rgba(244,231,244,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 16,
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.04)",
        padding: "0 2rem",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <motion.div className="nav-title" whileHover={{ scale: 1.04 }} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
          <img src="/images/WATERMARK.webp" alt="Satya's Beauty & Aesthetic Salon" style={{ height: 60, objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }} />
        </motion.div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          {links.map((l) => (
            <motion.a key={l} href={`#${l.toLowerCase()}`} whileHover={{ color: COLORS.primary, letterSpacing: "1.5px" }}
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.textDark, textDecoration: "none", transition: "all 0.3s", fontWeight: 500, letterSpacing: "0.5px" }}>
              {l}
            </motion.a>
          ))}
            <motion.button onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })} whileHover={{ translateY: -3, boxShadow: `0 10px 25px rgba(109,24,72,0.35)` }}
            style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #8b2d64)`, color: "#fff", border: "none", borderRadius: 999, padding: "10px 24px", fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Book Now
          </motion.button>
        </div>
        <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.primary, display: "none" }} className="mobile-menu-btn">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ background: "rgba(244,231,244,0.97)", padding: "1rem 2rem", borderTop: "1px solid rgba(183,122,165,0.2)" }}>
            {links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "0.6rem 0", fontFamily: "'Outfit'", fontSize: 15, color: COLORS.primary, textDecoration: "none", fontWeight: 500 }}>{l}</a>)}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Hero Section
const Hero = () => {
  const ref = useRef(null);
  return (
    <section id="home" ref={ref} aria-label="Hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 96,
      backgroundImage: "url(/images/HOME.webp)", backgroundSize: "cover", backgroundPosition: "center"
    }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(59,34,49,0.45), rgba(109,24,72,0.25))" }} />
      <div className="hero-content" style={{ maxWidth: 1200, margin: "0 auto", padding: "6rem 2rem 4rem", width: "100%", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="hero-text" style={{ maxWidth: 600 }}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem, 5vw, 4.2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: "0.5rem" }}>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.22em", fontWeight: 300, letterSpacing: 6, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>
              <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3))" }} />
              WELCOME TO
              <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)" }} />
            </motion.span>
            <span style={{ background: "linear-gradient(135deg, #fff, #f5d8e8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "1em", display: "block", lineHeight: 1.1 }}>Satya's</span>
            <span style={{ fontSize: "0.55em", fontWeight: 300, letterSpacing: 10, color: "rgba(245,216,232,0.9)", display: "block", marginTop: 6 }}>Beauty & Aesthetic</span>
            <span style={{ fontSize: "0.35em", fontWeight: 400, letterSpacing: 12, color: "rgba(232,196,216,0.6)", display: "block", marginTop: 2, fontStyle: "italic" }}>Salon</span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ display: "block", fontSize: "0.18em", fontWeight: 300, letterSpacing: 4, color: "rgba(255,255,255,0.35)", marginTop: 16 }}>
              ✦  PREMIUM BEAUTY EXPERIENCE  ✦
            </motion.span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            style={{ fontFamily: "'Outfit'", fontSize: 16, color: "#fff", opacity: 0.85, lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 440 }}>
            Indulge in a world of luxury beauty treatments crafted to enhance your natural radiance. From bridal packages to advanced skin therapies — we transform, we pamper, we elevate.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="hero-btns" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <motion.button onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })} whileHover={{ translateY: -4, boxShadow: `0 12px 30px rgba(109,24,72,0.4)` }}
              style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #8b2d64)`, color: "#fff", border: "none", borderRadius: 999, padding: "16px 36px", fontFamily: "'Outfit'", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              Book Appointment <ArrowRight size={16} />
            </motion.button>
            <motion.button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} whileHover={{ translateY: -4 }}
              style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(12px)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 999, padding: "16px 36px", fontFamily: "'Outfit'", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              Explore Services
            </motion.button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="hero-stats" style={{ display: "flex", gap: "2.5rem", marginTop: "3rem" }}>
            {[["1000+", "Happy Clients"], ["16+", "Years Experience"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 32, fontWeight: 700, color: "#fff" }}>{num}</div>
                <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: "#fff", opacity: 0.85, letterSpacing: 1, fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Service data
const serviceCategories = [
  {
    title: "Nail Art",
    photo: "/images/nails.webp",
    items: ["Gel Extensions", "Acrylic Nails", "Nail Art Designs", "French Manicure", "Nail Spa"]
  },
  {
    title: "Threading",
    photo: "/images/THREADING.webp",
    items: ["Eyebrow Threading", "Upper Lip Threading", "Chin Threading", "Full Face Threading"]
  },
  {
    title: "Waxing",
    photo: "/images/waxing.webp",
    items: ["Honey Wax", "Rica Wax", "Gel Wax", "Roll On Wax", "Brazilian Wax"]
  },
  {
    title: "Pedicure & Manicure",
    photo: "/images/pedicure.webp",
    items: ["Basic Pedicure & Manicure", "Crystal Pedicure & Manicure", "Crystal Ice Cream Pedicure & Manicure", "Aroma Pedicure & Manicure", "Candle Pedicure & Manicure", "Paraffin Pedicure & Manicure"]
  },
  {
    title: "Facials",
    photo: "/images/facial.webp",
    items: ["Mini Facial", "Tan Clear Facial", "Basic Facial (Fruit & Herbal)", "Metallic Facial (Silver, Gold, Diamond, Pearl, Platinum)", "Acne Facial", "Whitening Facial", "Brightening Facial", "Skin Lightning Facial", "Glass Skin Facial", "Korean Facial", "And 100+ More"]
  },
  {
    title: "Hair Colouring",
    photo: "/images/haircolor.webp",
    items: ["Natural Henna", "Permanent Hair Colour", "Basic Hair Colour", "Hair Highlights"]
  },
  {
    title: "Hair Cuts",
    photo: "/images/haircut.webp",
    items: ["Basic Cuts", "Fashion Cuts", "Baby Hair Cuts", "Customised Cuts (Face Framing & Hair Volume)"]
  },
  {
    title: "Head Massage",
    photo: "/images/headmassage.webp",
    items: ["Coconut Oil Massage", "Aroma Oil Massage"]
  },
  {
    title: "Body Massage",
    photo: "/images/bodymassage.webp",
    items: ["Weight Loss Massage with Steam", "Relaxing Body Massage", "Body Polishing"]
  },
  {
    title: "Skin Treatments",
    photo: "/images/skintreatment.webp",
    items: ["Pigmentation Treatments", "Skin Whitening", "Acne Treatments"]
  },
  {
    title: "Hair Treatments",
    photo: "/images/hairtreatment.webp",
    items: ["Dandruff Treatment", "Hair Fall Treatment", "Hair Regrowth Treatment", "Spa Treatment for Hair Smoothing", "Keratin", "Hair Botox", "Nanoplastia"]
  },
  {
    title: "Aesthetic",
    photo: "/images/aesthetic.webp",
    items: ["Hydro Facials", "Chemical Peels", "Laser Hair Removal", "Permanent Eyebrows", "Permanent Lipstick", "Permanent Makeup", "Permanent Lashes"]
  },
  {
    title: "Acupuncture & Acupressure",
    photo: "/accupunchre.webp",
    items: ["Acupuncture Therapy", "Acupressure Therapy", "Pain Management", "Stress Relief", "Holistic Healing", "Energy Balancing", "Pressure Point Massage", "Muscle Tension Release", "Wellness Treatment"]
  }
];

// Service Modal
const ServiceModal = ({ service, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem",
    }}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      onClick={(e) => e.stopPropagation()}
      style={{
        background: "rgba(244,231,244,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 24,
        padding: "2.5rem",
        maxWidth: 500,
        width: "100%",
        maxHeight: "80vh",
        overflowY: "auto",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 24, fontWeight: 700, color: COLORS.primary }}>{service.title}</h3>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.textDark, padding: 4 }}
        >
          <X size={24} />
        </motion.button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {service.items.map((item) => (
          <div key={item} style={{
            display: "flex", alignItems: "center", gap: 12,
            fontFamily: "'Outfit'", fontSize: 15, color: COLORS.textDark,
            padding: "0.8rem 1rem",
            background: "rgba(183,122,165,0.08)",
            borderRadius: 12,
            border: "1px solid rgba(183,122,165,0.15)",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.accent, flexShrink: 0 }} />
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

// Services
const Services = () => {
  const [selected, setSelected] = useState(null);
  return (
    <section id="services" style={{ padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="section-header" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.accent, letterSpacing: 3, fontWeight: 600 }}>WHAT WE OFFER</span>
          <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: COLORS.textDark, margin: "0.8rem 0 1rem" }}>
            Our <span style={{ color: COLORS.primary, fontStyle: "italic" }}>Signature</span> Services
          </h2>
          <p style={{ fontFamily: "'Outfit'", fontSize: 15, color: COLORS.textDark, opacity: 0.65, maxWidth: 500, margin: "0 auto" }}>
            Premium beauty treatments crafted to enhance your natural radiance.
          </p>
        </motion.div>
        <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.2rem" }}>
          {serviceCategories.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.05 }} viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: `0 20px 50px rgba(109,24,72,0.2)` }}
              onClick={() => setSelected(s)} role="button" aria-label={`View ${s.title} services`}
              style={{
                background: "rgba(255,255,255,0.2)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 28, cursor: "pointer", transition: "box-shadow 0.4s", position: "relative", overflow: "hidden",
              }}
            >
              <div style={{
                height: 140, width: "100%",
                background: s.photo ? `url(${s.photo}) center/cover no-repeat` : "linear-gradient(135deg, #b77aa5, #6d1848)",
                display: "flex", alignItems: "flex-end", justifyContent: "center",
                position: "relative",
              }}>
                {!s.photo && (
                  <div style={{
                    fontFamily: "'Outfit'", fontSize: 10, color: "rgba(255,255,255,0.35)",
                    letterSpacing: 2, padding: "0.75rem", textAlign: "center",
                  }}>
                    ADD PHOTO
                  </div>
                )}
              </div>
              <div style={{ padding: "1rem 1.2rem 1.2rem" }}>
                <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 700, color: COLORS.textDark, marginBottom: "0.2rem" }}>{s.title}</h3>
                <p style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.accent, fontWeight: 500 }}>{s.items.length} Treatments</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

// Portfolio
const portfolioPhotos = [
  { id: 0, title: "Work 1", photo: "/images/gallery1.webp" },
  { id: 1, title: "Work 2", photo: "/images/gallery2.webp" },
  { id: 2, title: "Work 3", photo: "/images/gallery3.webp", bgPosition: "50% 0%" },
  { id: 3, title: "Work 4", photo: "/images/gallery4.webp" },
  { id: 4, title: "Work 5", photo: "/images/gallery5.webp" },
  { id: 5, title: "Work 6", photo: "/images/gallery6.webp" },
  { id: 6, title: "Work 7", photo: "/images/gallery7.webp", bgPosition: "50% 0%" },
  { id: 7, title: "Work 8", photo: "/images/galley8.webp", bgPosition: "50% 17%", bgSize: "150%" },
  { id: 8, title: "Work 9", photo: "/images/gallery9.webp", bgPosition: "50% 0%" },
  { id: 9, title: "Work 10", photo: "/images/gallery10.webp", bgPosition: "50% 20%" },
];

const Portfolio = () => (
  <section id="portfolio" style={{ padding: "7rem 2rem" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="section-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.accent, letterSpacing: 3, fontWeight: 600 }}>OUR WORK</span>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: COLORS.textDark, margin: "0.8rem 0" }}>
          Our <span style={{ color: COLORS.primary, fontStyle: "italic" }}>Gallery</span>
        </h2>
      </motion.div>
      <div className="portfolio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
          {portfolioPhotos.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }} viewport={{ once: true }}
              whileHover={{ scale: 1.04, zIndex: 2 }} role="img" aria-label={p.photo ? `${p.title}` : "Placeholder"}
            style={{
              aspectRatio: "1 / 1", borderRadius: 16, overflow: "hidden", cursor: "pointer",
              background: p.photo ? `url(${p.photo}) ${p.bgPosition || "center"}/${p.bgSize || "cover"} no-repeat` : `linear-gradient(135deg, hsl(${i * 36}, 40%, 75%), hsl(${i * 36 + 30}, 50%, 60%))`,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            {!p.photo && (
              <span style={{ fontFamily: "'Outfit'", fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}>
                ADD PHOTO
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Booking
const Booking = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", services: [], date: "", time: "" });
  const [submitted, setSubmitted] = useState(false);
  const toggleService = (title) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(title)
        ? prev.services.filter((s) => s !== title)
        : [...prev.services, title],
    }));
  };
  const handleSubmit = () => {
    const servicesList = form.services.length > 0
      ? form.services.map((s) => `  • ${s}`).join("\n")
      : "  Not specified";
    const msg = encodeURIComponent(
      `Hi Satya's Beauty & Aesthetic Salon! 👋\n\nI'd like to book an appointment:\n\n` +
      `👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n💇 Services:\n${servicesList}\n📅 Date: ${form.date}\n⏰ Time: ${form.time}\n\n` +
      `Please confirm my slot. Thank you! 🌸`
    );
    setSubmitted(true);
    setTimeout(() => { window.open(`https://wa.me/919494646975?text=${msg}`, "_blank"); setSubmitted(false); }, 800);
  };
  const canNext = () => {
    if (step === 1) return form.name && form.phone;
    if (step === 2) return form.services.length > 0;
    return true;
  };
  const stepLabels = ["Details", "Services", "Confirm"];
  return (
    <section id="booking" style={{ padding: "7rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(109,24,72,0.05), rgba(183,122,165,0.08))` }} />
      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="section-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.accent, letterSpacing: 3, fontWeight: 600 }}>RESERVE YOUR SLOT</span>
          <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: COLORS.textDark, margin: "0.8rem 0 1rem" }}>
            Book an <span style={{ color: COLORS.primary, fontStyle: "italic" }}>Appointment</span>
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}
          style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 36, padding: "3rem", boxShadow: "0 20px 60px rgba(109,24,72,0.15)" }}>
          {submitted ? (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: 56, marginBottom: "1rem" }}>🌸</div>
              <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 24, color: COLORS.primary, marginBottom: "0.5rem" }}>Appointment Booked!</h3>
              <p style={{ fontFamily: "'Outfit'", fontSize: 14, color: COLORS.textDark, opacity: 0.7 }}>We'll call you shortly to confirm your appointment.</p>
            </motion.div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem" }}>
                {stepLabels.map((label, i) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      background: step >= i + 1 ? COLORS.primary : "rgba(183,122,165,0.2)",
                      color: step >= i + 1 ? "#fff" : COLORS.textDark,
                      fontFamily: "'Outfit'", fontSize: 13, fontWeight: 600, transition: "all 0.3s",
                    }}>{i + 1}</div>
                    <span style={{
                      fontFamily: "'Outfit'", fontSize: 12, color: step >= i + 1 ? COLORS.primary : COLORS.textDark,
                      fontWeight: step >= i + 1 ? 600 : 400, opacity: step >= i + 1 ? 1 : 0.5,
                    }}>{label}</span>
                    {i < stepLabels.length - 1 && (
                      <div style={{ width: 24, height: 1, background: step > i + 1 ? COLORS.primary : "rgba(183,122,165,0.2)", margin: "0 0.25rem" }} />
                    )}
                  </div>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  {step === 1 && (
                    <div className="booking-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.5rem" }}>
                      {[["name", "Your Name", "text"], ["phone", "Phone Number", "tel"]].map(([key, ph, type]) => (
                        <input key={key} type={type} placeholder={ph} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required
                          style={{ background: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(183,122,165,0.3)", borderRadius: 16, padding: "14px 18px", fontFamily: "'Outfit'", fontSize: 14, color: COLORS.textDark, outline: "none", width: "100%", boxSizing: "border-box" }} />
                      ))}
                    </div>
                  )}
                  {step === 2 && (
                    <div style={{ marginBottom: "1.5rem" }}>
                      <p style={{ fontFamily: "'Outfit'", fontSize: 13, color: COLORS.textDark, opacity: 0.6, marginBottom: "0.8rem", letterSpacing: 0.5 }}>SELECT SERVICES</p>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem" }}>
                        {serviceCategories.map((s) => (
                          <motion.div key={s.title} onClick={() => toggleService(s.title)}
                            whileTap={{ scale: 0.97 }}
                            style={{
                              display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
                              padding: "10px 14px", borderRadius: 12,
                              background: form.services.includes(s.title) ? "rgba(109,24,72,0.12)" : "rgba(255,255,255,0.5)",
                              border: `1.5px solid ${form.services.includes(s.title) ? COLORS.primary : "rgba(183,122,165,0.25)"}`,
                              transition: "all 0.2s",
                              fontFamily: "'Outfit'", fontSize: 13, color: form.services.includes(s.title) ? COLORS.primary : COLORS.textDark,
                              fontWeight: form.services.includes(s.title) ? 600 : 400,
                            }}
                          >
                            <div style={{
                              width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                              background: form.services.includes(s.title) ? COLORS.primary : "rgba(255,255,255,0.6)",
                              border: `1.5px solid ${form.services.includes(s.title) ? COLORS.primary : "rgba(183,122,165,0.3)"}`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              transition: "all 0.2s",
                            }}>
                              {form.services.includes(s.title) && (
                                <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>
                              )}
                            </div>
                            {s.title}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <>
                      <div className="booking-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.5rem" }}>
                        {[["date", "Date", "date"], ["time", "Time", "time"]].map(([key, ph, type]) => (
                          <input key={key} type={type} placeholder={ph} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required
                            style={{ background: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(183,122,165,0.3)", borderRadius: 16, padding: "14px 18px", fontFamily: "'Outfit'", fontSize: 14, color: COLORS.textDark, outline: "none", boxSizing: "border-box" }} />
                        ))}
                      </div>
                      <div style={{ background: "rgba(109,24,72,0.06)", borderRadius: 16, padding: "1rem 1.2rem", marginBottom: "1.5rem" }}>
                        <p style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.accent, fontWeight: 600, marginBottom: "0.3rem", letterSpacing: 1 }}>SUMMARY</p>
                        <p style={{ fontFamily: "'Outfit'", fontSize: 14, color: COLORS.textDark, lineHeight: 1.7 }}>
                          <strong>{form.name}</strong> · {form.phone}<br />
                          Services: {form.services.length > 0 ? form.services.join(", ") : "—"}<br />
                          Date: {form.date || "—"} · Time: {form.time || "—"}
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
              <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                {step > 1 && (
                  <motion.button whileHover={{ translateY: -2 }} onClick={() => setStep((s) => s - 1)}
                    style={{ flex: 1, background: "rgba(183,122,165,0.15)", color: COLORS.primary, border: "none", borderRadius: 999, padding: "14px", fontFamily: "'Outfit'", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                    ← Back
                  </motion.button>
                )}
                {step < 3 ? (
                  <motion.button whileHover={{ translateY: -2 }} onClick={() => setStep((s) => s + 1)}
                    disabled={!canNext()}
                    style={{
                      flex: 1, background: `linear-gradient(135deg, ${COLORS.primary}, #8b2d64)`, color: "#fff", border: "none", borderRadius: 999, padding: "14px",
                      fontFamily: "'Outfit'", fontSize: 14, fontWeight: 600, cursor: canNext() ? "pointer" : "not-allowed", opacity: canNext() ? 1 : 0.4,
                    }}>
                    Next →
                  </motion.button>
                ) : (
                  <motion.button whileHover={{ translateY: -3, boxShadow: `0 10px 25px rgba(109,24,72,0.35)` }}
                    onClick={handleSubmit}
                    disabled={!canNext()}
                    style={{
                      flex: 1, background: `linear-gradient(135deg, ${COLORS.primary}, #8b2d64)`, color: "#fff", border: "none", borderRadius: 999, padding: "14px",
                      fontFamily: "'Outfit'", fontSize: 14, fontWeight: 600, cursor: canNext() ? "pointer" : "not-allowed", opacity: canNext() ? 1 : 0.4,
                    }}>
                    Confirm via WhatsApp ✨
                  </motion.button>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Contact
const Contact = () => (
  <section id="contact" style={{ padding: "5rem 2rem" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="section-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.accent, letterSpacing: 3, fontWeight: 600 }}>REACH US</span>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: COLORS.textDark, margin: "0.8rem 0" }}>
          Visit Our <span style={{ color: COLORS.primary, fontStyle: "italic" }}>Salon</span>
        </h2>
      </motion.div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
        {[
          { icon: MapPin, title: "Location", info: "4th Cross Rd, Housing Board Colony, Nellore", sub: "Andhra Pradesh 524004" },
          { icon: Phone, title: "Phone", info: "+91 94946 46975", sub: "Call us for appointments", link: "tel:+919494646975" },
          { icon: Clock, title: "Working Hours", info: "9 AM – 8 PM", sub: "Monday to Sunday" },
          { icon: Instagram, title: "Instagram", info: "@satyasbeauty_makeup_artist", sub: "Follow for daily inspiration", link: "https://www.instagram.com/satyasbeauty_makeup_artist" },
        ].map(({ icon: Icon, title, info, sub, link }) => {
          const card = (
            <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              whileHover={{ y: -6, boxShadow: `0 16px 40px rgba(109,24,72,0.15)` }}
              style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 24, padding: "2rem", textAlign: "center", cursor: link ? "pointer" : "default", textDecoration: "none", transition: "box-shadow 0.4s" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.accent}33)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <Icon size={22} color={COLORS.primary} />
              </div>
              <h4 style={{ fontFamily: "'Outfit'", fontSize: 12, letterSpacing: 2, color: COLORS.accent, fontWeight: 600, marginBottom: 6 }}>{title}</h4>
              <p style={{ fontFamily: "'Playfair Display'", fontSize: 16, fontWeight: 700, color: COLORS.textDark, marginBottom: 4, overflowWrap: "break-word", wordBreak: "break-word" }}>{info}</p>
              <p style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.textDark, opacity: 0.6 }}>{sub}</p>
            </motion.div>
          );
          return link ? <a key={title} href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>{card}</a> : card;
        })}
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}
        style={{ marginTop: "2.5rem", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.3)", boxShadow: `0 16px 40px rgba(109,24,72,0.12)` }}>
        <iframe
          title="Satya's Beauty & Aesthetic Salon location"
          src="https://maps.google.com/maps?q=4th+Cross+Rd+Housing+Board+Colony+Nellore+Andhra+Pradesh+524004&output=embed"
          width="100%" height="400" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </motion.div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer style={{ background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`, color: "#fff", padding: "4rem 2rem 2rem" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, marginBottom: "0.5rem" }}>Satya's</div>
          <div style={{ fontFamily: "'Outfit'", fontSize: 11, letterSpacing: 3, opacity: 0.6, marginBottom: "1.5rem" }}>BEAUTY & AESTHETIC SALON</div>
          <p style={{ fontFamily: "'Outfit'", fontSize: 14, opacity: 0.7, lineHeight: 1.8, maxWidth: 280 }}>
            A luxury haven where every woman discovers her most radiant self. Beauty, grace, and elegance — all in one place.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
              <motion.div key={i} whileHover={{ scale: 1.2, background: "rgba(255,255,255,0.3)" }}
                style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.3s" }}>
                <Icon size={16} color="#fff" />
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Outfit'", fontSize: 12, letterSpacing: 2, opacity: 0.6, marginBottom: "1.2rem" }}>SERVICES</h4>
          {["Nail Art", "Facials", "Hair Treatments", "Waxing", "Aesthetic"].map((s) => (
            <div key={s} style={{ fontFamily: "'Outfit'", fontSize: 14, opacity: 0.75, marginBottom: 8, cursor: "pointer" }}>{s}</div>
          ))}
        </div>
        <div>
          <h4 style={{ fontFamily: "'Outfit'", fontSize: 12, letterSpacing: 2, opacity: 0.6, marginBottom: "1.2rem" }}>QUICK LINKS</h4>
          {["About Us", "Gallery", "Book Appointment", "Gift Cards", "Membership"].map((l) => (
            <div key={l} style={{ fontFamily: "'Outfit'", fontSize: 14, opacity: 0.75, marginBottom: 8, cursor: "pointer" }}>{l}</div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontFamily: "'Outfit'", fontSize: 12, opacity: 0.5 }}>© 2026 Satya's Beauty & Aesthetic Salon. All rights reserved.</span>
        <span style={{ fontFamily: "'Outfit'", fontSize: 12, opacity: 0.5 }}>Made with 🌸 in Nellore, Andhra Pradesh</span>
      </div>
    </div>
  </footer>
);

// Floating Action Buttons
const FloatingBtns = () => {
  const btns = [
    { href: "tel:+919494646975", bg: "#6d1848", icon: Phone, label: "Call", delay: 1.2 },
    { href: "https://www.instagram.com/satyasbeauty_makeup_artist", bg: "#E4405F", icon: Instagram, label: "Instagram", delay: 1.6 },
    { href: "https://wa.me/919494646975", bg: "#25D366", icon: MessageCircle, label: "WhatsApp", delay: 2.0 },
  ];
  return (
    <div style={{ position: "fixed", bottom: 32, right: 32, display: "flex", flexDirection: "column", gap: 12, zIndex: 999 }}>
      {btns.map(({ href, bg, icon: Icon, label, delay }) => (
        <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay, type: "spring" }}
          whileHover={{ scale: 1.1 }}
          aria-label={label}
          style={{ width: 56, height: 56, background: bg, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 25px ${bg}80`, textDecoration: "none" }}>
          <Icon size={26} color="#fff" />
        </motion.a>
      ))}
    </div>
  );
};

// Main App
export default function App() {
  const { scrollYProgress } = useScroll();
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [0, 0, 0.08]);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: linear-gradient(135deg, #f4e7f4, #ecd6ec, #f7eef7);
          background-attachment: fixed;
          color: #3b2231;
          min-height: 100vh;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f4e7f4; }
        ::-webkit-scrollbar-thumb { background: #6d1848; border-radius: 20px; }
        input::placeholder, textarea::placeholder { color: rgba(59,34,49,0.45); }
        select option { color: #3b2231; background: #f4e7f4; }
        .mobile-grid { display: grid; grid-template-columns: 1fr; }
        .mobile-hide { display: none !important; }
        @media (max-width: 900px) {
          .mobile-grid { gap: 3rem !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .service-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .portfolio-grid { grid-template-columns: repeat(3, 1fr) !important; }
          section { padding: 4rem 1.25rem !important; }
          .hero-stats { gap: 1.5rem !important; }
          #home { background-position: right center !important; }
          .nav-title img { height: 48px !important; }
          .section-header { text-align: left !important; }
          .hero-content { padding: 6rem 1.25rem 4rem !important; }
          .hero-text { max-width: 50% !important; }
        }
        @media (max-width: 480px) {
          .hero-stats { gap: 1rem !important; flex-wrap: wrap !important; justify-content: center !important; }
          .hero-btns { flex-direction: column !important; width: 100% !important; }
          .hero-btns > * { width: 100% !important; justify-content: center !important; }
          .service-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .booking-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .about-features { grid-template-columns: 1fr !important; }
          section { padding: 3rem 1rem !important; }
          footer { padding: 3rem 1rem 1.5rem !important; }
          #home { background-position: right center !important; }
          .nav-title img { height: 40px !important; }
          .section-header { text-align: left !important; }
          .hero-content { padding: 5rem 1rem 3rem !important; }
          .hero-text { max-width: 65% !important; }
        }
      `}</style>
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          "name": "Satya's Beauty & Aesthetic Salon",
          "image": "/images/og-image.webp",
          "url": "https://satyasbeauty.in/",
          "telephone": "+91-94946-46975",
          "email": "info@satyasbeauty.in",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "4th Cross Rd, Housing Board Colony",
            "addressLocality": "Nellore",
            "addressRegion": "Andhra Pradesh",
            "postalCode": "524004",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "14.4576",
            "longitude": "79.9826"
          },
          "openingHoursSpecification": [
            { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "09:00", "closes": "20:00" }
          ],
          "priceRange": "₹299 - ₹44,999",
          "description": "Premium beauty salon in Nellore offering acupuncture, acupressure, bridal makeup, skin treatments, nail art, spa, and hair styling.",
          "sameAs": [
            "https://www.instagram.com/satyasbeauty_makeup_artist",
            "https://wa.me/919494646975"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Beauty Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bridal Makeup" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Nail Art" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Facials" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hair Styling" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Skin Treatments" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Acupuncture" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Acupressure" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Waxing" } }
            ]
          }
        }
      `}</script>
      <PetalRain />
      <motion.img src="/images/WATERMARK.webp" alt="Satya's Beauty & Aesthetic Salon watermark" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", zIndex: -1, padding: "4rem", opacity: watermarkOpacity }} />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Portfolio />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <FloatingBtns />
    </>
  );
}
