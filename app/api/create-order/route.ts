import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount, currency, items, gateway } = body;

  // ── Stripe (international) ──────────────────────────────────────────────────
  if (gateway === "stripe") {
    const stripe = (await import("stripe")).default;
    const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.product.name, images: [item.product.images[0]] },
        unit_amount: Math.round(item.product.priceEUR * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      shipping_address_collection: {
        allowed_countries: ["GB", "AE", "US", "CH", "CA", "AU", "DE", "FR", "NL", "SE", "NO"],
      },
      metadata: { items: JSON.stringify(items.map((i: any) => ({ id: i.product.id, qty: i.quantity }))) },
    });

    return NextResponse.json({ url: session.url });
  }

  // ── Razorpay (India) ────────────────────────────────────────────────────────
  const Razorpay = (await import("razorpay")).default;
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100), // paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes: { items: JSON.stringify(items.map((i: any) => ({ id: i.product.id, qty: i.quantity }))) },
  });

  return NextResponse.json(order);
}
