import { Locator, Page } from '@playwright/test';
import { AddItemsPage } from './add-items.po';
import { LibrariesPage } from './libraries.po';
import { LibraryPage } from './library.po';
import { SignInPage } from './login.po';

export class LeftMenu {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get loggedInUserNameMenu(): Locator {
    return this.page.locator('.username-display span');
  }
  
  private get librariesMenuItem(): Locator {
    return this.page.locator('#menu-home');
  }

  private get addItemsMenuItem(): Locator {
    return this.page.locator('#menu-add-items');
  }

  private get logoutMenuItem(): Locator {
    return this.page.locator('#menu-logout');
  }

  private get addLibraryItem(): Locator {
    return this.page.locator('#menu-add-library');
  }
  
  async openLibraries(): Promise<LibrariesPage> {
    await this.librariesMenuItem.click();
    return new LibrariesPage(this.page);
  }

  async openAddNewItem(): Promise<AddItemsPage> {
    await this.addItemsMenuItem.click();
    return new AddItemsPage(this.page);
  }

  async logout(): Promise<SignInPage> {
    await this.logoutMenuItem.click();
    return new SignInPage(this.page);
  }

  async addNewLibrary(): Promise<LibraryPage> {
    await this.addLibraryItem.click();
    return new LibraryPage(this.page);
  }

  async getLoggedInUser(): Promise<string> {
    return this.loggedInUserNameMenu.textContent();
  }
}
