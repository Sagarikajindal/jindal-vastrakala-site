export const metadata = {
  title: "Policies | Shipping, Returns & Privacy | Jindal Vastrakala",
  description: "Shipping policy, return & exchange policy, authenticity guarantee, and privacy policy for Jindal Vastrakala — authentic handwoven sarees and lehengas from Chandni Chowk, Delhi.",
};

const sections = [
  {
    id: "shipping",
    title: "Shipping Policy",
    icon: "📦",
    content: `We ship from our store in Chandni Chowk, Delhi to anywhere in the world. Here's everything you need to know.

**Dispatch time:** Every order is carefully packed and dispatched within 24 hours of payment confirmation, Monday to Saturday. Orders placed on Sunday are dispatched Monday morning.

**Delivery times:**
- India: 3–5 business days (Metro cities), 5–8 days (rest of India)
- UK & Europe: 5–8 business days via DHL Express
- UAE & Middle East: 4–6 business days
- USA & Canada: 7–10 business days
- Australia & New Zealand: 8–12 business days

**Shipping charges:** We offer free shipping on international orders above ₹15,000 (approximately €170). For orders below this, a flat shipping fee applies based on destination — shown at checkout.

**Tracking:** You'll receive a tracking number via WhatsApp and email within 24 hours of dispatch. You can track your order in real time.

**Customs & duties:** For international orders, local customs duties or import taxes may apply in your country. These are the buyer's responsibility and vary by country. Most sarees and lehengas attract low or no duty in EU countries, UK, and UAE — but we recommend checking your local customs guidelines.

**Packaging:** Every piece is wrapped in tissue, placed in a muslin bag, and packed in a rigid box. Fragile embroidery pieces get additional protective padding. We treat your order the way you'd want an heirloom to be packed.`,
  },
  {
    id: "returns",
    title: "Return & Exchange Policy",
    icon: "🔄",
    content: `We want you to love your piece. If something isn't right, we'll make it right.

**Return window:** You have 7 days from the date of delivery to initiate a return or exchange.

**Eligible for return:**
- Item received is significantly different from what was shown
- Item has a manufacturing defect or damage on arrival
- Wrong item was delivered

**Not eligible for return:**
- Items that have been worn, washed, or dry cleaned
- Items with removed tags or original packaging
- Custom or made-to-order pieces
- Sale items (unless defective)

**How to initiate a return:** Simply WhatsApp us with your order number and a photo of the issue. We'll respond within a few hours and guide you through the process. No long forms, no runaround.

**Refund process:** Approved refunds are processed within 7 business days back to your original payment method. For international orders, refunds are processed in the original currency.

**Exchange:** We're happy to exchange for a different colour or another piece of equivalent value. Exchange shipping costs are shared — we cover our end, you cover return shipping.`,
  },
  {
    id: "authenticity",
    title: "Authenticity Guarantee",
    icon: "✦",
    content: `Every single piece we sell is 100% authentic. This is our most important promise to you.

**How we source:** We buy directly from master weavers and established fabric merchants in Chandni Chowk — the oldest and most respected fabric market in India, with over 400 years of weaving heritage. We do not source from middlemen or resellers.

**What we check before listing:**
- Fabric composition verified (pure silk, real zari, genuine Chanderi etc.)
- Weave pattern and motif quality checked by hand
- Dyeing quality and colour fastness assessed
- Weight and drape tested
- Embroidery and hand-work inspected stitch by stitch

**Handwoven vs machine-made:** We are explicit about this distinction. Every listing clearly states whether a piece is handwoven, hand-embroidered, or machine-assisted. We do not misrepresent machine work as handwork.

**GI-tagged products:** Products like Banarasi silk, Chanderi, and Patola carry Geographical Indication (GI) tags — a legal certification of authenticity. Where applicable, we source GI-certified pieces.

**Your guarantee:** If you ever receive a piece and believe it is not what was described, contact us immediately. We will investigate and make it right — no questions asked.`,
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: "🔒",
    content: `Your privacy matters to us. Here is exactly what we do and do not do with your information.

**What we collect:**
- Name, email, phone number, and shipping address when you place an order
- WhatsApp number if you contact us or join our broadcast list
- Payment details — processed securely by Razorpay (India) or Stripe (International). We never see or store your card details.

**What we use it for:**
- Processing and delivering your order
- Sending you order confirmation and tracking information
- Responding to your enquiries
- Sending new arrival updates if you've opted into our WhatsApp broadcast list

**What we never do:**
- We do not sell your data to anyone
- We do not share your information with third parties for marketing
- We do not store payment card details
- We do not send spam

**WhatsApp broadcast list:** This is entirely opt-in. You join by messaging us to request it, and you can leave at any time by simply telling us to remove you. We typically send 2–4 messages per month — new arrivals, festival collections, and occasional offers. Never daily messages.

**Cookies:** Our website uses minimal cookies for functionality (shopping cart, session) only. We do not use advertising cookies or tracking pixels.

**Data retention:** Order data is retained for 3 years for accounting and legal purposes, then deleted. WhatsApp contacts are removed on request.

**Contact:** For any privacy-related questions, WhatsApp us or email us. We'll respond within 24 hours.`,
  },
];

export default function PoliciesPage() {
  return (
    <div style={{ minHeight: "100vh", paddingTop: "2rem", paddingBottom: "5rem" }}>
      <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div className="text-center mb-16">
          <p style={{ fontFamily: "var(--font-accent)", color: "var(--gold-500)", letterSpacing: "0.35em", fontSize: "0.6rem", marginBottom: "0.75rem" }}>
            TRANSPARENCY & TRUST
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--gold-100)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, marginBottom: "1rem" }}>
            Our Policies
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gold-100)", opacity: 0.7, fontSize: "1.1rem", fontStyle: "italic", lineHeight: 1.7 }}>
            Everything you need to know before you shop — written in plain English, not legal jargon.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`}
              className="btn-outline-gold px-5 py-2 text-xs tracking-widest uppercase">
              {s.icon} {s.title}
            </a>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {sections.map(s => (
            <section key={s.id} id={s.id} style={{ scrollMarginTop: "6rem" }}>
              <div style={{ borderLeft: "2px solid var(--gold-500)", paddingLeft: "1.5rem", marginBottom: "2rem" }}>
                <p style={{ fontFamily: "var(--font-accent)", color: "var(--gold-700)", fontSize: "0.6rem", letterSpacing: "0.2em", marginBottom: "0.4rem" }}>
                  {s.icon}
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", color: "var(--gold-100)", fontSize: "2rem", fontWeight: 300 }}>
                  {s.title}
                </h2>
              </div>

              <div style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--gold-100)", opacity: 0.85 }}>
                {s.content.split("\n\n").map((para, i) => {
                  if (para.startsWith("**") && para.includes(":**")) {
                    const [bold, ...rest] = para.split(":**");
                    return (
                      <div key={i} style={{ marginBottom: "1rem" }}>
                        <p style={{ fontFamily: "var(--font-accent)", color: "var(--gold-500)", fontSize: "0.7rem", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
                          {bold.replace(/\*\*/g, "").toUpperCase()}
                        </p>
                        <p>{rest.join(":**")}</p>
                      </div>
                    );
                  }
                  if (para.includes("\n-")) {
                    const [heading, ...items] = para.split("\n-");
                    return (
                      <div key={i} style={{ marginBottom: "1rem" }}>
                        {heading && <p style={{ marginBottom: "0.5rem" }}>{heading}</p>}
                        <ul style={{ paddingLeft: "1.25rem" }}>
                          {items.map((item, j) => (
                            <li key={j} style={{ marginBottom: "0.3rem", listStyleType: "none", paddingLeft: "1rem", position: "relative" }}>
                              <span style={{ position: "absolute", left: 0, color: "var(--gold-500)" }}>✦</span>
                              {item.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return <p key={i} style={{ marginBottom: "1rem" }}>{para}</p>;
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-20 pt-12 gold-border-top">
          <p style={{ fontFamily: "var(--font-display)", color: "var(--gold-100)", fontSize: "1.75rem", fontWeight: 300, marginBottom: "0.5rem" }}>
            Still have questions?
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gold-100)", opacity: 0.65, fontStyle: "italic", marginBottom: "1.5rem" }}>
            We're real people. WhatsApp us and you'll get a real answer within the hour.
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}?text=Hi! I have a question about your policies.`}
            target="_blank" rel="noopener noreferrer"
            className="btn-gold inline-block px-10 py-4 text-xs tracking-widest uppercase"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
