const YT = process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@JindalVastrakala";

export default function YouTubeBanner() {
  return (
    <section className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-8 px-8 py-10 gold-border"
          style={{ background: "rgba(61,3,16,0.5)" }}
        >
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full"
              style={{ background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,80,80,0.25)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff5050">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-accent)", color: "var(--gold-500)", letterSpacing: "0.2em", fontSize: "0.6rem", marginBottom: "0.25rem" }}>
                WATCH BEFORE YOU BUY
              </p>
              <h3 style={{ fontFamily: "var(--font-display)", color: "var(--gold-100)", fontSize: "1.5rem", fontWeight: 300 }}>
                Jindal Vastrakala on YouTube
              </h3>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gold-100)", opacity: 0.6, fontSize: "0.9rem", fontStyle: "italic", marginTop: "0.25rem" }}>
                Saree draping tutorials · New arrivals · Behind the scenes from Chandni Chowk
              </p>
            </div>
          </div>

          <div className="text-center flex-shrink-0">
            <p style={{ fontFamily: "var(--font-display)", color: "var(--gold-500)", fontSize: "2.5rem" }}>7.2K</p>
            <p style={{ fontFamily: "var(--font-accent)", color: "var(--gold-700)", fontSize: "0.6rem", letterSpacing: "0.15em", marginBottom: "1rem" }}>
              SUBSCRIBERS
            </p>
            <a href={YT} target="_blank" rel="noopener noreferrer"
              className="btn-outline-gold inline-block px-8 py-3 text-xs tracking-widest uppercase">
              Subscribe
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
