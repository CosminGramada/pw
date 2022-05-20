import { Locator, Page } from '@playwright/test';

export class AddBookConfirmPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    void AddBookConfirmPage.waitForChunkLoad(page);
  }

  static async waitForChunkLoad(page: Page): Promise<void> {
    await page.waitForNavigation();
  }

  private get confirmationText(): Locator {
    return this.page.locator('//div[@class="full_box" and not(descendant::*[@id="csv-preview"])]/descendant::*[text()][1]');
  }
  
  async getConfirmationText(): Promise<string> {
    return this.confirmationText.textContent();
  }
}
