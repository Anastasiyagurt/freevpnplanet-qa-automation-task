import { type Page, type Locator, expect } from "@playwright/test";
import * as allure from "allure-js-commons";
import { config, type SubscriptionPlan, PLAN_LABELS } from "../config/env";

export class PersonalVpnPage {
  private readonly widget: Locator;
  private readonly emailInput: Locator;
  private readonly payButton: Locator;

  constructor(public readonly page: Page) {
    this.widget = this.page.locator("#PPG");
    this.emailInput = this.page.locator("#qa-input-email, .ppg input[name='email']");
    this.payButton = this.widget.locator("button.ui-button[type='submit']");
  }

  async open(): Promise<this> {
    return allure.step("Open Personal VPN page", async () => {
      await this.page.goto(config.baseUrl, { waitUntil: "domcontentloaded" });
      await expect(this.widget).toBeVisible();
      return this;
    });
  }

  async selectPlan(plan: SubscriptionPlan): Promise<this> {
    return allure.step(`Select plan: ${plan}`, async () => {
      await this.widget.getByText(PLAN_LABELS[plan], { exact: false }).first().click();
      return this;
    });
  }

  async fillEmail(email: string): Promise<this> {
    return allure.step("Fill email", async () => {
      await this.emailInput.fill(email);
      return this;
    });
  }

  async proceedToPaymentSelection(): Promise<void> {
    await allure.step("Proceed to payment selection", async () => {
      await Promise.all([
        this.page.waitForURL(/\/payment\/?/),
        this.payButton.click(),
      ]);
      await expect(this.page.getByRole("heading", { name: /choose payment method/i })).toBeVisible();
    });
  }
}
