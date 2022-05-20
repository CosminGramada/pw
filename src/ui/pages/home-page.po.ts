import { Locator, Page } from '@playwright/test';
import config from '../playwright.config';
import { SignInPage } from './login.po';

export class HomePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get loginButton(): Locator { 
    return this.page.locator('.login-btn');
  }

  async openTestApplication(): Promise<void> {
    await this.page.goto(config.use.baseURL, {
      waitUntil: 'networkidle'
    });
  }

  async clickLogin(): Promise<SignInPage> {
    await this.loginButton.click();
    return new SignInPage(this.page);
  }
}
