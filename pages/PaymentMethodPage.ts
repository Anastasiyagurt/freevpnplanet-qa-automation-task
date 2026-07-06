import { type Page, type Locator, expect } from "@playwright/test";
import * as allure from "allure-js-commons";
import { type PaymentGateway, PAYMENT_PAGE_PATTERNS } from "../config/env";

export class PaymentMethodPage {
  private readonly termsCheckbox: Locator;
  private readonly termsLabel: Locator;
  private readonly payButton: Locator;

  constructor(public readonly page: Page) {
    this.termsCheckbox = this.page.locator("#qa-checkbox-terms");
    this.termsLabel = this.page.locator("label.ppg__label.checkbox");
    this.payButton = this.page.locator("button.ui-button").filter({ hasText: /^Pay$/ }).last();
  }

  async selectPaymentMethod(gateway: PaymentGateway): Promise<this> {
    return allure.step(`Select payment method: ${gateway}`, async () => {
      await this.page
        .locator(`label.ppg__modal-label:has(input[value='${gateway}'])`)
        .click();
      return this;
    });
  }

  async acceptTerms(): Promise<this> {
    return allure.step("Accept terms", async () => {
      await this.termsLabel.click();
      await expect(this.termsCheckbox).toBeChecked();
      return this;
    });
  }

  async proceedToCheckout(): Promise<void> {
    await allure.step("Proceed to checkout", async () => {
      await Promise.all([
        this.page.waitForURL((url) => this.isExternalCheckout(url.toString())),
        this.payButton.click(),
      ]);
    });
  }

  private isExternalCheckout(url: string): boolean {
    return Object.values(PAYMENT_PAGE_PATTERNS).some((pattern) => pattern.test(url));
  }
}
