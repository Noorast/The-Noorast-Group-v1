# Stripe Integration — Noorast Toolkit

This site uses **Stripe Payment Links** (no API integration, no webhooks needed) for two product tiers. Configuration lives in `src/config/stripe.ts`.

## Live products

| Tier | Price | Stripe Payment Link |
|---|---|---|
| Toolkit | £97 + VAT | `https://buy.stripe.com/fZu4gAcZyceA2t9coL5c400` |
| Toolkit + Consultation | £197 + VAT | `https://buy.stripe.com/dRm00kaRq2E02t9bkH5c402` |

Both buttons live on `/toolkit`. Each one redirects to its corresponding Stripe Checkout page; on successful payment, Stripe returns the customer to `https://www.noorast.co.uk/toolkit?success=true`, which triggers a green confirmation banner via the existing logic in `Toolkit.tsx`.

## Configuration file

Edit `src/config/stripe.ts` to change links:

```typescript
export const STRIPE_TOOLKIT_LINK = 'https://buy.stripe.com/...';
export const STRIPE_CONSULTATION_LINK = 'https://buy.stripe.com/...';
export const STRIPE_PAYMENT_LINK = STRIPE_TOOLKIT_LINK; // legacy alias
```

That's the only file to change for link swaps. No environment variables, no rebuild order.

## Stripe dashboard checklist

Each payment link must be configured as follows. Verify both before launch.

### Tax behaviour
- **Tax exclusive** — VAT added on top of the headline price. With this setting, the £97 link charges £116.40 (£97 + £19.40 VAT) and £197 charges £236.40 (£197 + £39.40 VAT).
- If set to "Tax inclusive", the customer pays £97/£197 total and you absorb the VAT — almost certainly not what you want.

### Confirmation page
- Set to **Custom redirect URL**: `https://www.noorast.co.uk/toolkit?success=true`
- Apply this on **both** payment links.
- The trailing `?success=true` triggers the existing success banner in `Toolkit.tsx`.

### Customer details
- Collect **Email address**: required (for receipts and toolkit access).
- Collect **Billing address**: required (needed for valid VAT invoices in the UK).

### Statement descriptors
- Toolkit (£97): `NOORAST TOOLKIT`
- Consultation (£197): `NOORAST CONSULT`

## Post-payment fulfilment

Right now, paying triggers only a Stripe email receipt and the on-site success banner. The actual product (Property Passport access, consultation booking) is **not gated by payment**. Decide one of these approaches before going public:

### Option A — Stripe automated email (simplest)
For each payment link:
1. Open the link in Stripe → After payment → enable **Confirmation email**
2. For the Toolkit tier: attach the toolkit PDF directly, plus instructions for accessing the Property Passport web app
3. For the Consultation tier: include a Calendly/Cal.com link for the customer to book the 45-min slot

### Option B — Webhook + backend (more robust)
Listen for `checkout.session.completed` events at a backend endpoint, then:
- Match the `price` ID to identify which tier was bought
- Send a tier-specific welcome email with appropriate links
- Optionally store the customer in your CRM

The webhook endpoint URL goes in Stripe → Developers → Webhooks. Use the `STRIPE_WEBHOOK_SECRET` to verify the signature on incoming events.

### Option C — Zapier/Make.com (no-code)
Trigger: "New Stripe Checkout Session". Action: send personalised email via Gmail/SendGrid. Different paths for each price ID. About 15 min to set up; runs on a free tier for low volumes.

## Testing

### Pre-launch — test mode
While developing, use Stripe test-mode payment links and these card numbers:

| Card | Outcome |
|---|---|
| `4242 4242 4242 4242` | Success |
| `4000 0025 0000 3155` | Requires 3-D Secure authentication |
| `4000 0000 0000 9995` | Declined |

Any future expiry date, any CVC, any postcode.

### Post-launch — real card test
Once the live links are wired up, do one full end-to-end purchase on each tier with a real card. Verify:
- Stripe checkout shows the correct headline price
- VAT is added on top (£116.40 / £236.40 totals)
- Successful payment returns to `/toolkit?success=true`
- Green success banner appears
- Stripe email receipt arrives at your inbox

Refund yourself from the Stripe dashboard immediately after — both transactions.

## Troubleshooting

**Payment succeeds but customer reports they didn't get the toolkit.**
Fulfilment is not automated yet. Check the post-payment fulfilment options above. Until one is in place, you'll need to manually send the toolkit/booking link after each Stripe email notification.

**Customer paid but cannot access `/toolkit/property-passport`.**
The Property Passport route is currently open access. Anyone, paid or not, can use it. If you want to gate it, that requires authentication infrastructure (Supabase auth or similar) — separate work.

**VAT invoice queries from customers.**
Stripe automatically issues VAT-compliant invoices for UK transactions when the billing address and tax behaviour are set correctly. Check Stripe → Customers → [customer] → Invoice for each transaction.
