import { expect } from "@playwright/test";
import { test } from "../fixtures/index";
import {
  PAYMENT_GATEWAYS,
  PLAN_LABELS,
  type SubscriptionPlan,
} from "../config/env";
import { generateTestEmail } from "../utils/email";

const PLANS: SubscriptionPlan[] = ["1_month", "1_year"];

for (const plan of PLANS) {
  for (const gateway of PAYMENT_GATEWAYS) {
    test(`purchase personal VPN: ${PLAN_LABELS[plan]} via ${gateway}`, async ({
      personalVpnPage,
      paymentMethodPage,
      stripeCheckoutPage,
      cryptoCheckoutPage,
      page,
    }) => {
      const email = generateTestEmail();

      await personalVpnPage.open();
      await personalVpnPage.selectPlan(plan);
      await personalVpnPage.fillEmail(email);
      await personalVpnPage.proceedToPaymentSelection();

      await expect(page).toHaveURL(new RegExp(`offer_id=${plan}`));
      await expect(page.getByText("Credit Card")).toBeVisible();
      await expect(page.getByText("Cryptocurrency")).toBeVisible();

      await paymentMethodPage.selectPaymentMethod(gateway);
      await paymentMethodPage.acceptTerms();
      await paymentMethodPage.proceedToCheckout();

      if (gateway === "stripe") {
        await stripeCheckoutPage.expectLoaded();
      } else {
        await cryptoCheckoutPage.expectLoaded();
      }
    });
  }
}
