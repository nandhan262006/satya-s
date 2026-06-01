import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, Leaf, Star, ChevronDown, Phone, MapPin, Clock, Instagram, Facebook, MessageCircle, Menu, X, ArrowRight, Heart, Zap, Shield, Award } from "lucide-react";

const COLORS = {
  bgMain: "#f4e7f4",
  bgSoft: "#efe0ef",
  primary: "#6d1848",
  primaryDark: "#4b0f31",
  accent: "#b77aa5",
  textDark: "#3b2231",
  textLight: "#ffffff",
};

// Rose Petal Component
const RosePetal = ({ style, delay }) => (
  <motion.div
    style={{
      position: "fixed",
      width: Math.random() * 14 + 8,
      height: Math.random() * 18 + 10,
      background: `radial-gradient(ellipse at 40% 30%, #f5c2d8, #c9607e88)`,
      borderRadius: "60% 40% 70% 30% / 50% 60% 40% 70%",
      opacity: 0,
      pointerEvents: "none",
      zIndex: 9999,
      filter: "blur(0.3px)",
      ...style,
    }}
    animate={{
      y: ["0vh", "110vh"],
      x: [0, Math.random() * 80 - 40, Math.random() * 60 - 30, 0],
      rotate: [0, 180, 360, 540],
      opacity: [0, 0.7, 0.5, 0],
    }}
    transition={{
      duration: Math.random() * 6 + 7,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

const PetalRain = () => {
  const petals = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    style: { left: `${Math.random() * 100}vw`, top: "-60px" },
    delay: Math.random() * 12,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {petals.map((p) => <RosePetal key={p.id} style={p.style} delay={p.delay} />)}
    </div>
  );
};

// Custom Cursor
const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <motion.div
        animate={{ x: pos.x - 6, y: pos.y - 6 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        style={{ position: "fixed", width: 12, height: 12, borderRadius: "50%", background: COLORS.primary, pointerEvents: "none", zIndex: 99999, mixBlendMode: "multiply" }}
      />
      <motion.div
        animate={{ x: pos.x - 20, y: pos.y - 20 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ position: "fixed", width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${COLORS.accent}`, pointerEvents: "none", zIndex: 99998, opacity: 0.5 }}
      />
    </>
  );
};

// Navbar
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Home", "About", "Services", "Gallery", "Booking", "Contact"];
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(244,231,244,0.82)" : "rgba(255,255,255,0.12)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        padding: "0 2rem",
        transition: "background 0.4s",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <motion.div whileHover={{ scale: 1.04 }} style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: COLORS.primary, cursor: "pointer", letterSpacing: 1 }}>
          Satya's <span style={{ fontWeight: 400, color: COLORS.accent, fontSize: 14, letterSpacing: 3 }}>BEAUTY & AESTHETIC SALON</span>
        </motion.div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          {links.map((l) => (
            <motion.a key={l} href={`#${l.toLowerCase()}`} whileHover={{ color: COLORS.primary, letterSpacing: "1.5px" }}
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.textDark, textDecoration: "none", transition: "all 0.3s", fontWeight: 500, letterSpacing: "0.5px" }}>
              {l}
            </motion.a>
          ))}
          <motion.button whileHover={{ translateY: -3, boxShadow: `0 10px 25px rgba(109,24,72,0.35)` }}
            style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #8b2d64)`, color: "#fff", border: "none", borderRadius: 999, padding: "10px 24px", fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Book Now
          </motion.button>
        </div>
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.primary, display: "none" }} className="mobile-menu-btn">
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
    </motion.nav>
  );
};

// Hero Section
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  return (
    <section id="home" ref={ref} style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 72 }}>
      <div style={{ position: "absolute", width: 500, height: 500, background: "#d8a6c9", filter: "blur(140px)", opacity: 0.35, top: "10%", right: "10%", borderRadius: "50%" }} />
      <div style={{ position: "absolute", width: 300, height: 300, background: "#b77aa5", filter: "blur(120px)", opacity: 0.2, bottom: "10%", left: "5%", borderRadius: "50%" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", width: "100%" }}>
        <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(183,122,165,0.15)", border: "1px solid rgba(183,122,165,0.3)", borderRadius: 999, padding: "6px 16px", marginBottom: "1.5rem" }}>
            <Sparkles size={14} color={COLORS.accent} />
            <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.accent, letterSpacing: 2, fontWeight: 600 }}>PREMIUM BEAUTY EXPERIENCE</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem, 5vw, 4.2rem)", fontWeight: 700, color: COLORS.textDark, lineHeight: 1.15, marginBottom: "1.5rem" }}>
            Where Beauty<br /><span style={{ color: COLORS.primary }}>Meets</span> Grace &<br />
            <span style={{ fontStyle: "italic", color: COLORS.accent }}>Elegance</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            style={{ fontFamily: "'Outfit'", fontSize: 16, color: COLORS.textDark, opacity: 0.7, lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 440 }}>
            Indulge in a world of luxury beauty treatments crafted to enhance your natural radiance. From bridal packages to advanced skin therapies — we transform, we pamper, we elevate.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <motion.button whileHover={{ translateY: -4, boxShadow: `0 12px 30px rgba(109,24,72,0.4)` }}
              style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #8b2d64)`, color: "#fff", border: "none", borderRadius: 999, padding: "16px 36px", fontFamily: "'Outfit'", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              Book Appointment <ArrowRight size={16} />
            </motion.button>
            <motion.button whileHover={{ translateY: -4 }}
              style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(12px)", color: COLORS.primary, border: `1.5px solid rgba(109,24,72,0.3)`, borderRadius: 999, padding: "16px 36px", fontFamily: "'Outfit'", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              Explore Services
            </motion.button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} style={{ display: "flex", gap: "2.5rem", marginTop: "3rem" }}>
            {[["500+", "Happy Clients"], ["15+", "Expert Artists"], ["8+", "Years Experience"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 28, fontWeight: 700, color: COLORS.primary }}>{num}</div>
                <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.textDark, opacity: 0.6, letterSpacing: 1 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} style={{ position: "relative" }}>
          <motion.div style={{ y }} animate={{ y: [0, -18, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <div style={{
              background: "rgba(255,255,255,0.18)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 40, padding: "2.5rem", boxShadow: "0 30px 80px rgba(109,24,72,0.2)", overflow: "hidden", position: "relative"
            }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(244,231,244,0.6), rgba(239,224,239,0.4))", borderRadius: 40 }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ background: `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.accent}33)`, borderRadius: 28, height: 320, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", border: `1px solid rgba(183,122,165,0.2)` }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 80 }}>💆‍♀️</div>
                    <div style={{ fontFamily: "'Playfair Display'", fontSize: 18, color: COLORS.primary, marginTop: 12, fontStyle: "italic" }}>Your Beauty Journey</div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.accent, letterSpacing: 2, marginTop: 4 }}>BEGINS HERE</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[["🌸", "Bridal Packages"], ["✨", "Skin Treatments"], ["💅", "Nail Art"], ["🧖‍♀️", "Spa Therapy"]].map(([icon, name]) => (
                    <motion.div key={name} whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.4)" }}
                      style={{ background: "rgba(255,255,255,0.25)", borderRadius: 16, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", transition: "background 0.3s" }}>
                      <span style={{ fontSize: 20 }}>{icon}</span>
                      <span style={{ fontFamily: "'Outfit'", fontSize: 12, fontWeight: 600, color: COLORS.textDark }}>{name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", cursor: "pointer" }}>
        <ChevronDown size={28} color={COLORS.accent} />
      </motion.div>
    </section>
  );
};

// About Section
const About = () => (
  <section id="about" style={{ padding: "7rem 2rem", background: "transparent", position: "relative" }}>
    <div style={{ position: "absolute", width: 400, height: 400, background: "#b77aa5", filter: "blur(150px)", opacity: 0.15, top: "50%", left: "50%", transform: "translate(-50%,-50%)", borderRadius: "50%" }} />
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center", position: "relative", zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <div style={{ position: "relative" }}>
          <div style={{
            background: "rgba(255,255,255,0.2)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 36, padding: "3rem", boxShadow: "0 20px 60px rgba(109,24,72,0.15)"
          }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🌺</div>
            <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 28, color: COLORS.primary, marginBottom: "1rem" }}>Our Philosophy</h3>
            <p style={{ fontFamily: "'Outfit'", fontSize: 15, color: COLORS.textDark, opacity: 0.75, lineHeight: 1.8 }}>
              Beauty is not just appearance — it is how you feel from within. We merge ancient beauty rituals with modern aesthetics to create transformative experiences tailored for every woman.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              {["Certified Experts", "Premium Products", "Hygienic Practices"].map((tag) => (
                <span key={tag} style={{ background: `rgba(109,24,72,0.1)`, color: COLORS.primary, borderRadius: 999, padding: "6px 14px", fontSize: 12, fontFamily: "'Outfit'", fontWeight: 600 }}>{tag}</span>
              ))}
            </div>
          </div>
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", border: `2px dashed rgba(183,122,165,0.4)`, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.3)" }}>
            <Sparkles size={24} color={COLORS.accent} />
          </motion.div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.accent, letterSpacing: 3, fontWeight: 600 }}>ABOUT US</span>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: COLORS.textDark, lineHeight: 1.2, margin: "0.8rem 0 1.5rem" }}>
          A Sanctuary of <span style={{ color: COLORS.primary, fontStyle: "italic" }}>Feminine</span> Beauty
        </h2>
        <p style={{ fontFamily: "'Outfit'", fontSize: 15, color: COLORS.textDark, opacity: 0.72, lineHeight: 1.85, marginBottom: "1.5rem" }}>
          At Satya's Beauty & Aesthetic Salon, we believe every woman deserves to feel extraordinary. Founded with a passion for the art of beauty, our salon is a haven where expert artistry meets heartfelt care.
        </p>
        <p style={{ fontFamily: "'Outfit'", fontSize: 15, color: COLORS.textDark, opacity: 0.72, lineHeight: 1.85, marginBottom: "2rem" }}>
          From our signature bridal transformations to cutting-edge skin treatments, every service is performed with precision, love, and a deep understanding of feminine beauty standards across cultures.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {[{ icon: Award, text: "Award Winning Salon" }, { icon: Shield, text: "Safe & Hygienic" }, { icon: Heart, text: "Personalized Care" }, { icon: Zap, text: "Latest Techniques" }].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.25)", borderRadius: 14, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.3)" }}>
              <Icon size={18} color={COLORS.primary} />
              <span style={{ fontFamily: "'Outfit'", fontSize: 13, fontWeight: 600, color: COLORS.textDark }}>{text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

// Services
const services = [
  { icon: "💍", title: "Bridal Makeup", desc: "Complete bridal transformation with HD makeup, setting sprays, and lasting artistry for your special day.", price: "₹4,999+" },
  { icon: "✨", title: "Skin Treatments", desc: "Advanced facials, chemical peels, brightening therapies and anti-aging treatments for radiant skin.", price: "₹1,499+" },
  { icon: "💅", title: "Nail Art Studio", desc: "Gel extensions, nail art, French manicures and luxury pedicures with premium nail products.", price: "₹599+" },
  { icon: "💆‍♀️", title: "Spa & Wellness", desc: "Full body massages, aromatherapy, detox wraps, and calming rituals for total relaxation.", price: "₹2,499+" },
  { icon: "💇‍♀️", title: "Hair Styling", desc: "Cuts, coloring, keratin treatments, hair spa, and premium styling by certified hair artists.", price: "₹899+" },
  { icon: "🌿", title: "Eyebrow & Lash", desc: "Threading, tinting, lash extensions, lamination and HD brow shaping for perfect definition.", price: "₹299+" },
];

const Services = () => (
  <section id="services" style={{ padding: "7rem 2rem" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "4rem" }}>
        <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.accent, letterSpacing: 3, fontWeight: 600 }}>WHAT WE OFFER</span>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: COLORS.textDark, margin: "0.8rem 0 1rem" }}>
          Our <span style={{ color: COLORS.primary, fontStyle: "italic" }}>Signature</span> Services
        </h2>
        <p style={{ fontFamily: "'Outfit'", fontSize: 15, color: COLORS.textDark, opacity: 0.65, maxWidth: 500, margin: "0 auto" }}>
          Each service is a carefully curated experience designed to make you feel utterly beautiful and deeply nurtured.
        </p>
      </motion.div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {services.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: `0 20px 50px rgba(109,24,72,0.2)` }}
            style={{
              background: "rgba(255,255,255,0.2)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 28, padding: "2rem", cursor: "pointer", transition: "box-shadow 0.4s", position: "relative", overflow: "hidden"
            }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `linear-gradient(135deg, rgba(183,122,165,0.15), transparent)`, borderRadius: "0 28px 0 100%" }} />
            <span style={{ fontSize: 40, marginBottom: "1rem", display: "block" }}>{s.icon}</span>
            <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 21, fontWeight: 700, color: COLORS.textDark, marginBottom: "0.6rem" }}>{s.title}</h3>
            <p style={{ fontFamily: "'Outfit'", fontSize: 14, color: COLORS.textDark, opacity: 0.68, lineHeight: 1.75, marginBottom: "1.5rem" }}>{s.desc}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 700, color: COLORS.primary }}>{s.price}</span>
              <motion.button whileHover={{ scale: 1.05 }}
                style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #8b2d64)`, color: "#fff", border: "none", borderRadius: 999, padding: "8px 20px", fontSize: 12, fontFamily: "'Outfit'", fontWeight: 600, cursor: "pointer" }}>
                Book
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);



// Testimonials
const testimonials = [
  { name: "Priya Sharma", role: "Bridal Client", text: "Satya's team made me look absolutely ethereal on my wedding day. The attention to detail was breathtaking — I received compliments all day!", rating: 5 },
  { name: "Ananya Reddy", role: "Regular Client", text: "I've been visiting for my monthly skin treatments for 2 years. My skin has never looked better. The facials are absolutely divine!", rating: 5 },
  { name: "Meera Krishnan", role: "Spa Member", text: "The spa experience is truly luxurious. It feels like a 5-star resort in the heart of the city. Their aromatherapy sessions are incredibly healing.", rating: 5 },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <section style={{ padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.accent, letterSpacing: 3, fontWeight: 600 }}>WHAT CLIENTS SAY</span>
          <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: COLORS.textDark, margin: "0.8rem 0 3rem" }}>
            Stories of <span style={{ color: COLORS.primary, fontStyle: "italic" }}>Transformation</span>
          </h2>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
            style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 32, padding: "3rem", boxShadow: "0 20px 60px rgba(109,24,72,0.12)", marginBottom: "2rem" }}>
            <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: "1.5rem" }}>❝</div>
            <p style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontStyle: "italic", color: COLORS.textDark, lineHeight: 1.85, marginBottom: "2rem" }}>
              {testimonials[active].text}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: "1rem" }}>
              {Array(testimonials[active].rating).fill(0).map((_, j) => <Star key={j} size={16} fill={COLORS.accent} color={COLORS.accent} />)}
            </div>
            <div style={{ fontFamily: "'Playfair Display'", fontSize: 16, fontWeight: 700, color: COLORS.primary }}>{testimonials[active].name}</div>
            <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.accent, letterSpacing: 1, marginTop: 4 }}>{testimonials[active].role}</div>
          </motion.div>
        </AnimatePresence>
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          {testimonials.map((_, i) => (
            <motion.button key={i} onClick={() => setActive(i)} animate={{ scale: i === active ? 1.3 : 1, background: i === active ? COLORS.primary : COLORS.accent }}
              style={{ width: 10, height: 10, borderRadius: "50%", border: "none", cursor: "pointer", opacity: i === active ? 1 : 0.4 }} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Booking
const Booking = () => {
  const [form, setForm] = useState({ name: "", phone: "", service: "", date: "", time: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 4000); };
  return (
    <section id="booking" style={{ padding: "7rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(109,24,72,0.05), rgba(183,122,165,0.08))` }} />
      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.accent, letterSpacing: 3, fontWeight: 600 }}>RESERVE YOUR SLOT</span>
          <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: COLORS.textDark, margin: "0.8rem 0 1rem" }}>
            Book an <span style={{ color: COLORS.primary, fontStyle: "italic" }}>Appointment</span>
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}
          style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 36, padding: "3rem", boxShadow: "0 20px 60px rgba(109,24,72,0.15)" }}>
          <AnimatePresence>
            {submitted ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ fontSize: 56, marginBottom: "1rem" }}>🌸</div>
                <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 24, color: COLORS.primary, marginBottom: "0.5rem" }}>Appointment Booked!</h3>
                <p style={{ fontFamily: "'Outfit'", fontSize: 14, color: COLORS.textDark, opacity: 0.7 }}>We'll call you shortly to confirm your appointment.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
                  {[["name", "Your Name", "text"], ["phone", "Phone Number", "tel"]].map(([key, ph, type]) => (
                    <input key={key} type={type} placeholder={ph} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required
                      style={{ background: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(183,122,165,0.3)", borderRadius: 16, padding: "14px 18px", fontFamily: "'Outfit'", fontSize: 14, color: COLORS.textDark, outline: "none", width: "100%", boxSizing: "border-box" }} />
                  ))}
                </div>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} required
                  style={{ width: "100%", background: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(183,122,165,0.3)", borderRadius: 16, padding: "14px 18px", fontFamily: "'Outfit'", fontSize: 14, color: COLORS.textDark, outline: "none", marginBottom: "1.2rem", boxSizing: "border-box" }}>
                  <option value="">Select Service</option>
                  {services.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                </select>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "2rem" }}>
                  {[["date", "Date", "date"], ["time", "Time", "time"]].map(([key, ph, type]) => (
                    <input key={key} type={type} placeholder={ph} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required
                      style={{ background: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(183,122,165,0.3)", borderRadius: 16, padding: "14px 18px", fontFamily: "'Outfit'", fontSize: 14, color: COLORS.textDark, outline: "none", boxSizing: "border-box" }} />
                  ))}
                </div>
                <motion.button type="submit" whileHover={{ translateY: -4, boxShadow: `0 12px 30px rgba(109,24,72,0.4)` }}
                  style={{ width: "100%", background: `linear-gradient(135deg, ${COLORS.primary}, #8b2d64)`, color: "#fff", border: "none", borderRadius: 999, padding: "16px", fontFamily: "'Outfit'", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
                  Confirm Appointment ✨
                </motion.button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

// Contact
const Contact = () => (
  <section id="contact" style={{ padding: "5rem 2rem" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.accent, letterSpacing: 3, fontWeight: 600 }}>REACH US</span>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: COLORS.textDark, margin: "0.8rem 0" }}>
          Visit Our <span style={{ color: COLORS.primary, fontStyle: "italic" }}>Salon</span>
        </h2>
      </motion.div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
        {[
          { icon: MapPin, title: "Location", info: "4th Cross Rd, Housing Board Colony, Nellore", sub: "Andhra Pradesh 524004" },
          { icon: Phone, title: "Phone", info: "+91 94946 46975", sub: "Call us for appointments" },
          { icon: Clock, title: "Working Hours", info: "9 AM – 8 PM", sub: "Monday to Sunday" },
          { icon: Instagram, title: "Instagram", info: "@satyas_beauty", sub: "Follow for daily inspiration" },
        ].map(({ icon: Icon, title, info, sub }) => (
          <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            whileHover={{ y: -6, boxShadow: `0 16px 40px rgba(109,24,72,0.15)` }}
            style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 24, padding: "2rem", textAlign: "center", cursor: "pointer", transition: "box-shadow 0.4s" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.accent}33)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <Icon size={22} color={COLORS.primary} />
            </div>
            <h4 style={{ fontFamily: "'Outfit'", fontSize: 12, letterSpacing: 2, color: COLORS.accent, fontWeight: 600, marginBottom: 6 }}>{title}</h4>
            <p style={{ fontFamily: "'Playfair Display'", fontSize: 16, fontWeight: 700, color: COLORS.textDark, marginBottom: 4 }}>{info}</p>
            <p style={{ fontFamily: "'Outfit'", fontSize: 12, color: COLORS.textDark, opacity: 0.6 }}>{sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer style={{ background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`, color: "#fff", padding: "4rem 2rem 2rem" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem", flexWrap: "wrap" }}>
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
          {["Bridal Makeup", "Skin Treatments", "Nail Art", "Hair Styling", "Spa & Wellness"].map((s) => (
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

// WhatsApp Floating Button
const WhatsAppBtn = () => (
  <motion.a href="https://wa.me/919494646975" target="_blank" rel="noopener noreferrer"
    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring" }}
    whileHover={{ scale: 1.1 }}
    style={{ position: "fixed", bottom: 32, right: 32, width: 56, height: 56, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 25px rgba(37,211,102,0.5)", zIndex: 999, textDecoration: "none" }}>
    <MessageCircle size={26} color="#fff" fill="#fff" />
  </motion.a>
);

// Main App
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; cursor: none !important; }
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
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
      <PetalRain />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Bridal />
        <Testimonials />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <WhatsAppBtn />
    </>
  );
}
