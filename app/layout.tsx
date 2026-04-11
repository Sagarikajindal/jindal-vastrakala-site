import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Cinzel } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shop/Navbar";
import CartDrawer from "@/components/shop/CartDrawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jindal Vastrakala | Luxury Sarees, Suits & Lehengas | Chandni Chowk, Delhi",
  description:
    "Since 2025, Jindal Vastrakala brings you hand-picked luxury sarees, lehengas, and suits from the heart of Chandni Chowk. Shipped worldwide.",
  keywords: ["saree", "lehenga", "Chandni Chowk", "Banarasi", "bridal", "ethnic wear", "Indian fashion"],
  openGraph: {
    title: "Jindal Vastrakala",
    description: "Luxury Indian ethnic wear from Chandni Chowk, Delhi",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${ebGaramond.variable} ${cinzel.variable}`}>
      <body className="bg-ink-900 text-gold-100 font-body antialiased">
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <footer className="border-t border-gold-800/30 mt-24 py-16 px-6 text-center">
          <p className="font-accent text-gold-400 tracking-widest text-sm mb-2">JINDAL VASTRAKALA</p>
          <p className="text-gold-600 text-sm"> 4235, Ram Ram Ji Complex, Nai Sarak, Jogiwara, Delhi – 110006</p>
          <p className="text-gold-700 text-xs mt-4">
            © {new Date().getFullYear()} Jindal Vastrakala. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
