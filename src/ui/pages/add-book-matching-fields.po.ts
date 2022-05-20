import { Locator, Page } from '@playwright/test';
import { AddBookConfirmPage } from './add-book-confirm.po';

export class AddBookMatchingFieldsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    void AddBookMatchingFieldsPage.waitForChunkLoad(page);
  }

  static async waitForChunkLoad(page: Page): Promise<void> {
    await page.waitForNavigation();
  }

  private get submitButton(): Locator {
    return this.page.locator('#csvgui-submit');
  }
  
  async submitUploadedCsv(): Promise<AddBookConfirmPage> {
    await this.submitButton.click();
    return new AddBookConfirmPage(this.page);
  }
}
