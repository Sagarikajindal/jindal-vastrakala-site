import Link from "next/link";

export default function ConsultationBanner() {
  return (
    <section className="py-20 px-6">
      <div
        className="max-w-4xl mx-auto text-center px-8 py-14 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--burg-800) 0%, var(--burg-700) 50%, var(--burg-800) 100%)",
          border: "1px solid rgba(200,146,26,0.25)",
        }}
      >
        {/* Gold corner accents */}
        {[["top-4 left-4", "borderTop borderLeft"], ["top-4 right-4", "borderTop borderRight"], ["bottom-4 left-4", "borderBottom borderLeft"], ["bottom-4 right-4", "borderBottom borderRight"]].map(([pos, _], i) => (
          <div key={i} className={`absolute ${pos} w-6 h-6`}
            style={{
              borderTop: pos.includes("top") ? "1px solid var(--gold-500)" : undefined,
              borderBottom: pos.includes("bottom") ? "1px solid var(--gold-500)" : undefined,
              borderLeft: pos.includes("left") ? "1px solid var(--gold-500)" : undefined,
              borderRight: pos.includes("right") ? "1px solid var(--gold-500)" : undefined,
            }} />
        ))}

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-5"
          style={{ background: "rgba(200,146,26,0.12)", border: "1px solid rgba(200,146,26,0.35)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--gold-500)" }}>
            <path d="M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
          </svg>
        </div>

        <p style={{ fontFamily: "var(--font-accent)", color: "var(--gold-500)", letterSpacing: "0.35em", fontSize: "0.65rem", marginBottom: "0.75rem" }}>
          COMPLIMENTARY SERVICE
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--gold-100)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 300, marginBottom: "1rem" }}>
          Shop Our Store Live — From Anywhere in the World
        </h2>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--gold-100)", opacity: 0.75, fontSize: "1.1rem", fontStyle: "italic", lineHeight: 1.7, maxWidth: "36rem", margin: "0 auto 2rem" }}>
          Book a free video call with us. We'll show you sarees and lehengas live from our Chandni Chowk store —
          the fabric, the drape, the embroidery — before you decide. No pressure, no obligation.
        </p>
        <Link href="/consultation" className="btn-gold inline-block px-12 py-4 text-xs tracking-widest uppercase">
          Book a Free Consultation
        </Link>
        <p style={{ color: "var(--gold-700)", fontSize: "0.7rem", fontFamily: "var(--font-accent)", letterSpacing: "0.15em", marginTop: "1.25rem" }}>
          MON–SAT · 10 AM – 7 PM IST · WhatsApp Video or Google Meet
        </p>
      </div>
    </section>
  );
}
