import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.gateway === "razorpay") {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = hmac.digest("hex");

    if (digest !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
    }

    // TODO: Update your DB order status to "paid" here
    // await db.order.update({ where: { razorpayOrderId: razorpay_order_id }, data: { status: "paid" } });

    return NextResponse.json({ success: true, paymentId: razorpay_payment_id });
  }

  return NextResponse.json({ success: true });
}
