// Stripe Configuration
// Live payment links for the Noorast Toolkit tiers

// Toolkit only — £97 + VAT
export const STRIPE_TOOLKIT_LINK = 'https://buy.stripe.com/fZu4gAcZyceA2t9coL5c400';

// Toolkit + Consultation — £197 + VAT
export const STRIPE_CONSULTATION_LINK = 'https://buy.stripe.com/dRm00kaRq2E02t9bkH5c402';

// Backwards compatibility alias — defaults to the £97 toolkit tier
export const STRIPE_PAYMENT_LINK = STRIPE_TOOLKIT_LINK;

// Intelligence Subscription — £19/month + VAT (PLACEHOLDER — replace with live Stripe link)
export const STRIPE_SUBSCRIPTION_MONTHLY_LINK = 'https://buy.stripe.com/PLACEHOLDER_MONTHLY';

// Intelligence Subscription — £149/year + VAT (PLACEHOLDER — replace with live Stripe link)
export const STRIPE_SUBSCRIPTION_ANNUAL_LINK = 'https://buy.stripe.com/PLACEHOLDER_ANNUAL';

// Local Planning Intelligence Report — £9 + VAT (PLACEHOLDER — replace with live Stripe link)
export const STRIPE_PLANNING_REPORT_LINK = 'https://buy.stripe.com/PLACEHOLDER_REPORT';
