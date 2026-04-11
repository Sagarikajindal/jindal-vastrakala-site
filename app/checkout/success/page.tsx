import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="text-gold-400 text-6xl mb-8">✦</div>
        <h1 className="font-display text-gold-100 text-5xl font-light mb-4">
          Order Confirmed
        </h1>
        <p className="font-body text-gold-400 text-xl italic leading-relaxed mb-8">
          Thank you for your order. Your piece will be carefully packed and shipped from Chandni Chowk within 24 hours. You will receive a confirmation email shortly.
        </p>
        <p className="text-gold-600 text-sm mb-8 font-accent tracking-wide">
          Questions? WhatsApp us at any time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-gold px-10 py-4 text-xs tracking-widest uppercase">
            Continue Shopping
          </Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}?text=Hi, I just placed an order and have a question.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold px-10 py-4 text-xs tracking-widest uppercase"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
