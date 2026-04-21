"use client";
import { useState } from "react";
import { Video, Calendar, CheckCircle } from "lucide-react";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

const TIME_SLOTS = ["10:00 AM IST","11:00 AM IST","12:00 PM IST","2:00 PM IST","3:00 PM IST","4:00 PM IST","5:00 PM IST","6:00 PM IST","7:00 PM IST"];
const OCCASIONS = ["Bridal saree","Bridal lehenga","Reception outfit","Sangeet / Mehendi","Wedding guest outfit","Festive / Puja","Gifting","Other"];

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:"", phone:"", email:"", country:"", occasion:"", budget:"", date:"", slot:"", notes:"" });
  const s = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    const msg = encodeURIComponent(`Hi! I'd like to book a free video consultation.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCountry: ${form.country}\nLooking for: ${form.occasion}\nBudget: ${form.budget}\nPreferred date: ${form.date}\nTime slot: ${form.slot}\nNotes: ${form.notes}`);
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const valid = form.name && form.phone && form.occasion && form.slot;

  if (submitted) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div className="text-center" style={{ maxWidth: "28rem" }}>
        <CheckCircle size={48} style={{ color: "var(--gold-500)", margin: "0 auto 1.5rem" }} />
        <h1 style={{ fontFamily: "var(--font-display)", color: "var(--gold-100)", fontSize: "2.5rem", fontWeight: 300, marginBottom: "1rem" }}>Request Sent!</h1>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--gold-100)", opacity: 0.75, fontStyle: "italic", lineHeight: 1.7 }}>
          Your consultation request has been sent via WhatsApp. We'll confirm your slot within a few hours.
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "5rem" }}>
      <div style={{ maxWidth: "42rem", margin: "0 auto", padding: "3rem 1.5rem 0" }}>
        <div className="text-center mb-12">
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(200,146,26,0.1)", border: "1px solid rgba(200,146,26,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <Video size={22} style={{ color: "var(--gold-500)" }} />
          </div>
          <p style={{ fontFamily: "var(--font-accent)", color: "var(--gold-500)", letterSpacing: "0.35em", fontSize: "0.6rem", marginBottom: "0.75rem" }}>FREE SERVICE</p>
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--gold-100)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, marginBottom: "1rem" }}>Video Consultation</h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gold-100)", opacity: 0.75, fontSize: "1.1rem", fontStyle: "italic", lineHeight: 1.7 }}>
            We'll show you pieces live from our Chandni Chowk store — the fabric, the drape, the embroidery — before you decide. No pressure, completely free.
          </p>
        </div>

        {/* How it works */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "3rem" }}>
          {[
            { icon: Calendar, step: "1", text: "Pick your slot" },
            { icon: Video, step: "2", text: "We call you on WhatsApp or Meet" },
            { icon: CheckCircle, step: "3", text: "Order & ship worldwide" },
          ].map(({ icon: Icon, step, text }) => (
            <div key={step} className="text-center p-4 gold-border" style={{ background: "rgba(61,3,16,0.4)" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(200,146,26,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem" }}>
                <Icon size={13} style={{ color: "var(--gold-500)" }} />
              </div>
              <p style={{ fontFamily: "var(--font-accent)", color: "var(--gold-700)", fontSize: "0.58rem", letterSpacing: "0.1em" }}>STEP {step}</p>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gold-100)", opacity: 0.7, fontSize: "0.85rem", fontStyle: "italic", marginTop: "0.25rem" }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ background: "rgba(82,5,21,0.5)", border: "1px solid rgba(200,146,26,0.2)", padding: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-accent)", color: "var(--gold-500)", fontSize: "0.65rem", letterSpacing: "0.2em", marginBottom: "1.5rem", borderBottom: "1px solid rgba(200,146,26,0.15)", paddingBottom: "1rem" }}>
            BOOK YOUR SLOT
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <input placeholder="Full name *" value={form.name} onChange={e => s("name", e.target.value)} />
            <input placeholder="WhatsApp number *" value={form.phone} onChange={e => s("phone", e.target.value)} />
            <input type="email" placeholder="Email" value={form.email} onChange={e => s("email", e.target.value)} />
            <input placeholder="Country / City" value={form.country} onChange={e => s("country", e.target.value)} />
            <div style={{ gridColumn: "1/-1" }}>
              <select value={form.occasion} onChange={e => s("occasion", e.target.value)}>
                <option value="">What are you looking for? *</option>
                {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <input placeholder="Budget (e.g. ₹15,000–₹30,000)" value={form.budget} onChange={e => s("budget", e.target.value)} />
            <input type="date" value={form.date} onChange={e => s("date", e.target.value)} min={new Date().toISOString().split("T")[0]} />
            <div style={{ gridColumn: "1/-1" }}>
              <select value={form.slot} onChange={e => s("slot", e.target.value)}>
                <option value="">Preferred time slot *</option>
                {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <textarea rows={3} placeholder="Anything specific? Colours you like, fabrics you prefer, occasion details..." value={form.notes} onChange={e => s("notes", e.target.value)} />
            </div>
          </div>

          <p style={{ fontFamily: "var(--font-body)", color: "var(--gold-700)", fontSize: "0.8rem", fontStyle: "italic", margin: "1rem 0" }}>
            * Completely free — no obligation to buy. We'll confirm your slot over WhatsApp.
          </p>

          <button onClick={handleSubmit} disabled={!valid}
            className="btn-gold w-full py-4 text-xs tracking-widest uppercase"
            style={{ opacity: valid ? 1 : 0.4, cursor: valid ? "pointer" : "not-allowed" }}>
            Book via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
