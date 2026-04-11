"use client";
import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { formatINR, formatEUR } from "@/lib/products";
import { useRouter } from "next/navigation";

declare global {
  interface Window { Razorpay: any; }
}

export default function CheckoutPage() {
  const { items, totalINR, totalEUR, clearCart } = useCartStore();
  const router = useRouter();
  const [currency, setCurrency] = useState<"INR" | "EUR">("INR");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    line1: "", line2: "", city: "", state: "", postalCode: "", country: "India",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRazorpay = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalINR(), currency: "INR", items }),
      });
      const data = await res.json();

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);
      script.onload = () => {
        const rzp = new window.Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: "INR",
          name: "Jindal Vastrakala",
          description: `Order of ${items.length} item(s)`,
          order_id: data.id,
          prefill: { name: form.name, email: form.email, contact: form.phone },
          theme: { color: "#d4a017" },
          handler: async (response: any) => {
            await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, gateway: "razorpay" }),
            });
            clearCart();
            router.push("/checkout/success");
          },
        });
        rzp.open();
      };
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStripe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalEUR(), currency: "EUR", items, gateway: "stripe" }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <p className="font-display text-gold-400 text-3xl font-light">Your bag is empty</p>
        <button onClick={() => router.push("/")} className="btn-gold px-8 py-3 mt-8 text-sm tracking-widest uppercase">
          Browse Collection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-accent text-gold-500 tracking-[0.3em] text-xs uppercase mb-2">Secure Checkout</p>
          <h1 className="font-display text-gold-100 text-4xl font-light">Complete Your Order</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Contact */}
            <div>
              <h2 className="font-accent text-gold-400 tracking-widest text-xs uppercase mb-4">Contact Information</h2>
              <div className="space-y-3">
                <input name="name" placeholder="Full name" value={form.name} onChange={handleInput} />
                <input name="email" type="email" placeholder="Email address" value={form.email} onChange={handleInput} />
                <input name="phone" placeholder="Phone (with country code)" value={form.phone} onChange={handleInput} />
              </div>
            </div>

            {/* Shipping */}
            <div>
              <h2 className="font-accent text-gold-400 tracking-widest text-xs uppercase mb-4">Shipping Address</h2>
              <div className="space-y-3">
                <input name="line1" placeholder="Address line 1" value={form.line1} onChange={handleInput} />
                <input name="line2" placeholder="Address line 2 (optional)" value={form.line2} onChange={handleInput} />
                <div className="grid grid-cols-2 gap-3">
                  <input name="city" placeholder="City" value={form.city} onChange={handleInput} />
                  <input name="state" placeholder="State / Region" value={form.state} onChange={handleInput} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input name="postalCode" placeholder="Postal code" value={form.postalCode} onChange={handleInput} />
                  <select name="country" value={form.country} onChange={handleInput}>
                    <option>India</option>
                    <option>United Kingdom</option>
                    <option>United Arab Emirates</option>
                    <option>United States</option>
                    <option>Switzerland</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Currency selector */}
            <div>
              <h2 className="font-accent text-gold-400 tracking-widest text-xs uppercase mb-4">Payment Currency</h2>
              <div className="grid grid-cols-2 gap-3">
                {(["INR", "EUR"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`py-3 border text-sm font-accent tracking-widest transition-all ${
                      currency === c
                        ? "border-gold-400 text-gold-200 bg-gold-900/20"
                        : "border-gold-800/40 text-gold-500 hover:border-gold-600"
                    }`}
                  >
                    {c === "INR" ? "₹ INR — Razorpay (India)" : "€ EUR — Stripe (International)"}
                  </button>
                ))}
              </div>
              <p className="text-gold-700 text-xs mt-2 font-body italic">
                {currency === "INR"
                  ? "Pay securely via Razorpay. UPI, cards, net banking accepted."
                  : "Pay via Stripe. All major international cards accepted."}
              </p>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="border border-gold-800/30 p-6 sticky top-24">
              <h2 className="font-accent text-gold-400 tracking-widest text-xs uppercase mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-display text-gold-200 text-sm truncate">{item.product.name}</p>
                      <p className="text-gold-600 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-display text-gold-400 text-sm whitespace-nowrap">
                      {currency === "INR"
                        ? formatINR(item.product.priceINR * item.quantity)
                        : formatEUR(item.product.priceEUR * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gold-800/30 pt-4 mb-6 space-y-2">
                <div className="flex justify-between text-gold-400 text-sm">
                  <span>Subtotal</span>
                  <span>{currency === "INR" ? formatINR(totalINR()) : formatEUR(totalEUR())}</span>
                </div>
                <div className="flex justify-between text-gold-600 text-sm">
                  <span>Shipping</span>
                  <span className="text-gold-500">Calculated at delivery</span>
                </div>
                <div className="flex justify-between font-display text-gold-200 text-xl pt-2 border-t border-gold-800/30 mt-2">
                  <span>Total</span>
                  <span>{currency === "INR" ? formatINR(totalINR()) : formatEUR(totalEUR())}</span>
                </div>
              </div>

              <button
                onClick={currency === "INR" ? handleRazorpay : handleStripe}
                disabled={loading || !form.name || !form.email}
                className="btn-gold w-full py-4 text-xs tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : `Pay ${currency === "INR" ? formatINR(totalINR()) : formatEUR(totalEUR())}`}
              </button>

              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}?text=Hi! I'd like to place an order: ${items.map(i => `${i.product.name} x${i.quantity}`).join(", ")}. Total: ${formatINR(totalINR())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold w-full py-3 text-xs tracking-widest uppercase text-center block mt-3"
              >
                Order via WhatsApp instead
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
