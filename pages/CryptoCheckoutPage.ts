import { type Page, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

export class CryptoCheckoutPage {
  constructor(public readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await allure.step("Verify crypto checkout loaded", async () => {
      await expect(this.page).toHaveURL(/heleket\.com/);
      await expect(this.page).toHaveTitle(/heleket/i);
    });
  }
}
