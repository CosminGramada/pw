import { Page } from '@playwright/test';
import { LeftMenu } from './left-menu.po';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async waitForPageToLoad(): Promise<void> {
    await this.page.waitForNavigation({
      waitUntil: 'networkidle'
    });
  }

  get leftMenu(): LeftMenu {
    return new LeftMenu(this.page);
  }
}
