// stripe-webhook.js
// Listens for checkout.session.completed events from Stripe.
// Uses raw fetch + manual signature verification — no stripe npm dependency needed.
//
// Register this URL in Stripe Dashboard → Developers → Webhooks:
//   https://www.noorast.co.uk/.netlify/functions/stripe-webhook
//
// Required Netlify env vars:
//   STRIPE_WEBHOOK_SECRET  — from Stripe Dashboard → Webhooks → signing secret
//   CONVERTKIT_API_KEY     — from ConvertKit → Account → API
//   CONVERTKIT_TOOLKIT_TAG — ConvertKit tag ID for toolkit purchasers
//   CONVERTKIT_CONSULT_TAG — ConvertKit tag ID for consultation purchasers

import crypto from 'crypto';

function verifyStripeSignature(payload, sigHeader, secret) {
  const parts = sigHeader.split(',').reduce((acc, part) => {
    const [k, v] = part.split('=');
    acc[k] = v;
    return acc;
  }, {});
  const timestamp = parts.t;
  const sig = parts.v1;
  if (!timestamp || !sig) return false;
  const signed = `${timestamp}.${payload}`;
  const expected = crypto.createHmac('sha256', secret).update(signed).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}

export const handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let stripeEvent;

  try {
    const body = event.body;
    if (webhookSecret) {
      const sig = event.headers['stripe-signature'];
      if (!sig || !verifyStripeSignature(body, sig, webhookSecret)) {
        return { statusCode: 400, body: 'Invalid signature' };
      }
    }
    stripeEvent = JSON.parse(body);
  } catch (err) {
    console.error('Webhook parse error:', err);
    return { statusCode: 400, body: 'Bad request' };
  }

  if (stripeEvent.type !== 'checkout.session.completed') {
    return { statusCode: 200, body: 'Ignored' };
  }

  const session = stripeEvent.data.object;
  const customerEmail = session.customer_details?.email || session.customer_email;
  const amountTotal = session.amount_total; // pence

  if (!customerEmail) {
    return { statusCode: 200, body: 'No email' };
  }

  // Determine tier by amount (pence, VAT-inclusive)
  // £97+VAT=£116.40, £197+VAT=£236.40, £9+VAT=£10.80
  const isConsultation = amountTotal >= 18000;
  const isPlanningReport = amountTotal < 2000;

  const CK_API_KEY = process.env.CONVERTKIT_API_KEY;
  const tagId = isConsultation
    ? process.env.CONVERTKIT_CONSULT_TAG
    : process.env.CONVERTKIT_TOOLKIT_TAG;

  if (CK_API_KEY && tagId) {
    try {
      await fetch(`https://api.convertkit.com/v3/tags/${tagId}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: CK_API_KEY, email: customerEmail }),
      });
    } catch (err) {
      console.error('ConvertKit error:', err);
    }
  }

  console.log('Purchase recorded:', {
    email: customerEmail,
    amount: amountTotal,
    product: isPlanningReport ? 'planning_report' : isConsultation ? 'consultation' : 'toolkit',
    session: session.id,
  });

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
