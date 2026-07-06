import { test as base } from "@playwright/test";
import { PersonalVpnPage } from "../pages/PersonalVpnPage";
import { PaymentMethodPage } from "../pages/PaymentMethodPage";
import { StripeCheckoutPage } from "../pages/StripeCheckoutPage";
import { CryptoCheckoutPage } from "../pages/CryptoCheckoutPage";

type AppFixtures = {
  personalVpnPage: PersonalVpnPage;
  paymentMethodPage: PaymentMethodPage;
  stripeCheckoutPage: StripeCheckoutPage;
  cryptoCheckoutPage: CryptoCheckoutPage;
};

export const test = base.extend<AppFixtures>({
  personalVpnPage: async ({ page }, use) => {
    await use(new PersonalVpnPage(page));
  },
  paymentMethodPage: async ({ page }, use) => {
    await use(new PaymentMethodPage(page));
  },
  stripeCheckoutPage: async ({ page }, use) => {
    await use(new StripeCheckoutPage(page));
  },
  cryptoCheckoutPage: async ({ page }, use) => {
    await use(new CryptoCheckoutPage(page));
  },
});
