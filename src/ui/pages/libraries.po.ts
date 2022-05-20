import { ElementHandle, Locator, Page } from '@playwright/test';
import { LibraryType } from '../enums';
import { BasePage } from './base-page';

export class LibrariesPage extends BasePage {
  constructor(page: Page) {
    super(page);
    void LibrariesPage.waitForPageLoad(page);
  }

  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForNavigation();
  }

  private get librarySelect(): Locator {
    return this.page.locator('#lib_select');
  }

  private get librarySelectSearchInput(): Locator {
    return this.page.locator('.chosen-search input');
  }

  private get librarySelectSearchSuggestions(): Locator {
    return this.page.locator('.chosen-results li').first();
  }

  private get currentSelectedLibraryText(): Locator {
    return this.page.locator('.chosen-container-single span');
  }

  private get searchInput(): Locator {
    return this.page.locator('#search_local');
  }

  private get numberOfBooksText(): Locator {
    return this.page.locator('#library_list a.graph-stats');
  }

  private get booksElements(): Promise<ElementHandle<SVGElement | HTMLElement>[]> {
    return this.page.$$('#library_load .cover-title');
  }

  async performSearchFor(searchText: string): Promise<void> {
    await this.searchInput.type(searchText);
    await this.page.keyboard.press('Enter');
  }

  async getCurrentSelectedLibrary(): Promise<string> {
    return this.currentSelectedLibraryText.textContent();
  }

  async selectLibrary(libraryType: LibraryType): Promise<this> {
    await this.librarySelect.click();
    await this.librarySelectSearchInput.type(LibraryType[libraryType]);
    await this.librarySelectSearchSuggestions.click();

    return this;
  }

  async getNumberOfBooksInLibrary(): Promise<number> {
    return Number(await this.numberOfBooksText.textContent());
  }

  async getAllBookNames(): Promise<string[]> {
    return Promise.all((await this.booksElements).map(async (b) => {
      const name = b.textContent();
      return name;
    }));
  }
}
