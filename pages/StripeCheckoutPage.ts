import { type Page, type Locator, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

export class StripeCheckoutPage {
  private readonly paymentForm: Locator;

  constructor(public readonly page: Page) {
    this.paymentForm = this.page.locator("#payment-form");
  }

  async expectLoaded(): Promise<void> {
    await allure.step("Verify Stripe checkout loaded", async () => {
      await expect(this.page).toHaveURL(/checkout\.stripe\.com/);
      await expect(this.paymentForm).toBeVisible();
    });
  }
}
