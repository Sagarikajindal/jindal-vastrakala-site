const messages = [
  "✦  Worldwide Shipping Available — UK · UAE · Europe · USA · Canada",
  "✦  Every Piece Hand-Picked from Chandni Chowk, Delhi",
  "✦  Authentic Handwoven Banarasi, Chanderi, Patola & Organza",
  "✦  Free Video Consultation — Browse Our Store Live",
  "✦  New Arrivals Every Week — Join Our WhatsApp Broadcast",
  "✦  Ships Within 24 Hours of Your Order",
  "✦  Bridal Sarees & Lehengas for Weddings Worldwide",
  "✦  100% Authentic — Sourced Directly from Master Weavers",
  "✦  Custom Orders Welcome — WhatsApp Us",
  "✦  7,200 Subscribers on YouTube — Watch Before You Buy",
];

export default function Marquee() {
  const doubled = [...messages, ...messages];
  return (
    <div
      className="overflow-hidden py-2.5 gold-border-top gold-border-bottom"
      style={{ background: "var(--burg-950)" }}
      aria-label="Announcements"
    >
      <div className="marquee-track">
        {doubled.map((msg, i) => (
          <span
            key={i}
            className="inline-block whitespace-nowrap px-10"
            style={{
              fontFamily: "var(--font-accent)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "var(--gold-500)",
            }}
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
