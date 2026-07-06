import dotenv from "dotenv";

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL ?? "https://personal.freevpnplanet.com/",
  testEmail: process.env.TEST_EMAIL ?? "qa.automation.test@example.com",
  headless: process.env.HEADLESS !== "false",
} as const;

export type SubscriptionPlan = "1_month" | "1_year";
export type PaymentGateway = "stripe" | "crypto";

export const PLAN_LABELS: Record<SubscriptionPlan, string> = {
  "1_month": "1 month",
  "1_year": "1 year",
};

export const PAYMENT_GATEWAYS: PaymentGateway[] = ["stripe", "crypto"];

export const PAYMENT_PAGE_PATTERNS: Record<PaymentGateway, RegExp> = {
  stripe: /checkout\.stripe\.com/,
  crypto: /heleket\.com/,
};
