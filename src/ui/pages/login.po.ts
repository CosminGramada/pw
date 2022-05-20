import { Locator, Page } from '@playwright/test';
import { UserInformation } from '../interfaces/user-info';
import { LibrariesPage } from './libraries.po';

export class SignInPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get formTitleText(): Locator {
    return this.page.locator('#sign_in h2');
  }

  private get emailInput(): Locator {
    return this.page.locator('#email');
  }

  private get passwordInput(): Locator {
    return this.page.locator('#password');
  }

  private get signInButton(): Locator {
    return this.page.locator('#submit');
  }

  async signIn(userInfo: UserInformation): Promise<LibrariesPage> {
    await this.page.waitForLoadState('load');
    await this.emailInput.type(userInfo.email);
    await this.passwordInput.type(userInfo.password);
    await this.signInButton.click();
    return new LibrariesPage(this.page);
  }

  async getFormTitle(): Promise<string> {
    return this.formTitleText.textContent();
  }
}
